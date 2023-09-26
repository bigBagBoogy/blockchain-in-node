import * as crypto from 'crypto';
import { handleUserInput } from './userInput';
import { Transaction } from './transaction';


class Block {

    public nonce = Math.round(Math.random() * 999999999);
    constructor(public prevHash: string, public transaction: Transaction, public ts = Date.now()) {
        
    }
    get hash() {
        const str = JSON.stringify(this);
        const hash = crypto.createHash('sha256');
        hash.update(str).end();
        return hash.digest('hex');
    }

}
class Chain {
    public static instance = new Chain();   //class Chain { ... } defines a class named Chain. This class likely represents a blockchain or blockchain-related functionality.  public static instance = new Chain(); is a class property declaration. Here's what it means:   public: This keyword specifies the visibility of the property. In this context, public means that the property can be accessed and modified from outside the class.   static: This keyword indicates that the property is associated with the class itself rather than with instances of the class. In other words, you can access it as Chain.instance without needing to create an instance of the Chain class.    instance: This is the name of the property. It's named instance, but you could choose any valid variable name.    = new Chain();: This part of the code initializes the instance property with a new instance of the Chain class. It essentially creates a singleton pattern, where there is only one instance of the Chain class throughout the application. This is often used for scenarios where you want a single point of access to a particular resource, like a blockchain.    By declaring instance as a public static property and initializing it with a new instance of Chain, you ensure that you can access the blockchain instance from anywhere in your codebase using Chain.instance.       This pattern is common in both TypeScript and JavaScript when you want to create a singleton or provide a central point of access to a particular resource or service. It allows you to maintain a single instance of an object throughout your application, ensuring consistency and simplifying access to that object.

    chain: Block[];

    constructor() {
        this.chain = [new Block('', new Transaction('', '', 100))]
    }
    getLastBlock() {
        return this.chain[this.chain.length - 1];
    }
    mine(block: Block, difficulty: number, pendingTransaction: Transaction) {
        let solution = 1;
        console.log('⛏️  mining...')
    
        const mineBlock = () => {
            const hash = crypto.createHash('MD5');
            hash.update((block.nonce + solution).toString()).end();
    
            const attempt = hash.digest('hex');
    
            if (attempt.substring(0, difficulty) === '0'.repeat(difficulty)) {
                console.log(`Solved: ${solution}`)
                
                // Create a new block with the pending transaction
                const newBlock = new Block(block.hash, pendingTransaction);
                
                // Add the new block to the blockchain
                this.chain.push(newBlock);
            } else {
                // If not solved, continue mining with a delay
                setTimeout(mineBlock, 1000); // Adjust the delay as needed
            }
        };
    
        mineBlock(); // Start mining
    }
    


    
    


    addBlock(transaction: Transaction, senderPublicKey: string, signature: Buffer) {
        const verifier = crypto.createVerify('SHA256');
        verifier.update(transaction.toString());

        const isValid = verifier.verify(senderPublicKey, signature);

        if (isValid) {
            const newBlock = new Block(this.getLastBlock().hash, transaction);
            this.chain.push(newBlock);
        }
        
    }

}
class Wallet {
public publicKey: string;
public privateKey: string;

constructor() {
    const keyPair = crypto.generateKeyPairSync('rsa', {
        modulusLength: 2048,
        publicKeyEncoding: {
            type: 'spki',
            format: 'pem'
        },
        privateKeyEncoding: {
            type: 'pkcs8',
            format: 'pem'
        }
    })
    this.privateKey = keyPair.privateKey;
    this.publicKey = keyPair.publicKey;
}
sendMoney(amount: number, payeePublicKey: string) {
    const transaction = new Transaction(this.publicKey, payeePublicKey, amount);

    const sign = crypto.createSign('SHA256');
    sign.update(transaction.toString()).end();

    const signature = sign.sign(this.privateKey);
    Chain.instance.addBlock(transaction, this.publicKey, signature);
}


}
// Function to periodically mine new blocks and clear transactions
function mineAndConfirm(blockchain: Chain, pendingTransaction: Transaction) {
    const difficulty = 4; // Set the desired difficulty level
    const currentBlock = blockchain.getLastBlock(); // Get the current block
    blockchain.mine(currentBlock, difficulty, pendingTransaction); // Mine a new block with the pending transaction
    
    // Clear confirmed transactions from the pending pool (if you have such a function)
    // clearConfirmedTransactions(newBlock);
}


// Define processUserInput function outside of the IIFE
async function processUserInput(sender: string, recipient: string, amount: number) {
    await handleUserInput(sender, recipient, amount, (transaction) => {
      // Access the amount from the transaction object
      const amount = transaction.amount;
  
      // Periodically mine new blocks and confirm transactions
      mineAndConfirm(Chain.instance, new Transaction('', '', amount));
    });
  }
  
  (async () => {
    while (true) {
      try {
        // Call processUserInput with appropriate values
        await processUserInput('sender_address', 'recipient_address', 10); // Replace with actual values
  
        // Add a delay (e.g., 1 second) before the next iteration
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Adjust the delay duration as needed
      } catch (error) {
        // Handle errors from user input
        console.error(error);
      }
    }
  })();
  
  