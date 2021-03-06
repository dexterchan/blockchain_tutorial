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
        require(amt > 0.01 ether,"not enough wei"); /*0.01e18 wei*/ //value is in wei
        players.push(msg.sender);
    }
    
    function random() private view returns (uint){
        uint bigNum=uint(sha3(block.difficulty,now,players));//keccak256 eqv
        return bigNum;
    }
    
    // "restrictedOnlyManager" is the modifier to insert default code
    function pickWinner() public restrictedOnlyManager returns (address){
        require(players.length>0,"Number of player must be >0");
        //require(msg.sender == manager,"You must be manager to run this function");
        uint winnerIndex = random()%players.length;
        
        address winner = players[winnerIndex];
        winner.transfer(this.balance);
        //empty the players for next run by using new dynamic array with initial size of zero
        players = new address[] (0);
        return winner;
    }
    modifier restrictedOnlyManager() {
        require(msg.sender == manager,"You must be manager to run this function");
        _;//run for the rest of the code
    }
    function getPlayers() public view returns (address[]){
        return players;
    }
}