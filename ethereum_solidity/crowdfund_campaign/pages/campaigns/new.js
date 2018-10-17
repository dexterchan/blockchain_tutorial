import React,{Component} from 'react';
import factory from "../../ethereum/factory";
import { Button, Form ,Dropdown,Input,Label,Message} from 'semantic-ui-react'

import Layout from "../../components/Layout";
import web3 from '../../ethereum/web3';
const options = [
    { key: 'ether', text: 'ether', value: 'ether' },
    { key: 'wei', text: 'wei', value: 'wei' }
  ]

class CampaignNew extends Component {
    state={
        minimumContribution:"",
        statusMessage:"",
        loading:false
    };

    checkMinimumContribution = (event)=>{
        const r = event.target.value;
        if (Number.isNaN(Number.parseFloat(r))) {
            this.setState({minimumContribution:""});
            this.setState({statusMessage:"Min contribution should be numberic"})
            return;
        }
        this.setState({minimumContribution:r})
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
            Console.log(retObj)
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
                    label={<Dropdown defaultValue='ether' options={options} />}
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