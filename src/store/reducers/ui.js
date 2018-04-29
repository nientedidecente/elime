import {ERROR_MESSAGE, CLEAR_MESSAGE} from "../actions/game";

const initialState = {
    message: null,
    error: false
};

export const ui = (state = initialState, action) => {
    switch (action.type) {
        case CLEAR_MESSAGE:
        case ERROR_MESSAGE: {
            return {
                ...state,
                ...action.data
            }
        }
        default: {
            return state;
        }
    }
};