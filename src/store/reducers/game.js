import {SELECT_CARD, UPDATE_BATTLEFIELD} from "../actions/game";

const initialState = {
    battlefield: null,
    selectedCard: null
};

export const game = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_BATTLEFIELD: {
            return {
                ...state,
                ...action.data
            }
        }
        case SELECT_CARD: {
            return {
                ...state,
                ...action.data
            }
        }
        default:
            return state;
    }
};