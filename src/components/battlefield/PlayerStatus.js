import React, {Component} from 'react';
import {Button, Header, Segment} from "semantic-ui-react";
import {connect} from "react-redux";
import {Slot} from "./Slot";

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

    render() {
        const {player, playersTurn, local, battlefield} = this.props;
        const {handShown} = this.state;
        if (handShown) {
            return (
                <Segment.Group horizontal>
                    {battlefield.getPlayerHand(player.id).map(c => <Slot card={c}/>)}
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
                            {local && (
                                <Header>
                                    {player.hand}
                                    <Header.Subheader>
                                        <Button onClick={() => this.showHand()}>
                                            Hand
                                        </Button>
                                    </Header.Subheader>
                                </Header>)
                            }
                            {!local && (<Header>
                                {player.hand}
                                <Header.Subheader>
                                    Hand
                                </Header.Subheader>
                            </Header>)}

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
    const {battlefield} = game;
    return {battlefield};
};
const dispatchToProps = dispatch => {
    return {};
};
const PlayerStatus = connect(stateToProps, dispatchToProps)(PlayerStatusView);

export {PlayerStatus};