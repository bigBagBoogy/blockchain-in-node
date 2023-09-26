// script.js
import { getSenderBalance } from "./userInput.js";

// Get references to HTML elements
const senderInput = document.getElementById("sender");
const recipientInput = document.getElementById("recipient");
const amountInput = document.getElementById("amount");
const submitButton = document.getElementById("submitTransaction");
const transactionResult = document.getElementById("transactionResult");

// Event listener for the Submit Transaction button
submitButton.addEventListener("click", () => {
  const sender = senderInput.value;
  const recipient = recipientInput.value;
  const amount = parseFloat(amountInput.value);

  // Check if inputs are valid
  if (!sender || !recipient || isNaN(amount) || amount <= 0) {
    transactionResult.textContent = "Invalid input. Please check your values.";
  } else {
    // Create a transaction object
    const transaction = {
      sender,
      recipient,
      amount,
    };

    // Send the transaction to your blockchain logic
    sendTransaction(transaction);
  }
});

// Function to send the transaction to the blockchain (replace with your logic)
function sendTransaction(transaction) {
  // You can implement the logic to send the transaction to your blockchain here
  // For demonstration, we'll simply display the transaction details
  transactionResult.textContent = `Transaction sent:
    Sender: ${transaction.sender}
    Recipient: ${transaction.recipient}
    Amount: ${transaction.amount}`;
}
// script.js

// Replace these addresses with actual addresses
const addresses = ["0xAddress1", "0xAddress2", "0xAddress3"];

// Function to update the UI with balances
function updateUI() {
  addresses.forEach((address) => {
    const balance = getSenderBalance(address);
    const element = document.getElementById(`balance-${address}`);
    if (element) {
      element.textContent = `Balance of ${address}: ${balance}`;
      console.log(`Balance of ${address}: ${balance}`);
    }
  });
}

// Call the updateUI function when needed
updateUI();
