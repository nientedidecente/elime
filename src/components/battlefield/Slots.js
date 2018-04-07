import React, {Component} from 'react';
import {Slot} from "./Slot";

class Slots extends Component {
    render() {
        const {slots} = this.props;
        return (
            <div>
                {slots.map(c => <Slot card={c}/>)}
            </div>
        );
    }
}

export {Slots};