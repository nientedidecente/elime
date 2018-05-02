import {FINISHED, SELECT_CARD, UPDATE_BATTLEFIELD} from "../actions/game";

const initialState = {
    battlefield: null,
    selectedCard: null,
    finished: false
};

export const game = (state = initialState, action) => {
    switch (action.type) {
        case SELECT_CARD:
        case FINISHED:
        case UPDATE_BATTLEFIELD: {
            return {
                ...state,
                ...action.data
            }
        }
        default:
            return state;
    }
};