export const TYPES = {
    EARTH: 'earth',
    FIRE: 'fire',
    WATER: 'water'
};

export const RESOLVE_MATRIX = {
    [TYPES.EARTH]: {
        [TYPES.EARTH]: 0,
        [TYPES.FIRE]: -1,
        [TYPES.WATER]: 1
    },
    [TYPES.FIRE]: {
        [TYPES.EARTH]: 1,
        [TYPES.FIRE]: 0,
        [TYPES.WATER]: -1
    },
    [TYPES.WATER]: {
        [TYPES.EARTH]: -1,
        [TYPES.FIRE]: 1,
        [TYPES.WATER]: 0
    }
};