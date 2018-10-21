import React,{Component} from 'react';
import web3 from '../ethereum/web3';

import {Form, Button,Input, Message,Dropdown,Label}  from 'semantic-ui-react'; 
import campaignfunc from "../ethereum/campaign";

import {Router} from "../routes";

class ContributeForm extends Component{

    state={
        contribution:"",
        statusMessage:"",
        loading:false
    };
    checkContribution = (event)=>{
        const r = event.target.value;
        if (Number.isNaN(Number.parseFloat(r))) {
            this.setState({contribution:""});
            this.setState({statusMessage:"contribution should be numberic"});
            return;
        }
        this.setState({contribution:r});
        this.setState({statusMessage:""})
    };

    onSubmit= async (event)=>{
        event.preventDefault();//avoid browser to auto-submit the form
        const campaignContract = campaignfunc(this.props.address);
        
        try{
            this.setState({loading:true});
            const accounts = await web3.eth.getAccounts();
            console.log(accounts);
            const contributorAddress = accounts[0];//A hack

            await campaignContract.methods.contribute().send(
                {from: contributorAddress , 
                value:web3.utils.toWei(this.state.contribution,'ether')}
            );

            Router.replaceRoute(`/campaigns/${this.props.address}`);
        }catch(err){
            this.setState({statusMessage:err.message});
        }finally{
            this.setState({loading:false});
            this.setState({contribution:""});
        }
    };

    render(){

        return (
            
            <Form onSubmit={this.onSubmit} error={this.state.statusMessage.length>0}>
            <Label>Contribution to {this.props.address}</Label>
                <Form.Field>
                    <label>Amount to contribute</label>

                    <Input  
                    label={<Dropdown defaultValue='ether' options={[{ key: 'ether', text: 'ether', value: 'ether' }]} />}
                    labelPosition='right'
                    placeholder='contribution' 
                    value={this.state.contribution}
                    onChange={this.checkContribution}
                    />
                </Form.Field>
                <Button loading={this.state.loading} primary={true} type='submit'>Contribute!</Button>
                <Message error header="oops!" content={this.state.statusMessage} />
            </Form>
        );
    }
};


export default ContributeForm;