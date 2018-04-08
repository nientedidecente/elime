import React, {Component} from 'react';
import {Slot} from "./Slot";
import {Grid} from "semantic-ui-react";

class Slots extends Component {
    render() {
        const {slots} = this.props;
        return (
            <Grid columns="equal">
                <Grid.Row>
                    {slots.map(c => <Grid.Column><Slot card={c}/></Grid.Column>)}
                </Grid.Row>
            </Grid>
        );
    }
}

export {Slots};