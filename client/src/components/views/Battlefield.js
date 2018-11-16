import React, {Component} from 'react';
import {PlayerStatus, Slots} from "../battlefield";
import {Grid, Message} from "semantic-ui-react";
import {connect} from "react-redux";
import {clearMessage, playAiTurn} from "../../store/actions/game";

class BattlefieldView extends Component {
    render() {
        const {battlefield, ui, dismissMessage, playAiTurn} = this.props;
        const {player2: cpu, player1: human} = battlefield.status();
        const isFull = battlefield.isFull();
        const turn = !isFull ? battlefield.getTurn() : null;

        console.log('turn', turn);
        console.log('isFull?', isFull);

        if (turn === cpu.id) {
            playAiTurn(battlefield, cpu.id);
        }
        return (
            <Grid style={{height: '110vh'}}>
                <Grid.Row>
                    <Grid.Column>
                        <PlayerStatus playersTurn={turn === cpu.id} player={cpu}/>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <Slots slots={cpu.slots} cumulative={battlefield.cumulativeCosts[cpu.id]}/>
                    </Grid.Column>
                </Grid.Row>
                {ui.message && (
                    <Grid.Row>
                        <Grid.Column>
                            <Message error={ui.error} onDismiss={() => dismissMessage()}>{ui.message}</Message>
                        </Grid.Column>
                    </Grid.Row>
                )}
                <Grid.Row>
                    <Grid.Column>
                        <Slots slots={human.slots} selectable playerId={human.id}
                               cumulative={battlefield.cumulativeCosts[human.id]}/>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <PlayerStatus playersTurn={turn === human.id} player={human} local/>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
}

const stateToProps = ({game, ui}) => {
    const {battlefield} = game;
    return {battlefield, ui};
};
const dispatchToProps = dispatch => {
    return {
        dismissMessage() {
            dispatch(clearMessage());
        },
        playAiTurn(battlefield, id) {
            dispatch(playAiTurn(battlefield, id));
        }
    };
};
const Battlefield = connect(stateToProps, dispatchToProps)(BattlefieldView);
export {Battlefield};