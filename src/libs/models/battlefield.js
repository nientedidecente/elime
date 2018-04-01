import {randomizer, range} from 'uvk';
import {RESOLVE_MATRIX} from "./types";

export const SLOTS = {
    LEFT: 'left',
    CENTER: 'center',
    RIGHT: 'right',
};

export const PLAYERS = {
    ONE: 'player1',
    TWO: 'player2',
};

const FALLBACK_LIFE = 20;
const CARDS_IN_HAND = 4;

export class BattleField {
    turn = null;
    oldMoved = [];
    moves = [];
    hands = {
        [PLAYERS.ONE]: [],
        [PLAYERS.TWO]: [],
    };
    players = {
        [PLAYERS.ONE]: null,
        [PLAYERS.TWO]: null
    };
    discard = {
        [PLAYERS.ONE]: [],
        [PLAYERS.TWO]: []
    };
    lifeCounters = {
        [PLAYERS.ONE]: 0,
        [PLAYERS.TWO]: 0
    };
    slots = {
        [PLAYERS.ONE]: {
            [SLOTS.LEFT]: null,
            [SLOTS.CENTER]: null,
            [SLOTS.RIGHT]: null,
        },
        [PLAYERS.TWO]: {
            [SLOTS.LEFT]: null,
            [SLOTS.CENTER]: null,
            [SLOTS.RIGHT]: null,
        }
    };

    cumulativeCosts = {
        [PLAYERS.ONE]: {
            [SLOTS.LEFT]: 0,
            [SLOTS.CENTER]: 0,
            [SLOTS.RIGHT]: 0,
        },
        [PLAYERS.TWO]: {
            [SLOTS.LEFT]: 0,
            [SLOTS.CENTER]: 0,
            [SLOTS.RIGHT]: 0,
        }
    };

    constructor(playerOne = {}, playerTwo = {}) {
        this.players[PLAYERS.ONE] = playerOne.name || PLAYERS.ONE;
        this.players[PLAYERS.TWO] = playerTwo.name || PLAYERS.TWO;

        this.lifeCounters[PLAYERS.ONE] = playerOne.life || FALLBACK_LIFE;
        this.lifeCounters[PLAYERS.TWO] = playerTwo.life || FALLBACK_LIFE;
    }

    setHand(player, deck) {
        range(CARDS_IN_HAND).forEach(() => {
            this.hands[player].push(deck.draw());
        });
    }

    getHand(player) {
        return this.hands[player];
    }

    forceTurn(player) {
        this.turn = player;
    }

    getTurn() {
        if (this.turn) {
            const player = this.turn;
            this.turn = null;
            return player;
        }

        if (!this.oldMoved.length && !this.moves.length) {
            return randomizer.pickOne(Object.values(PLAYERS));
        }

        return this.getLastMove().player === PLAYERS.ONE ? PLAYERS.TWO : PLAYERS.ONE;
    }

    isFull() {
        let emptySlots = 0;
        Object.values(PLAYERS).forEach(p => {
            Object.values(SLOTS).forEach(s => {
                if (!this.slots[p][s]) {
                    emptySlots += 1;
                }
            })
        });
        return emptySlots === 0;
    }

    status() {
        return {
            ...this.lifeCounters
        }
    }

    getLastMove() {
        if (!this.moves.length && !this.oldMoved.length) return null;
        return this.moves[this.moves.length - 1] || this.oldMoved[this.oldMoved.length - 1];
    }

    playCard(player, card, slot) {
        if (
            this.moves.length === 1
            && this.moves[0].slot === slot
        ) {
            return false;
        }

        if (this.getTurn() !== player) {
            return false;
        }

        this.slots[player][slot] = card;
        this.moves.push({player, slot});
        return true;
    }

    resolve() {
        Object.values(SLOTS).forEach(s => {
            const playerOneCard = this.slots[PLAYERS.ONE][s];
            const playerTwoCard = this.slots[PLAYERS.TWO][s];
            const result = RESOLVE_MATRIX[playerOneCard.type][playerTwoCard.type];
            if (result === 0) {
                this.setCumulativeCost(s, playerOneCard.cost, playerTwoCard.cost);
            } else {
                const loser = result === 1 ? PLAYERS.TWO : PLAYERS.ONE;
                this.lifeCounters[loser] -= (playerTwoCard.cost + this.cumulativeCosts[loser][s]);
                this.resetCumulativeCost(s);
            }
        });

        this.reset();
        return this.isOver();
    }

    isOver() {
        return (this.lifeCounters[PLAYERS.ONE] <= 0 || this.lifeCounters[PLAYERS.TWO] <= 0);
    }

    result() {
        const winner = this.lifeCounters[PLAYERS.ONE] > this.lifeCounters[PLAYERS.TWO]
            ? PLAYERS.ONE : PLAYERS.TWO;
        const loser = winner === PLAYERS.ONE ? PLAYERS.TWO : PLAYERS.ONE;
        return {
            winner,
            loser
        }
    }

    reset() {
        Object.values(PLAYERS).forEach(p => {
            Object.values(SLOTS).forEach(s => {
                this.toDiscard(p, this.slots[p][s]);
                this.slots[p][s] = null;
            });
        });
        this.oldMoved = [...this.moves];
        this.moves = [];
    }

    toDiscard(player, card) {
        this.discard[player].push(card);
    }

    resetCumulativeCost(slot) {
        Object.values(PLAYERS).forEach(p => this.cumulativeCosts[p][slot] = 0);
    }

    setCumulativeCost(slot, costPlayerOne, costPlayerTwo) {
        this.cumulativeCosts[PLAYERS.ONE][slot] += costPlayerOne;
        this.cumulativeCosts[PLAYERS.TWO][slot] += costPlayerTwo;
    }
}