import React, {Component} from 'react';
import {Slots} from "../battlefield";
import {Grid, Segment} from "semantic-ui-react";
import {connect} from "react-redux";

class BattlefieldView extends Component {
    render() {
        const {battlefield} = this.props;
        const gameStatus = battlefield.status();
        const {player2: cpu, player1: human} = gameStatus;
        return (
            <Grid style={{height: '110vh'}}>
                <Grid.Row>
                    <Grid.Column>
                        <Segment>{cpu.name} - {cpu.life}</Segment>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <Slots slots={Object.values(cpu.slots)}/>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <Slots slots={Object.values(human.slots)}/>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <Segment>{human.name} - {human.life}</Segment>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
}

const stateToProps = ({game}) => {
    const {battlefield} = game;
    return {battlefield};
};
const dispatchToProps = dispatch => {
    return {};
};
const Battlefield = connect(stateToProps, dispatchToProps)(BattlefieldView);
export {Battlefield};