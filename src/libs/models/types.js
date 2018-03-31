export const TYPES = {
    ROCK: 'rock',
    PAPER: 'paper',
    SCISSOR: 'scissor'
};

export const RESOLVE_MATRIX = {
    [TYPES.ROCK]: {
        [TYPES.ROCK]: 0,
        [TYPES.PAPER]: -1,
        [TYPES.SCISSOR]: 1
    },
    [TYPES.PAPER]: {
        [TYPES.ROCK]: 1,
        [TYPES.PAPER]: 0,
        [TYPES.SCISSOR]: -1
    },
    [TYPES.SCISSOR]: {
        [TYPES.ROCK]: -1,
        [TYPES.PAPER]: 1,
        [TYPES.SCISSOR]: 0
    }
};