import React, {Component} from 'react';
import {Slots} from "../battlefield";
import {Grid, Segment} from "semantic-ui-react";

class Battlefield extends Component {
    render() {
        return (
            <Grid style={{height: '110vh'}}>
                <Grid.Row>
                    <Grid.Column>
                        <Segment>Opponent hand</Segment>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <Slots slots={[1, null, 3]}/>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <Slots slots={[1, 2, 3]}/>
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