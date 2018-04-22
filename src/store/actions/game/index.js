import {BattleField, Deck, PLAYERS} from "../../../libs/models";
import {cardGenerator} from "../../../libs/generators/cardGenerator";
import {cloneObject} from "../../../libs/utils";

export const UPDATE_BATTLEFIELD = 'update_battlefield';
export const SELECT_CARD = 'select_card';


export const initGame = () => {
    const playersDeck = new Deck(cardGenerator.generate());
    const cpusDeck = new Deck(cardGenerator.generate());
    const player = {name: 'Human', life: 20, deck: playersDeck};
    const cpu = {name: 'Computer', life: 20, deck: cpusDeck};
    const battlefield = new BattleField(player, cpu);
    battlefield.forceTurn(PLAYERS.ONE);

    battlefield.setHand(PLAYERS.ONE);
    battlefield.setHand(PLAYERS.TWO);

    return {
        type: UPDATE_BATTLEFIELD,
        data: {
            battlefield
        }
    }
};

export const selectCard = selectedCard => {
    return {
        type: SELECT_CARD,
        data: {
            selectedCard
        }
    }
};

export const playCard = (battlefield, playerId, card, slot) => {
    console.log(playerId, card, slot);
    const ret = battlefield.playCard(playerId, card, slot);
    console.log(ret);
    return {
        type: UPDATE_BATTLEFIELD,
        data: {
            battlefield: cloneObject(BattleField, battlefield),
            selectedCard: null
        }
    }
};