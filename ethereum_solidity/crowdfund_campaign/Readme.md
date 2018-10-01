# Crowd Funding Campaign on Ethereum

## Workflow
Manager setups a contract for fund raising.
Contributors put $$$ into the contract as contributor.
Each contributor becomes approver of each spending to vendor.
For each request of money spent, it requires voting support from approvers.
![Eth_ProjectFund](pic/Eth_ProjectFund.png)


## Contract
![Campaign Contract](pic/Campaign_Contract.png)

## Voting Rule 1 - Single vote per request from each approver
For each spending request, No multiple vote by a single person
![Single vote](pic/VotingRule1_NoMulitpleVoteSinglePerson.png)

## Voting Rule 2 - Resilient for large number of approvers
Expect thousands of approvers in voting <br>
System resilient for thousands of approvers
![resilient](pic/VotingRule2_ResilientMultipleContributor.png)

## Approval of request

![approvalrequest](pic/RequestApproval.png)

## Deployment of campaign
![deployContract](pic/DeploymentContractNetwork.png)

### Target Architecture
A factory contract to allow<br>
1) User cannot modify our campaign contract to address security concern<br>
2) User pay the deployment of the contracts<br>
![TArchi](pic/TargetArchitecture.png)

Factory contract to manage campaign contract<br>
![FactoryContract](pic/TargetArchitecture_FactoryContract.png)

Factory Contract<br>
![factoryContract](pic/Contract_Factory_template.png)

### Concern allowing user to deploy their own contract instead our service
User gets the source code of the contract and deploy it into nework on their own.<br>
Concern:<br>
1) Before deployment themselves, users can modify the contract and insert backdoor => lead to security flaw<br>
2) Our service is difficult to validate the address of the contract (dependency on user to provide the deployed address back to service)<br>
![concern1](pic/Solution1.png) <br>
Security flaw illustrated as below <br>
![concern1_security](pic/Solution1_securityIssue.png)

### Concern our service to deploy contract on behalf of users
Our service helps user to deploy the contract. <br>
Concern: <br>
Our service pays gas to deploy the contract<br>
=> More complexity on system workflow to charge gas payment back to users.<br>
![concern2](pic/Solution2.png)

## Today Crowd Funding such as KickStarter
### Ideal case
![KickStarterIdealWorld](pic/KickStarterIdealWorld.png)

### Real World
Capital being spent without control.<br>
Lack of transparency to stakeholder of monitoring delivery.<br>
No control if spending outside of project.<br>
![KickStarterNonIdeal](pic/KickStarterNonIdeal.png)

