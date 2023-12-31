// userInput.ts

import { Transaction } from './transaction.js'; // Update the import path



const balances: { [address: string]: number } = {};

// Initialize balances for some addresses
balances['0xAddress1'] = 100;
balances['0xAddress2'] = 50;
balances['0xAddress3'] = 200;



export async function handleUserInput(
  sender: string,
  recipient: string,
  amount: number,
  callback: (transaction: Transaction) => void
) {
  const newTransaction = new Transaction(sender, recipient, amount);

  // Validate and add the transaction to the pending pool
  if (isValidTransaction(newTransaction, sender)) {
    addToPendingTransactions(newTransaction);
    console.log('Transaction added to the pending pool.');
    callback(newTransaction);
  } else {
    // console.log('Invalid transaction. Rejected.');
    return;
  }
}

   
class Wallet {
    public address: string;
    public balance: number;
  
    constructor() {
      // Generate a random address (you might want a more secure method in production)
      this.address = generateRandomAddress();
      this.balance = 0; // Initialize balance to 0
    }
  
    // Send funds from this wallet to another wallet
    sendFunds(recipient: Wallet, amount: number) {
      if (this.balance >= amount) {
        // Deduct the amount from sender's balance
        this.balance -= amount;
        // Increase the recipient's balance
        recipient.balance += amount;
        console.log(`Transferred ${amount} to ${recipient.address}`);
      } else {
        console.log('Insufficient balance for the transaction.');
      }
    }
  }
  
  // Helper function to generate a random address (for demonstration purposes)
  function generateRandomAddress(): string {
    return '0x' + Math.random().toString(16).slice(2, 42);
  }
  
  // Example usage:
  // const alice = new Wallet();
  // const bob = new Wallet();
  
  // alice.balance = 100; // Set Alice's balance to 100 for testing
  
  // alice.sendFunds(bob, 50); // Alice sends 50 to Bob
  // console.log(`Alice's balance: ${alice.balance}`);
  // console.log(`Bob's balance: ${bob.balance}`);
  

// Function to validate a transaction
function isValidTransaction(transaction: Transaction, sender: string): boolean {
    // Check if the sender's balance is sufficient to cover the transaction amount
    const senderBalance = getSenderBalance(sender); // You'll need to implement this function
  
    return senderBalance >= transaction.amount;
}
  // Function to add a transaction to the pending pool

  
  // Get the balance of a sender
export function getSenderBalance(sender: string): number {
    if (balances.hasOwnProperty(sender)) {
      return balances[sender];
    } else {
      return 0; // Return 0 balance for unknown sender
    }
  }
  const pendingTransactions: Transaction[] = []; // This array stores pending transactions

function addToPendingTransactions(transaction: Transaction) {
  pendingTransactions.push(transaction);
  console.log(`Transaction ${transaction} added to the pending pool.`);
}

  
  // Example usage:
  const senderAddress = '0xAddress2';
  const balance = getSenderBalance(senderAddress);
  console.log(`Balance of ${senderAddress}: ${balance}`);
  

  
