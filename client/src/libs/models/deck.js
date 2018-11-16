import {arrayShuffle} from "../utils";
import {Card} from './card';

export class Deck {
    constructor(cards = []) {
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

    toJs() {
        return {
            cards: this.cards.map(c => c.toJs())
        }
    }

    static fromJs(jsObject) {
        const deck = new Deck();
        deck.cards = jsObject.cards.map(c => Card.fromJs(c));
        return deck;
    }
}