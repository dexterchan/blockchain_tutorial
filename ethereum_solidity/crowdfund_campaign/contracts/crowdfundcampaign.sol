pragma solidity ^0.4.17;

contract crowdfundcampaign{
    struct Request{
        string description;
        uint value;
        address recipient;
        bool complete;
        
        mapping(address=>bool)approvals;
        uint approvalCount;
    }
    address public manager;
    uint public minimumContribution; //amt is in wei
    mapping (address=>bool) public approvers;
    address[] public approverAddressLst ;//since mapping not have iteration, we need to have approver array list
    Request[] public requests;
    
    //our constructor
    constructor (uint minimumfund) public{
        manager=msg.sender;
        minimumContribution=minimumfund;
        
    }
    
    function contribute() public payable{
        require(msg.value> minimumContribution);
        approverAddressLst.push(msg.sender);
        approvers[msg.sender]=true;
    }
    modifier restrictedmgr(){
        require(msg.sender==manager,"Only manager can create request");
        _;
    }
    function createRequest(string description, uint value,  address recipient)  
        public restrictedmgr{
            
            //Creation of instance of Struct (here is "Request") is in memory
            //Not storage
            //requires "memory" keyword to reference new instance
            //only initialize value type
            Request memory newRequest =  Request({
               description:description,
               value:value,
               recipient:recipient,
               complete:false,
               approvalCount:0
            });
            
            requests.push(newRequest);
    }
    function approveRequest(uint index) public{
        require(index<requests.length,"Not able to find this contract");
        Request storage request= requests[index];
        require(approvers[msg.sender],"You must be one of the contributor to approve");
        
        require(!request.approvals[msg.sender],"You have approved once");
        //How to ensure transaction of below 2 statements?
        request.approvals[msg.sender]=true;//Statement 1
        request.approvalCount++; //Statement 2
    }
    function finalizeRequest(uint index) public restrictedmgr{
        require(index<requests.length,"Not able to find this contract");
        Request storage request= requests[index];
        
        require(request.approvalCount>(approverAddressLst.length/2));
        require(!request.complete,"Request has been completed.");
        
        request.recipient.transfer(request.value);
        request.complete=true;
        
    }
}