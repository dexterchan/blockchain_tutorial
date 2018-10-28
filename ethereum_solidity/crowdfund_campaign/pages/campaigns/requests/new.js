import React,{Component} from 'react';
import Layout from '../../../components/Layout';
import {Button,Form,Message,Input,Label} from "semantic-ui-react";

import web3 from "../../../ethereum/web3"
import campaignfunc from "../../../ethereum/campaign";

import {Link,Router} from "../../../routes";
var bigInt = require("big-integer");

class NewRequest extends Component{

    state={
        description:"",
        value:"",
        recipient:"",
        statusMessage:"",
        loading:false
    };
    static async getInitialProps(props){
        //running in server
        
        const {address} = props.query;

        return {
            address
        }
    }

    checkEtherAmt = (event)=>{
        const r = event.target.value;
        let parseValue=Number.parseFloat(r);
        
        if (Number.isNaN(parseValue)) {
            this.setState({value:""});
            this.setState({statusMessage:"ether amount should be numberic"});
            return;
        }
        if(r.endsWith(".") || r.endsWith("0")) {
            parseValue=r;
        }else{
            parseValue=parseValue.toString();
        }
        
        this.setState({value:parseValue});
        this.setState({statusMessage:""})
    };

    onSubmit = async (event)=>{
        event.preventDefault();//avoid browser to auto-submit the form
        const campaignContract = campaignfunc(this.props.address);
        
        
        try{
            this.setState({loading:true,statusMessage:""});
            const campaignSummary=await campaignContract.methods.getSummary().call();
            const balance=campaignSummary[1];
            const {description,value,recipient} = this.state;
            const AskForValue=web3.utils.toWei(value,'ether');

            const accounts = await web3.eth.getAccounts();
            const mgrAddress = accounts[0];//A hack

            var bl= bigInt(balance);
            var ak=bigInt(AskForValue);
            
            if(bl<ak){
                const err= {message:"Your ask for value is greater than current balance"};
                console.log(err.message);
                throw err; 
            }
            await campaignContract.methods.
            createRequest(description,AskForValue,recipient)
            .send(
                {from: mgrAddress}
            );
            Router.pushRoute(`/campaigns/${this.props.address}/requests`);

        }catch(err){
            this.setState({statusMessage:err.message});
        }finally{
            this.setState({loading:false});
        }

    }

    render(){
        return (
            <Layout>
            <Link route={`/campaigns/${this.props.address}/requests`}>
                <a>
                    &lt;&lt;Back
                </a>
            </Link>
            <h3>Create a request</h3>
            <Label>Contract address: {this.props.address}</Label>
            <Form onSubmit={this.onSubmit}  error={this.state.statusMessage.length>0}>
                <Form.Field>
                    <label>description</label>
                    <Input
                        value={this.state.description}
                        onChange={(event) => this.setState({description:event.target.value})}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Value in ether</label>
                    <Input
                        value={this.state.value}
                        onChange={this.checkEtherAmt}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Recipient</label>
                    <Input
                        value={this.state.recipient}
                        onChange={(event) => this.setState({recipient:event.target.value})}/>
                </Form.Field>
                <Button primary loading={this.state.loading}>Create</Button>
                <Message error header="oops!" content={this.state.statusMessage} />
            </Form>
            </Layout>
        );
    }
}

export default NewRequest;