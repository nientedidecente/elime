import React, {Component} from 'react';
import {Slot} from "./Slot";
import {Grid} from "semantic-ui-react";

class Slots extends Component {
    render() {
        const {slots, selectable, playerId} = this.props;
        return (
            <Grid columns="equal">
                <Grid.Row>
                    {Object.keys(slots).map(k => (
                        <Grid.Column key={k}>
                            <Slot
                                card={slots[k]}
                                id={k}
                                playerId={playerId}
                                selectable={selectable && slots[k] === null}
                            />
                        </Grid.Column>
                    ))}
                </Grid.Row>
            </Grid>
        );
    }
}

export {Slots};