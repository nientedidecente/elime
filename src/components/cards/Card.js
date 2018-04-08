import React, {Component} from 'react';
import {Card as SCard} from 'semantic-ui-react';
import {Icon} from "./elements/Icon";
import {TYPES} from "../../libs/models";

const colourMapping = {
    [TYPES.WATER]: 'blue',
    [TYPES.FIRE]: 'red',
    [TYPES.EARTH]: 'green',
};

class Card extends Component {
    render() {
        const {card, covered} = this.props;
        if (covered) {
            return (
                <SCard style={{margin: 'auto'}}>
                    <Icon element={TYPES.FIRE}/><Icon element={TYPES.WATER}/><Icon element={TYPES.EARTH}/>
                </SCard>
            );
        }
        return (
            <SCard color={colourMapping[card.type] || null} style={{margin: 'auto'}}>
                <Icon element={card.type}/>
                <SCard.Content>
                    <SCard.Header>
                        {card.cost}
                    </SCard.Header>
                    <SCard.Description>
                        {card.name}
                    </SCard.Description>
                </SCard.Content>
            </SCard>
        );
    }
}

export {Card};