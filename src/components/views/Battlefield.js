import React, {Component} from 'react';
import {PlayerStatus, Slots} from "../battlefield";
import {Grid} from "semantic-ui-react";
import {connect} from "react-redux";

class BattlefieldView extends Component {
    render() {
        const {battlefield} = this.props;
        const {player2: cpu, player1: human} = battlefield.status();
        return (
            <Grid style={{height: '110vh'}}>
                <Grid.Row>
                    <Grid.Column>
                        <PlayerStatus player={cpu}/>
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
                        <PlayerStatus player={human}/>
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