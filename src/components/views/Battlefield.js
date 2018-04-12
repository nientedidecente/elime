import React, {Component} from 'react';
import {randomizer} from 'uvk';
import {Slots} from "../battlefield";
import {Grid, Segment} from "semantic-ui-react";
import {cardGenerator} from "../../libs/generators/cardGenerator";

class Battlefield extends Component {
    render() {
        const cardsOne = cardGenerator.generate(randomizer.int(0, 3));
        const cardsTwo = cardGenerator.generate(randomizer.int(0, 3));
        [cardsOne, cardsTwo].forEach(c => {
            while (c.length !== 3) {
                c.push(null);
            }
        });
        return (
            <Grid style={{height: '110vh'}}>
                <Grid.Row>
                    <Grid.Column>
                        <Segment>Opponent hand</Segment>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <Slots slots={cardsOne}/>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <Slots slots={cardsTwo}/>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <Segment>Players hand</Segment>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
}

export {Battlefield};