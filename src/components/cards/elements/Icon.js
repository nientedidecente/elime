import React from 'react';
import './Icon.css';
import { TYPES } from "libs/models";

const elementsMapping = {
    [TYPES.WATER]: 'assets/img/elements/water.svg',
    [TYPES.FIRE]: 'assets/img/elements/fire.svg',
    [TYPES.EARTH]: 'assets/img/elements/earth.svg',
    default: 'assets/img/unknown.svg'
};

const Icon = ({ element }) => <img className="elementIcon" src={elementsMapping[element] || elementsMapping.default} alt={element} />;
export { Icon };