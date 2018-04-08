import React, {Component} from 'react';
import {Battlefield} from "./components/views";

import './App.css';
import {Container} from "semantic-ui-react";

class App extends Component {
    render() {
        return (
            <Container textAlign="center">
                <Battlefield/>
            </Container>
        );
    }
}

export default App;
