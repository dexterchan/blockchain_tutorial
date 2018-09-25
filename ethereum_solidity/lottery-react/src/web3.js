import Web3 from "web3";
//tap on current web3 provider with metamask!!!
//all public key, private key is inside that metamask web3 provider instance
const web3 = new Web3(window.web3.currentProvider);

export default web3;