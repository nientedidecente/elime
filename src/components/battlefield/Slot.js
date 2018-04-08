import React, {Component} from 'react';
import {Card} from "../cards/Card";
import {Segment} from "semantic-ui-react";

class Slot extends Component {
    render() {
        const {card} = this.props;
        return (
            <Segment>
                {card && <Card card={card}/>}
                {!card && <h1>Empty</h1>}
            </Segment>
        );
    }
}

export {Slot};