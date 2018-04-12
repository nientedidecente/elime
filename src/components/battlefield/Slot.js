import React, {Component} from 'react';
import {Card} from "../cards/Card";
import {Segment, Card as SCard} from "semantic-ui-react";
import styles from "../cards/styles";

class Slot extends Component {
    render() {
        const {card} = this.props;
        return (
            <Segment>
                {card && <Card card={card}/>}
                {!card && <SCard style={styles.cardWrapper}/>}
            </Segment>
        );
    }
}

export {Slot};