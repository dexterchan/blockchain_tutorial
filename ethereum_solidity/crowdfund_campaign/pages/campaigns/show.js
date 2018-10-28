import React,{Component} from 'react';
import Layout from '../../components/Layout';
import campaignfunc from "../../ethereum/campaign";
import {Card,Grid, Button}  from 'semantic-ui-react'; 
import web3 from '../../ethereum/web3';
import {Link} from '../../routes';

import ContributeForm from "../../components/ContributeForm";


class CampaignShow extends Component{

    static async getInitialProps(props){
        //running in server
        
        const campaignContract = campaignfunc(props.query.address);

        const campaignSummary=await campaignContract.methods.getSummary().call();
        //console.log(campaignSummary);
        return {
            address:props.query.address,
            minimumContribution:campaignSummary[0],
            balance:campaignSummary[1],
            requestsCount:campaignSummary[2],
            approversCount:campaignSummary[3],
            manager:campaignSummary[4]
        };
    }

    renderCards(){
        const {
            balance,
            manager,
            minimumContribution,
            requestsCount,
            approversCount
        }=this.props;

        const items=[
            {
                header:manager,
                meta:"Address of manager",
                description:"The manager created this campaign and is able to create request to withthraw money",
                style: {overflowWrap:'break-word'}
            },
            {
                header:web3.utils.fromWei(minimumContribution,"ether") ,
                meta:"Minimum Contribution (ether)",
                description:"You need to contribute this much of ether to becomes an approver ",
                style: {overflowWrap:'break-word'}
            },
            {
                header:requestsCount ,
                meta:"Number of requests",
                description:"A request tries to withraw money from the contract. Request must be approved by approvers",
                style: {overflowWrap:'break-word'}
            },
            {
                header:approversCount ,
                meta:"Number of approvers",
                description:"Approvers have donated to this campaign",
                style: {overflowWrap:'break-word'}
            },
            {
                header: web3.utils.fromWei(balance,"ether") ,
                meta:"Balance (ether)",
                description:"Funding left in this campaign",
                style: {overflowWrap:'break-word'}
            }

        ];

        return <Card.Group items={items} />;
    }

    render(){
        return(
            <Layout>
                <h3>Show Campaign</h3>
                <Grid>
                    <Grid.Row>
                    <Grid.Column width={10}>
                        {this.renderCards()}
                        
                    </Grid.Column>
                    <Grid.Column width={3}>
                    <ContributeForm address={this.props.address}/>
                    </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                        <Link route={`/campaigns/${this.props.address}/requests`}>
                            <a>
                                <Button primary>
                                    View requests
                                </Button>
                            </a>
                        </Link>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                
                
                
            </Layout>
        );
    }
};

export default CampaignShow;