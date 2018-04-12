import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import thunk from 'redux-thunk';

import {game} from './reducers';


const reducers = combineReducers({
    game
});


const middlewares = [thunk];
export const store = compose(
    applyMiddleware(...middlewares)
)(createStore)(reducers);