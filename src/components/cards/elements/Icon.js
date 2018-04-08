import React from 'react';
import './Icon.css';
import {TYPES} from "../../../libs/models";
import water from "../../../assets/img/elements/water.svg";
import fire from "../../../assets/img/elements/fire.svg";
import earth from "../../../assets/img/elements/earth.svg";
import fallback from "../../../assets/img/unknown.svg";

const elementsMapping = {
    [TYPES.WATER]: water,
    [TYPES.FIRE]: fire,
    [TYPES.EARTH]: earth,
    default: fallback
};

const Icon = ({element}) => <img className="elementIcon" src={elementsMapping[element] || elementsMapping.default}/>;
export {Icon};