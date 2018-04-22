import {range} from 'uvk';
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
}

export {Player}