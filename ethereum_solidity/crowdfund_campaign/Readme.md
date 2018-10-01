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

## Today Crowd Funding such as KickStarter
### Ideal case
![KickStarterIdealWorld](pic/KickStarterIdealWorld.png)

### Real World
Capital being spent without control.<br>
Lack of transparency to stakeholder of monitoring delivery.<br>
No control if spending outside of project.<br>
![KickStarterNonIdeal](pic/KickStarterNonIdeal.png)

