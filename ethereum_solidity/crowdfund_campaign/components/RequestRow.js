import React, {Component} from "react";
import {Table,Button}  from 'semantic-ui-react'; 
import web3 from "../ethereum/web3";
import campaignfunc from "../ethereum/campaign";
class RequestRow extends Component{

    state={
        approverloading:false,
        finalizeLoading:false
    }
    onFinalize =async(event)=>{
        try{
            this.setState({finalizeLoading:true});
            const accounts = await web3.eth.getAccounts();
            const mgrAddress = accounts[0];//A hack
            const campaignContract = campaignfunc(this.props.address);
            
            await campaignContract.methods.finalizeRequest(this.props.ID).send({from:mgrAddress});

            Router.pushRoute(`/campaigns/${this.props.address}/requests`);
        }catch(err){
            console.log(err.message);
        }finally{
            this.setState({finalizeLoading:false});
        }

    };
    onApprove= async (event)=>{
        try{
            this.setState({approverloading:true});
            const accounts = await web3.eth.getAccounts();
            const approverAddress = accounts[0];//A hack
            const campaignContract = campaignfunc(this.props.address);
            
            await campaignContract.methods.approveRequest(this.props.ID).send({from:approverAddress});
            Router.pushRoute(`/campaigns/${this.props.address}/requests`);

        }catch(err){
            console.log(err.message);
        }finally{
            this.setState({approverloading:false});
        }
        
    };

    render(){
        const {Row,Cell}=Table;
        const {ID,request,approverCount} = this.props;

        //A ugly hack to be refactored in the contract
        const readyToApprove = request.approvalCount/approverCount>0.5;

        return(
            <Row disabled={request.complete}
                positive = {readyToApprove && ! request.complete}
            >
                <Cell>{ID}</Cell>
                <Cell>{request.description}</Cell>
                <Cell>{web3.utils.fromWei(request.value,"ether") }</Cell>
                <Cell>{request.recipient}</Cell>
                <Cell>{request.approvalCount}/{approverCount}</Cell>
                <Cell>
                    {
                        request.complete ? null:(
                            <Button loading={this.state.approverloading}  color="green" basic onClick={this.onApprove} >
                                Approve
                            </Button>
                        )
                    }
                </Cell>
                <Cell>
                    {
                        request.complete? null:(
                            <Button loading={this.state.finalizeLoading} color="teal" basic onClick={this.onFinalize}>
                                Finalize
                            </Button>
                        )
                    }
                </Cell>
            </Row>
        );
    }

};

export default RequestRow;