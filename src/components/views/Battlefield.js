import React, {Component} from 'react';
import {PlayerStatus, Slots} from "../battlefield";
import {Grid} from "semantic-ui-react";
import {connect} from "react-redux";
import {PLAYERS} from "../../libs/models";

const turnMapping = {
    [PLAYERS.TWO]: 'cpu',
    [PLAYERS.ONE]: 'human',
};

class BattlefieldView extends Component {
    render() {
        const {battlefield} = this.props;
        const {player2: cpu, player1: human} = battlefield.status();
        const turn = battlefield.getTurn();
        return (
            <Grid style={{height: '110vh'}}>
                <Grid.Row>
                    <Grid.Column>
                        <PlayerStatus playersTurn={turnMapping[turn] === 'cpu'} player={cpu}/>
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
                        <PlayerStatus playersTurn={turnMapping[turn] === 'human'} player={human}/>
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