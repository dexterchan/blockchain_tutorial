import web3 from './web3';
const compiledCampaign=require("./build/CrowdFundCampaign.json");


export default (deployedAddress)=>{
    return new web3.eth.Contract(
        JSON.parse(compiledCampaign.interface)
        ,deployedAddress
    );
};


