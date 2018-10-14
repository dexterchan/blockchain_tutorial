import React,{Component} from "react";
import factory from "../ethereum/factory";
//import 'semantic-ui-css/semantic.css';
import { Card,Button } from 'semantic-ui-react';

import Layout from "../components/Layout";


class CampaignIndex extends Component{

    static async getInitialProps(){
        const campaigns=await factory.methods.getDeployedCampaigns().call();
        return {campaigns};
    }

    /*
    Load on the browser run, no longer needed when Next server run in getInitialProps at server side
    async componentDidMount(){
        const campaigns=await factory.methods.getDeployedCampaigns().call();
        console.log(campaigns);
    }*/

    renderCampaigns(){
        /*
        for (var address in this.props.campaigns){
                console.log("item"+address+":"+this.props.campaigns[address]);
        }*/
        const items=this.props.campaigns.map(address=>{
            return{
                header:address,
                description:<a>View Campaign</a>,
                fluid: true
            };
        });
        return <Card.Group items={items} />;
    }

    render() {

        return (
            <Layout>
                <div>
                    <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.3.3/semantic.min.css"></link>
                    <h3>Open campaigns</h3>
                    {this.renderCampaigns()}
                    <Button floated="right" icon="add circle" content="Create Campaign" primary/>
                </div>
            </Layout>
        );
    }
};



export default CampaignIndex;