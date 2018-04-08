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
        const {card} = this.props;
        console.log(card);
        return (
            <SCard color={colourMapping[card.type] || null}>
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