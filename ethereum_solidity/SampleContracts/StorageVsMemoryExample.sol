pragma solidity ^0.4.17;



contract StorageVsMemoryExample{
    int[] public numbers;
    
    constructor () public{
        numbers.push(20);
        numbers.push(32);
    }
    
    function UpdateStorage() public{
        int[] storage myArray = numbers;
        //Assign myArray
        myArray[0]=0;
    }
    
    function UpdateMemory() public{
        int[] memory myArray = numbers;
        myArray[0]=20;
    }
    
    function getNumbers()public returns (int[]){
        return numbers;
    }
    
    function runMemoryCopy() public{
        MakeAMemoryCopy(numbers);
    }
    function runStorageCopy() public{
        MakeAStorageCopy(numbers);
    }
    
    //default is memory without specification!!!
    function MakeAMemoryCopy(int[] memory mynum) private{
        mynum[0]=2;
    }
    function MakeAStorageCopy(int[] storage mynum)private{
        mynum[0]=3;
    }
    
}