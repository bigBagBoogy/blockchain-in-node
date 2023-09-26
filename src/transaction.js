// transaction.ts
export class Transaction {
    constructor(from, to, amount) {
        this.from = from;
        this.to = to;
        this.amount = amount;
    }
    toString() {
        return JSON.stringify(this);
    }
}
