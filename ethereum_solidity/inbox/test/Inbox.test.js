const assert = require('assert');
const ganache = require('ganache-cli'); //access Eth test network
const Web3 = require('web3'); //Web3 "class"

const web3 = new Web3(ganache.provider()); //instance of Web3 connecting to ganache, replace it with main,test eth in future



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