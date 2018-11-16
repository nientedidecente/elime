export const CARD_COSTS = {
    LOW: 1,
    HIGH: 10
};

export class Card {
    constructor({name, type, cost, action = null}) {
        this.name = name;
        this.type = type;
        this.cost = cost;
        this.action = action;
    }

    toJs() {
        return {
            name: this.name,
            type: this.type,
            cost: this.cost,
            action: this.action
        }
    }

    static fromJs(jsObject) {
        const card = new Card({});
        card.name = jsObject.name;
        card.type = jsObject.type;
        card.cost = jsObject.cost;
        card.action = jsObject.action;
        return card;
    }
}