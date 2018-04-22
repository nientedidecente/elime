import React, {Component} from 'react';
import {Header, Segment} from "semantic-ui-react";

class PlayerStatus extends Component {
    render() {
        const {player} = this.props;
        return (
            <Segment.Group horizontal>
                <Segment>
                    <h3>{player.name}</h3>
                </Segment>
                <Segment>
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
                            <Header>
                                {player.hand}
                                <Header.Subheader>
                                    Hand
                                </Header.Subheader>
                            </Header>
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

export {PlayerStatus};