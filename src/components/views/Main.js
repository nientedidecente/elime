import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Container} from "semantic-ui-react";
import {Battlefield} from "./Battlefield";
import {Result} from "./Result";

class MainView extends Component {
    render() {
        const {finished} = this.props;
        return (
            <Container textAlign="center">
                {!finished && <Battlefield/>}
                {finished && <Result result={finished}/>}
            </Container>
        );
    }
}

const stateToProps = ({game}) => {
    const {finished} = game;
    return {finished};
};
const dispatchToProps = dispatch => {
    return {};
};
const Main = connect(stateToProps, dispatchToProps)(MainView);
export {Main};