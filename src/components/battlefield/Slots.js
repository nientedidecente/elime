import React, {Component} from 'react';
import {Slot} from "./Slot";
import {Grid} from "semantic-ui-react";

class Slots extends Component {
    render() {
        const {slots} = this.props;
        return (
            <Grid columns="equal" padded>
                <Grid.Row>
                    {slots.map((c, i) => <Grid.Column key={i}><Slot card={c}/></Grid.Column>)}
                </Grid.Row>
            </Grid>
        );
    }
}

export {Slots};