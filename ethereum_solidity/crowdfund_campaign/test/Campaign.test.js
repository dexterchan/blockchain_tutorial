const assert = require('assert');
const ganache = require('ganache-cli'); //access Eth test network
const Web3 = require('web3'); //Web3 "class"

const provider = ganache.provider();
const web3 = new Web3(provider); //instance of Web3 connecting to ganache, replace it with main,test eth in future

const compiledFactory=require("../ethereum/build/CrowdFundCampaignFactory.json");
const compiledCampaign=require("../ethereum/build/CrowdFundCampaign.json");

let accounts;
let factory;
let campaignAddress;
let campaign;
let campaignMgrAddress;


beforeEach(
    async()=>{
        //New promise async
        //Get a list of all accounts
        accounts = await web3.eth.getAccounts();

        factory=await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
        .deploy({data:"0x"+compiledFactory.bytecode }) //tell web3 to prepare a copy of contract for deployment
        .send({from: accounts[0] ,  gas:2000000});

        campaignMgrAddress = accounts[1];
        retObj=await factory.methods.createCrowdFundCampaign(web3.utils.toWei("0.02",'ether')).send(
            {
                from: campaignMgrAddress,  gas:1000000
            }
        );
        const addresses=await factory.methods.getDeployedCampaigns().call();
        campaignAddress=addresses[0];
        console.log("returned object:"+retObj);
        console.log("readaddress:"+addresses[0]);
        campaign=await new web3.eth.Contract(
            JSON.parse(compiledCampaign.interface)
            ,campaignAddress);
    }
);

describe("Campaign contract",()=>{
    it("deploys a factory and campaign",async()=>{
        //console.log(factory);
        assert.ok(factory.options.address);
        assert.ok(campaign.options.address);
        
        summaryvalues=await campaign.methods.getSummary().call();

        assert.equal(web3.utils.toWei("0.02",'ether'),summaryvalues[0]);

    });

    it("marks caller as the campaign manager", async()=>{
        mgrAddress=await campaign.methods.manager().call();
        assert.equal(campaignMgrAddress,mgrAddress);
    }
    );

    it("allows users to contribute money and marks them as approver",async() =>{
        userAcct = accounts[2];
        let contributeAmt="0.2";
        await campaign.methods.contribute().send(
            {from: userAcct ,  value:web3.utils.toWei(contributeAmt,'ether'),gas:5000000}
        );
        numApprovers = await campaign.methods.approverCount().call();
        assert.equal(1,numApprovers);

        //same user contribute again
        await campaign.methods.contribute().send(
            {from: userAcct ,  value:web3.utils.toWei(contributeAmt,'ether'),gas:5000000}
        );
        numApprovers = await campaign.methods.approverCount().call();
        assert.equal(1,numApprovers);

        const isContributed = await campaign.methods.approvers(userAcct).call();
        assert.equal(true,isContributed);

        //diff user contribute again
        userAcct = accounts[5];
        await campaign.methods.contribute().send(
            {from: userAcct ,  value:web3.utils.toWei(contributeAmt,'ether'),gas:5000000}
        );
        numApprovers = await campaign.methods.approverCount().call();
        assert.equal(2,numApprovers);

        found=false;
        const approverAddressLst=await campaign.methods.getApprovers().call();
        approverAddressLst.forEach((approver)=>{
            
            if(approver==userAcct){
                found=true;
            }
            
        }
        );
        assert(found);

        summaryvalues=await campaign.methods.getSummary().call();
        assert.equal(web3.utils.toWei(contributeAmt,'ether')*3,summaryvalues[1]);
        assert.equal(2,summaryvalues[3]);
    });

    it("disallow contribution less than minimum contribution", async()=>{
        userAcct = accounts[2];
        try{
            await campaign.methods.contribute().send(
                {from: userAcct ,  value:web3.utils.toWei("0.002",'ether')}
            );
            assert(false);
        }catch(err){
            assert(err);
        }
        
    });

    it("allow a manager to make payment request",async()=>{
        payAccount=accounts[4];
        await campaign.methods.
        createRequest("buy battery",web3.utils.toWei("0.002",'ether'),payAccount)
        .send(
            {from: campaignMgrAddress ,  gas:1000000}
        );

        const request = await campaign.methods.requests(0).call();
        assert("buy battery",request.description);

        summaryvalues=await campaign.methods.getSummary().call();

        assert.equal(1,summaryvalues[2]);
    });


    it("process request", async()=>{
        userAcct = accounts[2];
        vendorAcct = accounts[4];
        numEther="2";
        originalBalance = await web3.eth.getBalance(vendorAcct);
        await campaign.methods.contribute().send(
            {from: userAcct ,  value:web3.utils.toWei("10",'ether'),gas:1000000}
        );
        await campaign.methods
        .createRequest("buy controller",web3.utils.toWei(numEther,"ether"),vendorAcct)
        .send(
            {from: campaignMgrAddress,gas:"1000000"}
        );
        await campaign.methods
        .approveRequest(0)
        .send({from:userAcct,gas:"1000000"});
        
        await campaign.methods
        .finalizeRequest(0)
        .send({from:campaignMgrAddress,gas:"1000000"});

        finalBalance = await web3.eth.getBalance(vendorAcct);

        assert((finalBalance-originalBalance )== web3.utils.toWei(numEther,"ether") );
    });
}
);