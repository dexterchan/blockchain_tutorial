const assert = require('assert');
const ganache = require('ganache-cli'); //access Eth test network
const Web3 = require('web3'); //Web3 "class"

const provider = ganache.provider();
const web3 = new Web3(provider); //instance of Web3 connecting to ganache, replace it with main,test eth in future
const {interface, bytecode} = require('../compile');


let accounts;
let inbox;
const HelloMessage="Hi, pigpig!";
beforeEach(
    async()=>{
        //New promise async
        //Get a list of all accounts
        accounts = await web3.eth.getAccounts();

        //Use one of these contract to deploy a contract
        inbox=await new web3.eth.Contract(JSON.parse(interface))
            .deploy({data:bytecode, arguments:[HelloMessage] }) //tell web3 to prepare a copy of contract for deployment
            .send({from: accounts[0],  gas:1000000});
        inbox.setProvider ( provider); //set provider aligning to web3
    }
    /*
    ()=>{
    //Old callback async code
    //Get a list of all accounts
    accounts=web3.eth.getAccounts() //async operation
        .then (
            fetchedAccount=>{
                console.log(fetchedAccount);
            }
        );
    //Use one of these contract to deploy a contract
    }
    */
);


describe("Inbox",()=>{
    it("deploys contract",()=>{
        console.log(inbox);
        assert.ok(inbox.options.address);
    });

    it("get address",()=>{
        console.log("Contract address:"+inbox.options.address);
    });

    it("has a default message",async ()=>{
        const message = await inbox.methods.getMessage().call();
        assert.equal(message,HelloMessage);
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