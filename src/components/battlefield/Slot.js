import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Card} from "../cards/Card";
import {Segment, Card as SCard} from "semantic-ui-react";
import styles from "../cards/styles";
import {playCard} from "../../store/actions/game";

class SlotView extends Component {
    selectSlot() {
        const {playerId, id: slotId, selectedCard, selectable, battlefield} = this.props;
        if (selectedCard && selectable) {
            this.props.playCard(battlefield, playerId, selectedCard, slotId)
        }
    }

    render() {
        const {card, onClick, selectable} = this.props;
        return (
            <Segment>
                {card && <Card card={card} onClick={onClick ? () => onClick() : null}/>}
                {!card &&
                <SCard
                    style={styles.cardWrapper}
                    onClick={selectable ? () => this.selectSlot() : null}
                    raised={selectable}
                />
                }
            </Segment>
        );
    }
}


const stateToProps = ({game}) => {
    const {selectedCard, battlefield} = game;
    return {selectedCard, battlefield};
};
const dispatchToProps = dispatch => {
    return {
        playCard(battlefield, playerId, card, slotId) {
            dispatch(playCard(battlefield, playerId, card, slotId));
        }
    };
};

const Slot = connect(stateToProps, dispatchToProps)(SlotView);
export {Slot};