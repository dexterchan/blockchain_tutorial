# Lottery use case
A use case of Lottery on Ethereum blockchan

# Compile Solidity Contract
Run:
node compile.js

#Run the test case
Run:
npm run test <br>
test script is connecting to local node emulated by ganache

# Lottery Contract - place bet
Initially, player sends eth to the pool<br>
![LotteryOverview](pic/LotteryContractOverview.png)<br>
# Lottery Contract - choose winner
Manager chose a winner<br>
![LotteryWinner](pic/LotteryContractPLayers.png )<br>
# Lottery Contract - return the reward<br>
![LotteryReward](pic/LotteryContractPay.png)<br>

# Lottery Contract function overview <br>
![Lottery function](pic/LotteryContractFunctions.png)<br>

# Pseudo Random Generator <br>
![Pseudo Random](pic/PseudoRandomGenerator.png)<br>

# Ethereum Web App Architecture
![EthWebAppArchi](pic/EthereumWebAppArchitecture.png)

# Ethereum Dapp with metamask
Every page of your browser is injected with web3 V0.2 provider with metamask. <br>
That web3 instance with Metamask was ready to connect to Rinkeby network.<br>
Our Dapp is using web3V1.0. <br>
However, metamask web3 stores all private keys inside the provider.<br>
Therefore, Dapp web3 tap on metamask web3.<br>
![EthDappMetamask](pic/DappwithMetamask.png)

# Ethereum Front-end events - render the contract info lifecycle
![EthRender](pic/RenderContractOnReactJS.png)