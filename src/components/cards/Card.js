import React, {Component} from 'react';

class Card extends Component {
    render() {
        const {card} = this.props;
        return (
            <div>
                {card}
            </div>
        );
    }
}

export {Card};