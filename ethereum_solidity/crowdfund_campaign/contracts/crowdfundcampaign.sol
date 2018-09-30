pragma solidity ^0.4.17;

contract crowdfundcampaign{
    struct Request{
        string description;
        uint value;
        address recipient;
        bool complete;
    }
    address public manager;
    uint public minimumContribution; //amt is in wei
    address[] public approvers;
    Request[] public requests;
    
    //our constructor
    constructor (uint minimumfund) public{
        manager=msg.sender;
        minimumContribution=minimumfund;
    }
    
    function contribute() public payable{
        require(msg.value> minimumContribution);
        approvers.push(msg.sender);
    }
    modifier restrictedmgr(){
        require(msg.sender==manager);
        _;
    }
    function createRequest(string description, uint value,  address recipient)  
        public restrictedmgr{
            //Creation of instance of Struct (here is "Request") is in memory
            //Not storage
            //requires "memory" keyword to reference new instance
            Request memory newRequest =  Request({
               description:description,
               value:value,
               recipient:recipient,
               complete:false
            });
            
            requests.push(newRequest);
    }
}