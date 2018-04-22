import React, {Component} from 'react';
import {Button, Header, Segment} from "semantic-ui-react";
import {connect} from "react-redux";
import {Slot} from "./Slot";
import {selectCard} from "../../store/actions/game";

class PlayerStatusView extends Component {
    state = {
        handShown: false
    };

    showHand() {
        this.setState({handShown: true})
    }

    closeHand() {
        this.setState({handShown: false})
    }

    selectCard(card) {
        this.closeHand();
        this.props.selectCard(card);
    }

    render() {
        const {player, playersTurn, local, battlefield, selectedCard} = this.props;
        const {handShown} = this.state;
        const canPlay = selectedCard === null && local;

        if (handShown) {
            return (
                <Segment.Group horizontal>
                    {
                        battlefield.getPlayerHand(player.id).map((c, i) => (
                            <Slot key={i} card={c} onClick={() => this.selectCard(c)}/>
                        ))
                    }
                    <Button onClick={() => this.closeHand()}>X</Button>
                </Segment.Group>
            );
        }
        return (
            <Segment.Group horizontal>
                <Segment
                    className="centeredContent"
                    color={playersTurn ? "teal" : null}
                    inverted={playersTurn}
                >
                    <h3>{player.name}</h3>
                </Segment>
                <Segment className="centeredContent">
                    <Header as="h1">
                        {player.life}
                        <Header.Subheader>
                            Health points
                        </Header.Subheader>
                    </Header>
                </Segment>
                <Segment>
                    <Segment.Group>
                        <Segment>
                            {canPlay && (
                                <Header>
                                    {player.hand}
                                    <Header.Subheader>
                                        <Button onClick={() => this.showHand()} disabled={!playersTurn}>
                                            Hand
                                        </Button>
                                    </Header.Subheader>
                                </Header>)
                            }
                            {!canPlay && (
                                <Header>
                                    {player.hand}
                                    <Header.Subheader>
                                        Hand
                                    </Header.Subheader>
                                </Header>
                            )}

                        </Segment>
                        <Segment>
                            <Header>
                                {player.deck}
                                <Header.Subheader>
                                    Deck
                                </Header.Subheader>
                            </Header>
                        </Segment>
                    </Segment.Group>
                </Segment>
            </Segment.Group>
        );
    }
}

const stateToProps = ({game}) => {
    const {battlefield, selectedCard} = game;
    return {battlefield, selectedCard};
};
const dispatchToProps = dispatch => {
    return {
        selectCard(card) {
            dispatch(selectCard(card))
        }
    };
};
const PlayerStatus = connect(stateToProps, dispatchToProps)(PlayerStatusView);

export {PlayerStatus};