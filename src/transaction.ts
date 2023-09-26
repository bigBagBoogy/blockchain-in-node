// transaction.ts
export class Transaction {
    constructor(public from: string, public to: string, public amount: number) {
        
    }
    toString() {
        return JSON.stringify(this);
    }
}
