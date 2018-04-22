import React, {Component} from 'react';
import {Container} from "semantic-ui-react";
import {Provider} from 'react-redux';
import {Battlefield} from "./components/views";
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
                <Container textAlign="center">
                    <Battlefield/>
                </Container>
            </Provider>
        );
    }
}

export default App;
