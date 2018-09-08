pragma solidity ^0.4.17;

contract Lottery{
    address public manager;
    address[] public players;
    
    function Lottery () public{ //constructor
        //Global variable msg which contains transaction details
        manager=msg.sender; 
        
    }
    function enter()public payable{
        //Global variable msg which contains transaction details
        uint amt = msg.value;
        require(amt> 0.01 ether/*0.01e18*/); //value is in wei
        players.push(msg.sender);
    }
    
    function random() private view returns (uint){
        uint bigNum=uint(sha3(block.difficulty,now,players));//keccak256 eqv
        return bigNum;
    }
    
    function pickWinner() public {
        require(players.length>0);
        uint winnerIndex = random()%players.length ;
        
    }
}