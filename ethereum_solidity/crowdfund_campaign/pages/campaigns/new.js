import React,{Component} from 'react';
import factory from "../../ethereum/factory";
import { Button, Form ,Dropdown,Input,Label,Message} from 'semantic-ui-react'

import Layout from "../../components/Layout";
import web3 from '../../ethereum/web3';
import {Link,Router} from "../../routes";
//Link object is a React component to render anchor tags in React component
//Router object route page from page



class CampaignNew extends Component {
    state={
        minimumContribution:"",
        statusMessage:"",
        loading:false
    };

    checkMinimumContribution = (event)=>{
        const r = event.target.value;
        let parseValue=Number.parseFloat(r);
        
        if (Number.isNaN(parseValue)) {
            this.setState({minimumContribution:""});
            this.setState({statusMessage:"Min contribution should be numberic"});
            return;
        }
        if(r.endsWith(".") || r.endsWith("0")) {
            parseValue=r;
        }else{
            parseValue=parseValue.toString();
        }
        this.setState({minimumContribution:parseValue})
        this.setState({statusMessage:""})
    };

    onSubmit= async (event)=>{
        event.preventDefault();//avoid browser to auto-submit the form

        
        try{
            this.setState({loading:true,statusMessage:""});
            const accounts = await web3.eth.getAccounts();
            const campaignMgrAddress = accounts[0];
            const amt = web3.utils.toWei(this.state.minimumContribution,"ether");
            let retObj=await factory.methods.createCrowdFundCampaign(amt).send(
                {
                    from: campaignMgrAddress,  gas:1000000
                }
            );
            Router.pushRoute("/");//if successful, route user to other page
            
            console.log(retObj);

        }catch(err){
            this.setState({statusMessage:err.message});
        }finally {
            this.setState({loading:false});
        }
        
    };

    render(){

        return (
            <Layout>
                <h1>Create a campaign</h1>
                <Form onSubmit={this.onSubmit} error={this.state.statusMessage.length>0} >
                    <Form.Field>
                    <label>Minimum contribution</label>
                    <Input  
                    label={<Dropdown defaultValue='ether' options={[
                        { key: 'ether', text: 'ether', value: 'ether' },
                        { key: 'wei', text: 'wei', value: 'wei' }
                      ]} />}
                    labelPosition='right'
                    placeholder='minimum contribution' 
                    value={this.state.minimumContribution}
                    onChange={this.checkMinimumContribution}
                    />
                    </Form.Field>

                    <Button loading={this.state.loading} primary={true} type='submit'>Create!</Button>
                    <Message error header="oops!" content={this.state.statusMessage} />
                </Form>
                
                
                
            </Layout>
            
        );
    }
};



export default CampaignNew;