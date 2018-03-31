import {CARDS_IN_DECK} from "../../config";
import {arrayShuffle} from "../utils";

export class Deck {
    constructor(cards = []) {
        if (cards.length !== CARDS_IN_DECK) {
            throw Error(`wrong number of cards ${cards.length} (expected ${CARDS_IN_DECK})`)
        }
        this.cards = cards;
    }

    shuffle() {
        this.cards = arrayShuffle(this.cards);
    }

    cardLeft() {
        return this.cards.length;
    }

    draw() {
        return this.cards.pop();
    }
}