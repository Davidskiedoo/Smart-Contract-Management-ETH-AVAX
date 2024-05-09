# Smart Contract Management

Overview 

This project provides a demonstration of basic ATM functionalities implemented on Ethereum and Avalanche blockchains. It consists of two main components: a React frontend for interacting with the smart contract and a Solidity smart contract implementing the ATM functionalities.

## Requirements
To interact with the smart contract, you'll need:
* MetaMask wallet for Ethereum interaction
* Compatible Ethereum and Avalanche networks for deploying and managing smart contracts
* Basic understanding of Ethereum and Avalanche blockchain ecosystems

## Usage
1. Ensure you have MetaMask installed for Ethereum interaction.
2. Deploy the provided Solidity smart contract on a compatible Ethereum or Avalanche network.
3. Connect your MetaMask wallet to the deployed smart contract.
4. Interact with the ATM functionalities through the provided React frontend.

## Smart Contract Details 
The Solidity smart contract implements basic ATM functionalities including deposit and withdrawal operations. It also includes error handling for insufficient balance during withdrawal.

Contract Name
* Name: Assessment

State Variables
* owner: Type: address payable. Description: Stores the address of the contract owner.
* balance: Type: uint256. Description: Tracks the balance of the contract.

Events
* Deposit(uint256 amount): Emits when funds are deposited into the contract.
* Withdraw(uint256 amount): Emits when funds are withdrawn from the contract.

Constructor
* Parameters: uint initBalance. Description: Initializes the contract owner and sets the initial balance.
* Payable: Yes. Allows initial funding of the contract upon deployment.
  
Functions
getBalance()
* Visibility: Public
* Returns: uint256. Description: Retrieves the current balance of the contract.
  
deposit(uint256 _amount)
* Visibility: Public
* Parameters: _amount: Type: uint256. Description: The amount to be deposited.
* Payable: Yes. Allows the function to receive funds.
* Description: Deposits funds into the contract. Only the contract owner can deposit funds.
  
withdraw(uint256 _withdrawAmount)
* Visibility: Public
* Parameters: _withdrawAmount: Type: uint256. Description: The amount to be withdrawn.
* Description: Allows the contract owner to withdraw funds from the contract. Throws an error if the withdrawal amount exceeds the contract balance.

Custom Error
* Name: InsufficientBalance
* Parameters: uint256 balance, uint256 withdrawAmount. Description: Custom error thrown when attempting to withdraw an amount greater than the contract balance.

## Deployment
* Steps on how to run this program 
* In the IDE open the terminal and type npm i
* Then open 2 additional terminal and type npx hardhat node
* In the third terminal type npx hardhat run --network localhost scripts/deploy.js
* Then go back to the first terminal and type npm run dev to launch the front-end
* Then click the link provided below or you can manually go there by typing http://localhost:3000/

## Authors
David Joshua B. Bucol

## License
This project is licensed under the MIT License - see the LICENSE.md file for details
