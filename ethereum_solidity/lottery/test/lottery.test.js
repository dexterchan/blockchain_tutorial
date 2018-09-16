const assert = require('assert');
const ganache = require('ganache-cli'); //access Eth test network
const Web3 = require('web3'); //Web3 "class"

const provider = ganache.provider();
const web3 = new Web3(provider); //instance of Web3 connecting to ganache, replace it with main,test eth in future
const {interface, bytecode} = require('../compile');


let accounts;
let lottery;

beforeEach(
    async()=>{
        //New promise async
        //Get a list of all accounts
        accounts = await web3.eth.getAccounts();

        //Use one of these contract to deploy a contract
        lottery=await new web3.eth.Contract(JSON.parse(interface))
            .deploy({data:"0x"+bytecode }) //tell web3 to prepare a copy of contract for deployment
            .send({from: accounts[0] ,  gas:1000000});
            //lottery.setProvider ( provider); //set provider aligning to web3
    }
);


describe("Lottery Contract",()=>{
    it("deploys contract",()=>{
        console.log(lottery);
        assert.ok(lottery.options.address);
    });

    it("get address",()=>{
        console.log("Contract address:"+lottery.options.address);
    });

    it("Allow one account to enter the lottery", async()=>{
        await lottery.methods.enter().send(
            {
                from: accounts[1], value:web3.utils.toWei("0.02",'ether')
            }
        );
        const players=await lottery.methods.getPlayers().call(
            {
                from:accounts[1]
            }
        );
        assert.equal(accounts[1],players[0]);
        assert.equal(1,players.length);
    }
    );

    it("Allow multiple accounts to enter the lottery", async()=>{
        
        const numOfPlayers=5;
        for (i=1;i<=numOfPlayers;i++){
            await lottery.methods.enter().send(
                {
                    from: accounts[i], value:web3.utils.toWei("0.02",'ether')
                }
            );

        }
        
        const players=await lottery.methods.getPlayers().call(
            {
                from:accounts[1]
            }
        );
        for (i=1;i<=numOfPlayers;i++){
            //console.log("Account ",i," test")
            assert.equal(accounts[i],players[i-1]);
        }
        
        assert.equal(numOfPlayers,players.length);
    }
    );



    it("Disallow entering the lottery without a mininum of ether", async()=>{

        try{
            await lottery.methods.enter().send(
                {
                    from: accounts[1], value:web3.utils.toWei("0.0002",'ether')
                }
            );
            assert(false);
        }catch(err){
            assert.ok(err);
        }
        
        const players=await lottery.methods.getPlayers().call(
            {
                from:accounts[1]
            }
        );
        assert.equal(0,players.length);
    }
    );

    it("only manager can pick winner", async()=>{
        try{
            await lottery.methods.pickWinner().send({
                from: accounts[1]
            });
            assert(false);
        }catch(err){
            assert.ok(err);
        }
    });

    it("sends money to the block with reseting players list", async()=>{
        await lottery.methods.enter().send(
            {
                from: accounts[1], value:web3.utils.toWei("0.1",'ether')
            }
        );
        const initialBalance = await web3.eth.getBalance(accounts[1]);

        await lottery.methods.pickWinner().send(
            {
                from:accounts[0]
            });
        const finalBalance = await web3.eth.getBalance(accounts[1]);
        const diff = finalBalance - initialBalance;
        //console.log(diff);
        assert (diff == web3.utils.toWei("0.1",'ether'));
        const players=await lottery.methods.getPlayers().call(
            {
                from:accounts[1]
            }
        );
        assert.equal (0,players.length);
    });
    
});

/*
class Car{
    park(){
        return "stopped";
    }
    drive(){
        return "vroom";
    }

}

let car;
beforeEach(()=>{
    car = new Car();
});

describe("Car to test",() => {
    

    it('tests park',()=>{
        //const car = new Car();
        assert.equal(car.park(),"stopped");
    });

    it("tests drive",()=>{
        //const car = new Car();
        assert.equal(car.drive(), "vroom");
    });
});
*/