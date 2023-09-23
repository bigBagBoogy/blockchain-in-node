import * as crypto from 'crypto';




class Transaction {
    constructor(public from: string, public to: string, public amount: number) {
        
    }
    toString() {
        return JSON.stringify(this);
    }

}
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
    public static instance = new Chain();

    chain: Block[];

    constructor() {
        this.chain = [new Block('', new Transaction('', '', 100))]
    }
    getLastBlock() {
        return this.chain[this.chain.length - 1];
    }
    mine(nonce: number) {
    let solution = 1;
    console.log('⛏️  mining...')

    while (true) {
        const hash = crypto.createHash('MD5');
        hash.update((nonce + solution).toString()).end();

        const attempt = hash.digest('hex');

        if (attempt.substring(0, 4) === '0000') {
            console.log(`Solved: ${solution}`)
            return solution;
        }
    }}

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
const satoshi = new Wallet();
const bob = new Wallet();
const alice = new Wallet();

satoshi.sendMoney(50, bob.publicKey);
bob.sendMoney(23, alice.publicKey);
alice.sendMoney(5, bob.publicKey);

console.log(Chain.instance);
