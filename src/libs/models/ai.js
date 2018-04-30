import {randomizer} from 'uvk';
import {SLOTS} from "./battlefield";

class Ai {
    battlefield = null;
    playerId = null;

    constructor(battlefield, playerId) {
        this.battlefield = battlefield;
        this.playerId = playerId
    }

    getSelf() {
        return this.battlefield.players[this.playerId];
    }

    play() {
        const me = this.getSelf();
        const card = randomizer.pickOne(me.hand());
        let slot = randomizer.pickOne(Object.values(SLOTS));
        while (!this.battlefield.isMoveValid(me.id, card, slot)) {
            slot = randomizer.pickOne(Object.values(SLOTS));
        }
        this.battlefield.playCard(me.id, card, slot);
    }
}

export {Ai};