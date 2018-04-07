import React, {Component} from 'react';
import {Slots} from "../battlefield";

class Battlefield extends Component {
    render() {
        return (
            <div>
                <Slots slots={[1, null, 3]}/>
                <Slots slots={[1, 2, 3]}/>
            </div>
        );
    }
}

export {Battlefield};