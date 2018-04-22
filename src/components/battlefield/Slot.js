import React, {Component} from 'react';
import {Card} from "../cards/Card";
import {Segment, Card as SCard} from "semantic-ui-react";
import styles from "../cards/styles";

class Slot extends Component {
    render() {
        const {card, onClick} = this.props;
        return (
            <Segment>
                {card && <Card card={card} onClick={() => onClick()}/>}
                {!card && <SCard style={styles.cardWrapper}/>}
            </Segment>
        );
    }
}

export {Slot};