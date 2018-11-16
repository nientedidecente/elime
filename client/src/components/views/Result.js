import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Statistic, Icon, Button} from "semantic-ui-react";
import Header from "semantic-ui-react/dist/es/elements/Header/Header";
import {PLAYERS} from "../../libs/models";
import {initGame} from "../../store/actions/game";

class ResultView extends Component {
    render() {
        const {result, initGame} = this.props;
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
                        onClick={() => initGame()}
                    >
                        <Icon name="refresh"/>
                        Play Again
                    </Button>
                </div>
            </div>
        );
    }
}


const stateToProps = () => {
    return {};
};
const dispatchToProps = dispatch => {
    return {
        initGame() {
            dispatch(initGame({randomStarter: true}));
        }
    };
};
const Result = connect(stateToProps, dispatchToProps)(ResultView);

export {Result};