import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {Main} from "./components/views";
import './App.css';

import {store} from './store';
import {initGame} from "./store/actions/game";

class App extends Component {

    componentWillMount() {
        store.dispatch(initGame())
    }

    render() {
        return (
            <Provider store={store}>
                <Main/>
            </Provider>
        );
    }
}

export default App;
