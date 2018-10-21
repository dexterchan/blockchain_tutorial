import web3 from './web3';
//import CrowdFundCampaignFactory from "./build/CrowdFundCampaignFactory.json";

const compiledFactory=require("./build/CrowdFundCampaignFactory.json");


//const deployedAddress="0xE8DdF80eacE557b6fB9Ba34FB3132e397fA507A1";

const deployedAddress="0xaba1561585Dd7a087C8A524Adacf95949435404A";


export default new web3.eth.Contract(JSON.parse(compiledFactory.interface),deployedAddress);
