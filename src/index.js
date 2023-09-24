"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = __importStar(require("crypto"));
class Transaction {
    constructor(from, to, amount) {
        this.from = from;
        this.to = to;
        this.amount = amount;
    }
    toString() {
        return JSON.stringify(this);
    }
}
class Block {
    constructor(prevHash, transaction, ts = Date.now()) {
        this.prevHash = prevHash;
        this.transaction = transaction;
        this.ts = ts;
        this.nonce = Math.round(Math.random() * 999999999);
    }
    get hash() {
        const str = JSON.stringify(this);
        const hash = crypto.createHash('sha256');
        hash.update(str).end();
        return hash.digest('hex');
    }
}
class Chain {
    constructor() {
        this.chain = [new Block('', new Transaction('', '', 100))];
    }
    getLastBlock() {
        return this.chain[this.chain.length - 1];
    }
    mine(nonce) {
        let solution = 1;
        console.log('⛏️  mining...');
        const mineBlock = () => {
            const hash = crypto.createHash('MD5');
            hash.update((nonce + solution).toString()).end();
            const attempt = hash.digest('hex');
            if (attempt.substring(0, 4) === '0000') {
                console.log(`Solved: ${solution}`);
                return solution;
            }
            else {
                // If not solved, continue mining with a delay
                setTimeout(mineBlock, 1000); // Adjust the delay as needed
            }
        };
        mineBlock(); // Start mining
    }
    addBlock(transaction, senderPublicKey, signature) {
        const verifier = crypto.createVerify('SHA256');
        verifier.update(transaction.toString());
        const isValid = verifier.verify(senderPublicKey, signature);
        if (isValid) {
            const newBlock = new Block(this.getLastBlock().hash, transaction);
            this.chain.push(newBlock);
        }
    }
}
Chain.instance = new Chain(); //class Chain { ... } defines a class named Chain. This class likely represents a blockchain or blockchain-related functionality.  public static instance = new Chain(); is a class property declaration. Here's what it means:   public: This keyword specifies the visibility of the property. In this context, public means that the property can be accessed and modified from outside the class.   static: This keyword indicates that the property is associated with the class itself rather than with instances of the class. In other words, you can access it as Chain.instance without needing to create an instance of the Chain class.    instance: This is the name of the property. It's named instance, but you could choose any valid variable name.    = new Chain();: This part of the code initializes the instance property with a new instance of the Chain class. It essentially creates a singleton pattern, where there is only one instance of the Chain class throughout the application. This is often used for scenarios where you want a single point of access to a particular resource, like a blockchain.    By declaring instance as a public static property and initializing it with a new instance of Chain, you ensure that you can access the blockchain instance from anywhere in your codebase using Chain.instance.       This pattern is common in both TypeScript and JavaScript when you want to create a singleton or provide a central point of access to a particular resource or service. It allows you to maintain a single instance of an object throughout your application, ensuring consistency and simplifying access to that object.
class Wallet {
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
        });
        this.privateKey = keyPair.privateKey;
        this.publicKey = keyPair.publicKey;
    }
    sendMoney(amount, payeePublicKey) {
        const transaction = new Transaction(this.publicKey, payeePublicKey, amount);
        const sign = crypto.createSign('SHA256');
        sign.update(transaction.toString()).end();
        const signature = sign.sign(this.privateKey);
        Chain.instance.addBlock(transaction, this.publicKey, signature);
    }
}
const satoshi = new Wallet();
const bob = new Wallet();
const alice = new Wallet();
satoshi.sendMoney(50, bob.publicKey);
bob.sendMoney(23, alice.publicKey);
alice.sendMoney(5, bob.publicKey);
console.log(Chain.instance);
