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

export class BattleField {
    lastMove = null;
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

    constructor(playerOne = {}, playerTwo = {}) {
        this.players[PLAYERS.ONE] = playerOne.name || PLAYERS.ONE;
        this.players[PLAYERS.TWO] = playerTwo.name || PLAYERS.TWO;

        this.lifeCounters[PLAYERS.ONE] = playerOne.life || FALLBACK_LIFE;
        this.lifeCounters[PLAYERS.TWO] = playerTwo.life || FALLBACK_LIFE;
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

    playCard(player, card, slot) {
        console.log(`${player} plays ${card.type} ${card.cost} in ${slot}`);
        this.slots[player][slot] = card;
        this.lastMove = player;
    }

    resolve() {
        Object.values(SLOTS).forEach(s => {
            const playerOneCard = this.slots[PLAYERS.ONE][s];
            const playerTwoCard = this.slots[PLAYERS.TWO][s];
            const result = RESOLVE_MATRIX[playerOneCard.type][playerTwoCard.type];
            switch (result) {
                case 1:
                    this.lifeCounters[PLAYERS.TWO] -= playerTwoCard.cost;
                    break;
                case -1:
                    this.lifeCounters[PLAYERS.ONE] -= playerOneCard.cost;
                    break;
                case 0:
                default:
                    break;
            }
            if (this.isOver()) {
                return this.result();
            }
        });

        this.reset();
        return false;
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
            })
        })
    }

    toDiscard(player, card) {
        this.discard[player].push(card);
    }
}