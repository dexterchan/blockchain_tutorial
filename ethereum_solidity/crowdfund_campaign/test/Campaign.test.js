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


beforeEach(
    async()=>{
        //New promise async
        //Get a list of all accounts
        accounts = await web3.eth.getAccounts();

        factory=await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
        .deploy({data:"0x"+compiledFactory.bytecode }) //tell web3 to prepare a copy of contract for deployment
        .send({from: accounts[0] ,  gas:1000000});

        campaign = await factory.methods.createCrowdFundCampaign("100").send(
            {
                from: accounts[0],  gas:1000000
            }
        );


    }
);

describe("Factory Contract",()=>{
    it("deploys contract",()=>{
        console.log(factory);
        assert.ok(factory.options.address);
    });
}
);