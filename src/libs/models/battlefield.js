import {randomizer} from 'uvk';
import {RESOLVE_MATRIX} from "./types";
import {Player} from "./player";

export const SLOTS = {
    LEFT: 'left',
    CENTER: 'center',
    RIGHT: 'right',
};

export const PLAYERS = {
    ONE: 'player1',
    TWO: 'player2',
};


class BattleField {
    turn = null;
    oldMoved = [];
    moves = [];
    players = {
        [PLAYERS.ONE]: null,
        [PLAYERS.TWO]: null
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
        this.players[PLAYERS.ONE] = new Player(PLAYERS.ONE, {...playerOne});
        this.players[PLAYERS.TWO] = new Player(PLAYERS.TWO, {...playerTwo});
    }

    getPlayerHand(player) {
        return this.players[player].hand;
    }

    setHands() {
        Object.keys(this.players).forEach(p => this.setHand(p));
    }

    setHand(player) {
        this.players[player].setHand();
    }

    forceTurn(player) {
        this.turn = player;
    }

    toggleTurn() {
        this.endTurn(this.turn)
    }

    endTurn(player) {
        this.turn = player === PLAYERS.ONE ? PLAYERS.TWO : PLAYERS.ONE;
    }

    getTurn() {
        if (this.turn) {
            return this.turn;
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
                if (!this.players[p].slots[s]) {
                    emptySlots += 1;
                }
            })
        });
        return emptySlots === 0;
    }

    status() {
        return {
            [PLAYERS.ONE]: {
                ...this.players[PLAYERS.ONE].status()
            },
            [PLAYERS.TWO]: {
                ...this.players[PLAYERS.TWO].status()
            }
        }
    }

    getLastMove() {
        if (!this.moves.length && !this.oldMoved.length) return null;
        return this.moves[this.moves.length - 1] || this.oldMoved[this.oldMoved.length - 1];
    }

    isMoveValid(player, card, slot) {
        return !(
            (this.moves.length === 1 && this.moves[0].slot === slot)
            || (this.getTurn() !== player)
            || (this.players[player].slots[slot])
        );
    }

    playCard(player, card, slot) {
        if (!this.isMoveValid(player, card, slot)) {
            return false;
        }

        this.players[player].play(card, slot);
        this.moves.push({player, slot});
        this.endTurn(player);
        return true;
    }

    resolve() {
        Object.values(SLOTS).forEach(s => {
            const playerOneCard = this.players[PLAYERS.ONE].slots[s];
            const playerTwoCard = this.players[PLAYERS.TWO].slots[s];
            const result = RESOLVE_MATRIX[playerOneCard.type][playerTwoCard.type];
            if (result === 0) {
                this.setCumulativeCost(s, playerOneCard.cost, playerTwoCard.cost);
            } else {
                const loser = (result === 1) ? PLAYERS.TWO : PLAYERS.ONE;
                const winner = (result === 1) ? PLAYERS.ONE : PLAYERS.TWO;
                const loserCard = loser === PLAYERS.ONE ? playerOneCard : playerTwoCard;
                const winnerCard = winner === PLAYERS.ONE ? playerOneCard : playerTwoCard;
                this.players[loser].life -= (loserCard.cost + this.cumulativeCosts[loser][s]);

                this.players[loser].toDiscard(loserCard); // losing card goes to discard pile
                this.players[winner].toHand(winnerCard); // winning card goes back to hand
                this.resetCumulativeCost(s);
            }
        });

        this.reset();
        return this.isOver();
    }

    isOver() {
        return (this.players[PLAYERS.ONE].life <= 0 || this.players[PLAYERS.TWO].life <= 0);
    }

    result() {
        const winner = this.players[PLAYERS.ONE].life > this.players[PLAYERS.TWO].life
            ? PLAYERS.ONE : PLAYERS.TWO;
        const loser = winner === PLAYERS.ONE ? PLAYERS.TWO : PLAYERS.ONE;
        return {
            winner,
            loser,
            [PLAYERS.ONE]: this.players[PLAYERS.ONE].status(),
            [PLAYERS.TWO]: this.players[PLAYERS.TWO].status()
        }
    }

    reset() {
        Object.values(SLOTS).forEach(s => {
            this.players[PLAYERS.ONE].slots[s] = null;
            this.players[PLAYERS.TWO].slots[s] = null;
        });
        this.oldMoved = [...this.moves];
        this.moves = [];
    }

    resetCumulativeCost(slot) {
        Object.values(PLAYERS).forEach(p => this.cumulativeCosts[p][slot] = 0);
    }

    setCumulativeCost(slot, costPlayerOne, costPlayerTwo) {
        this.cumulativeCosts[PLAYERS.ONE][slot] += costPlayerOne;
        this.cumulativeCosts[PLAYERS.TWO][slot] += costPlayerTwo;
    }

    toJs() {
        return {
            players: {
                [PLAYERS.ONE]: this.players[PLAYERS.ONE].toJs(),
                [PLAYERS.TWO]: this.players[PLAYERS.TWO].toJs()
            },
            cumulativeCosts: this.cumulativeCosts,
            turn: this.turn,
            oldMoved: this.oldMoved,
            moves: this.moves
        };
    }

    static fromJs(jsObject) {
        const battlefield = new BattleField();
        battlefield.players[PLAYERS.ONE] = Player.fromJs(jsObject.players[PLAYERS.ONE]);
        battlefield.players[PLAYERS.TWO] = Player.fromJs(jsObject.players[PLAYERS.TWO]);
        battlefield.cumulativeCosts = jsObject.cumulativeCosts;
        battlefield.turn = jsObject.turn;
        battlefield.oldMoved = jsObject.oldMoved;
        battlefield.moves = jsObject.moves;
        return battlefield;
    }
}

export {BattleField}