
/*
const campaignfunc = require( "./campaign");


class CampaignSummary{
    async getSummary (deployedAddress){
        const campaignContract = campaignfunc(deployedAddress);
        const campaignSummary=await campaignContract.methods.getSummary().call();
        return {
                minimumContribution:campaignSummary[0],
                balance:campaignSummary[1],
                requestsCount:campaignSummary[2],
                approversCount:campaignSummary[3],
                manager:campaignSummary[4]
        };
    };
}*/


export default (summaryResult)=>{
    return {
        minimumContribution:summaryResult[0],
        balance:summaryResult[1],
        requestsCount:summaryResult[2],
        approversCount:summaryResult[3],
        manager:summaryResult[4]
    };
};