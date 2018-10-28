import React,{Component} from 'react';
import Layout from '../../../components/Layout';
import {Table, Button, Tab}  from 'semantic-ui-react'; 
import {Link} from "../../../routes";
import campaignfunc from "../../../ethereum/campaign";
import RequestRow from "../../../components/RequestRow";

class RequestIndex extends Component{

    static async getInitialProps(props){
        //running in server
        const {address} = props.query;
        const campaignContract = campaignfunc(address);
        
        const numOfRequests = await campaignContract.methods.getRequestsCount().call();

        const requests=await Promise.all(
            Array(parseInt(numOfRequests)).fill()
            .map(
                (element, index) => {
                    return campaignContract.methods.requests(index).call();
                }
            )
        );
        
        return {
            address,requests,requestCount:numOfRequests
        }
    }

    //Helper method to render request in each tow
    renderRequestEachRow(){
        return this.props.requests.map(
            (req,index) =>{
                return <RequestRow
                    key={index}
                    request={req}
                    address={this.props.address}
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
                    <Button primary>Add Request</Button>
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
            </Layout>
        );
    }
};

export default RequestIndex;