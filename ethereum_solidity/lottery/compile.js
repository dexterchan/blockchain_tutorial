const path = require('path');
const fs = require('fs');
const solc=require('solc');

const ContractPath = path.resolve(__dirname,'contracts','lottery.sol');
const source = fs.readFileSync(ContractPath,'utf8');

obj= solc.compile(source,1);
console.log(obj);
module.exports=obj.contracts[":Lottery"];


