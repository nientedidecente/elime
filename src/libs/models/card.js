import {TYPES} from "./types";

export const CARD_COSTS = {
    LOW: 1,
    HIGH: 10
};

export class Card {
    constructor({name, type, cost, action = null}) {
        this.name = name;
        if (Object.values(TYPES).indexOf(type) < 0) {
            throw Error(`invalid type ${type}`);
        }
        this.type = type;
        this.cost = cost;
        this.action = action;
    }

}