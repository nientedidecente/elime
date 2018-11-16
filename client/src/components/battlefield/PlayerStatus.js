import React, {Component} from 'react';
import {Button, Header, Segment} from "semantic-ui-react";
import {connect} from "react-redux";
import {deselectCard, selectCard} from "../../store/actions/game";
import {Card} from "../cards/Card";
import {Hand} from "./Hand";

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
        const {player, playersTurn, local, battlefield, selectedCard, deselectCard} = this.props;
        const {handShown} = this.state;
        const canPlay = selectedCard === null && local;

        return (
            <div>
                {handShown && (
                    <Hand
                        hand={battlefield.getPlayerHand(player.id)}
                        onSelect={c => this.selectCard(c)}
                        onClose={() => this.closeHand()}
                    />
                )}
                {(local && selectedCard) && (
                    <Segment.Group horizontal>
                        <Segment>
                            <Card card={selectedCard}/>
                        </Segment>
                        <Button onClick={() => deselectCard()}>X</Button>
                    </Segment.Group>
                )}
                {(!local || (!handShown && !selectedCard)) && (
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
                )}
            </div>
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
            dispatch(selectCard(card));
        },
        deselectCard() {
            dispatch(deselectCard());
        }
    };
};
const PlayerStatus = connect(stateToProps, dispatchToProps)(PlayerStatusView);

export {PlayerStatus};