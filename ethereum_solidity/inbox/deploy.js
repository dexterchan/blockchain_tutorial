const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const {interface, bytecode} = require('./compile');

const provider = new HDWalletProvider(
'answer margin gallery suit decide tonight custom crisp eternal modify tiger huge',
'https://rinkeby.infura.io/v3/ddae119e519b4ed9b2d16eea07ab3498'
);

const web3 = new Web3(provider);
const HelloMessage="Hi, pigpig!";
const deploy = async ()=>{
    const accounts = await web3.eth.getAccounts();

    console.log("Attempting to deploy from account",accounts[0]);
    inbox=await new web3.eth.Contract(JSON.parse(interface))
        .deploy({data:"0x"+bytecode, arguments:[HelloMessage]})
        .send( {/*gas:5000000,*/ from: accounts[0]}); //a bug on Throffle wallet with gas parameter
        
    console.log("Contract deployed to ", inbox.options.address);
};

deploy();