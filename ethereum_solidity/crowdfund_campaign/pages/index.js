import React,{Component} from "react";
import factory from "../ethereum/factory";
//import 'semantic-ui-css/semantic.css';
import { Card,Button } from 'semantic-ui-react';
import {Link} from "../routes";
import Layout from "../components/Layout";
//Link object is a React component to render anchor tags in React component

class CampaignIndex extends Component{

    static async getInitialProps(){
        //running in server
        const campaigns=await factory.methods.getDeployedCampaigns().call();
        return {campaigns};
    }

    /*
    componentDidMount loads on the browser run, no longer needed when Next server run in getInitialProps at server side
    async componentDidMount(){
        //running in browser
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
                description:
                <Link route={`campaigns/${address}`}>
                    <a>View Campaign</a>
                </Link>
                ,fluid: true
            };
        });
        return <Card.Group items={items} />;
    }

    render() {

        return (
            <Layout>
                <div>
                    
                    <h3>Open campaigns</h3>
                    <Link route="campaigns/new">
                    <a>
                    <Button floated="right" icon="add circle" content="Create Campaign" primary/>
                    </a>
                    </Link>
                    {this.renderCampaigns()}
                </div>
            </Layout>
        );
    }
};



export default CampaignIndex;