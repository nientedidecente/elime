import React, {Component} from 'react';
import {Statistic, Icon, Button} from "semantic-ui-react";
import Header from "semantic-ui-react/dist/es/elements/Header/Header";
import {PLAYERS} from "../../libs/models";

class Result extends Component {
    render() {
        const {result} = this.props;
        console.log(result);
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                paddingTop: '80px'
            }}>
                <Header as="h1" textAlign="center" icon>
                    <Icon name="trophy"/>
                    <Header.Content>
                        {PLAYERS.ONE === result.winner ? 'YOU WIN!' : 'YOU LOSE!'}
                    </Header.Content>
                </Header>
                <Statistic.Group style={{marginTop: '40px'}}>
                    <Statistic>
                        <Statistic.Value>
                            {result[PLAYERS.ONE].life}
                        </Statistic.Value>
                        <Statistic.Label>
                            Human life points
                        </Statistic.Label>
                    </Statistic>

                    <Statistic>
                        <Statistic.Value>
                            {result[PLAYERS.TWO].life}
                        </Statistic.Value>
                        <Statistic.Label>
                            CPU life points
                        </Statistic.Label>
                    </Statistic>
                </Statistic.Group>
                <div style={{marginTop: '40px'}}>
                    <Button
                        fluid
                        primary
                        onClick={() => window.location = window.location}
                    >
                        <Icon name="refresh"/>
                        Restart Game
                    </Button>
                </div>
            </div>
        );
    }
}

export {Result};