import React from 'react';
import { Button, Segment } from "semantic-ui-react";
import { Slot } from "./Slot";

const Hand = ({ hand, onSelect, onClose }) => (
    <Segment.Group horizontal>
        {
            hand.map((c, i) => (
                <Slot key={i} card={c} onClick={() => onSelect(c)} />
            ))
        }
        <Button onClick={() => onClose()}>X</Button>
    </Segment.Group>
);


export { Hand };