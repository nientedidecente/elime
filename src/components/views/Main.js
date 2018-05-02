import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Container} from "semantic-ui-react";
import {Battlefield} from "./Battlefield";

class MainView extends Component {
    render() {
        return (
            <Container textAlign="center">
                {!this.props.finished && <Battlefield/>}
                {this.props.finished && <pre>{JSON.stringify(this.props.finished)}</pre>}
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