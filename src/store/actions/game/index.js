import {Ai, BattleField, Deck, PLAYERS} from "../../../libs/models";
import {cardGenerator} from "../../../libs/generators/cardGenerator";
import {cloneObject} from "../../../libs/utils";

export const UPDATE_BATTLEFIELD = 'update_battlefield';
export const SELECT_CARD = 'select_card';

export const FINISHED = 'finished';

export const CLEAR_MESSAGE = 'clear_message';
export const ERROR_MESSAGE = 'error_message';


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

export const playAiTurn = (battlefield, id) => {
    return dispatch => {
        const ai = new Ai(battlefield, id);
        const move = ai.play();
        setTimeout(() => dispatch(playCard(battlefield, move.player, move.card, move.slot)), 1000);
    };
};

export const playCard = (battlefield, playerId, card, slot) => {
    return dispatch => {
        const isMoveValid = battlefield.playCard(playerId, card, slot);
        console.log(playerId, card, slot);
        if (isMoveValid) {
            dispatch(updateBattleField(battlefield));
            if (battlefield.isFull()) {
                setTimeout(() => dispatch(resolve(battlefield)), 1000);
            }
        } else {
            dispatch(error('Cannot play that card in this slot'))
        }
    }
};

export const resolve = battlefield => {
    return dispatch => {
        battlefield.resolve();
        battlefield.setHands();
        battlefield.toggleTurn();
        if (battlefield.isOver()) {
            dispatch(finished(battlefield.result()))
        }
        dispatch(updateBattleField(battlefield))
    }
};


export const updateBattleField = battlefield => {
    return {
        type: UPDATE_BATTLEFIELD,
        data: {
            battlefield: cloneObject(BattleField, battlefield),
            selectedCard: null
        }
    }
};


export const error = message => {
    return {
        type: ERROR_MESSAGE,
        data: {
            message: message,
            error: true
        }
    }
};

export const finished = result => {
    return {
        type: FINISHED,
        data: {
            finished: result
        }
    }
};

export const clearMessage = () => {
    return {
        type: CLEAR_MESSAGE,
        data: {
            message: null,
            error: false
        }
    }
};