import React, {Component} from 'react';
import {Card} from "../cards/Card";

class Slot extends Component {
    render() {
        const {card} = this.props;
        return (
            <div>
                {card && <Card card={card}/>}
                {!card && <h1>Empty</h1>}
            </div>
        );
    }
}

export {Slot};