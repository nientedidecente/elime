import {range} from 'uvk';
import {Card} from './card';
import {Deck} from './deck';
import {SLOTS} from "./battlefield";

const FALLBACK_LIFE = 20;
const CARD_IN_HAND = 4;

class Player {
    name = null;
    deck = null;
    hand = [];
    discardPile = [];
    life = FALLBACK_LIFE;
    slots = {
        [SLOTS.LEFT]: null,
        [SLOTS.CENTER]: null,
        [SLOTS.RIGHT]: null,
    };

    constructor(id, {name, deck, life = null}) {
        this.id = id;
        this.name = name;
        this.deck = deck;
        this.life = life || FALLBACK_LIFE;
    }

    status() {
        return {
            id: this.id,
            name: this.name,
            life: this.life,
            hand: this.hand.length,
            deck: this.deck.cardLeft(),
            slots: this.slots
        }
    }

    toHand(card) {
        if (this.hand.length < CARD_IN_HAND) {
            this.hand.push(card);
        }
    }

    fromHand(position) {
        const element = this.hand[position];
        this.hand = this.hand.filter((e, i) => i !== position);
        return element;
    }

    setHand() {
        range(CARD_IN_HAND - this.hand.length).forEach(() => {
            this.hand.push(this.deck.draw());
        });
    }

    toDiscard(card) {
        this.discardPile.push(card);
    }

    play(card, slot) {
        this.hand = this.hand.filter(c => c !== card);
        this.slots[slot] = card;
    }

    toJs() {
        return {
            id: this.id,
            name: this.name,
            life: this.life,
            slots: {
                [SLOTS.LEFT]: this.slots[SLOTS.LEFT] ? this.slots[SLOTS.LEFT].toJs() : null,
                [SLOTS.CENTER]: this.slots[SLOTS.CENTER] ? this.slots[SLOTS.CENTER].toJs() : null,
                [SLOTS.RIGHT]: this.slots[SLOTS.RIGHT] ? this.slots[SLOTS.RIGHT].toJs() : null
            },
            hand: this.hand.map(c => c.toJs()),
            deck: this.deck.toJs(),
            discardPile: this.discardPile.map(c => c.toJs())
        }
    }

    static fromJs(jsObject) {
        const player = new Player(null, {});

        player.id = jsObject.id;
        player.name = jsObject.name;
        player.life = jsObject.life;
        player.slots = {
            [SLOTS.LEFT]: jsObject.slots[SLOTS.LEFT] ? Card.fromJs(jsObject.slots[SLOTS.LEFT]) : null,
            [SLOTS.CENTER]: jsObject.slots[SLOTS.CENTER] ? Card.fromJs(jsObject.slots[SLOTS.CENTER]) : null,
            [SLOTS.RIGHT]: jsObject.slots[SLOTS.RIGHT] ? Card.fromJs(jsObject.slots[SLOTS.RIGHT]) : null
        };
        player.hand = jsObject.hand.map(c => Card.fromJs(c));
        player.deck = Deck.fromJs(jsObject.deck);
        player.discardPile = jsObject.discardPile.map(c => Card.fromJs(c));
        return player;
    }
}

export {Player}