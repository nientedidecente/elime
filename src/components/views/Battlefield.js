import React, {Component} from 'react';
import {PlayerStatus, Slots} from "../battlefield";
import {Grid, Message} from "semantic-ui-react";
import {connect} from "react-redux";
import {clearMessage} from "../../store/actions/game";

class BattlefieldView extends Component {
    render() {
        const {battlefield, ui, dismissMessage} = this.props;
        const {player2: cpu, player1: human} = battlefield.status();
        const turn = battlefield.getTurn();
        console.log('turn', turn);
        return (
            <Grid style={{height: '110vh'}}>
                <Grid.Row>
                    <Grid.Column>
                        <PlayerStatus playersTurn={turn === cpu.id} player={cpu}/>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <Slots slots={cpu.slots}/>
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
                        <Slots slots={human.slots} selectable playerId={human.id}/>
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
        }
    };
};
const Battlefield = connect(stateToProps, dispatchToProps)(BattlefieldView);
export {Battlefield};