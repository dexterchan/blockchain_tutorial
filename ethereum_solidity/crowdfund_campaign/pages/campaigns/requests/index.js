import React,{Component} from 'react';
import Layout from '../../../components/Layout';
import {Table, Button}  from 'semantic-ui-react'; 
import {Link} from "../../../routes";
import campaignfunc from "../../../ethereum/campaign";
import RequestRow from "../../../components/RequestRow";

class RequestIndex extends Component{

    static async getInitialProps(props){
        //running in server
        const {address} = props.query;
        const campaignContract = campaignfunc(address);
        
        const numOfRequests = await campaignContract.methods.getRequestsCount().call();
        const approverCount = await campaignContract.methods.approverCount().call();
        const requests=await Promise.all(
            Array(parseInt(numOfRequests)).fill()
            .map(
                (element, index) => {
                    return campaignContract.methods.requests(index).call();
                }
            )
        );
        
        return {
            address,requests,requestCount:numOfRequests,approverCount
        }
    }

    //Helper method to render request in each tow
    renderRequestEachRow(){
        return this.props.requests.map(
            (req,index) =>{
                return <RequestRow
                    key={index} //key as required in JSX 
                    ID={index}
                    request={req}
                    address={this.props.address}
                    approverCount={this.props.approverCount}
                />
            }
        );
    }


    render(){
        const {Header, Row, HeaderCell, Body}=Table;
        return (
            <Layout>
            <h1>Requests</h1>
            <Link route={`/campaigns/${this.props.address}/requests/new`}>
                <a>
                    <Button primary floated="right" style={  {marginBottom:10}  }>Add Request</Button>
                </a>
            </Link>
            <Table>
                <Header>
                    <Row>
                        <HeaderCell>ID</HeaderCell>
                        <HeaderCell>Description</HeaderCell>
                        <HeaderCell>Amount</HeaderCell>
                        <HeaderCell>Recipient</HeaderCell>
                        <HeaderCell>Approval Count</HeaderCell>
                        <HeaderCell>Approval</HeaderCell>
                        <HeaderCell>Finalize</HeaderCell>
                    </Row>
                </Header>
                <Body>
                    {this.renderRequestEachRow()}
                </Body>
            </Table>
            <div>Found {this.props.requestCount} number of request</div>
            </Layout>
        );
    }
};

export default RequestIndex;