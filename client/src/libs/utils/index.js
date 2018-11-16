export const arrayShuffle = array => array.map(a => [Math.random(), a]).sort((a, b) => a[0] - b[0]).map(a => a[1]);
export const cloneObject = (className, object) => {
    const clone = Object.assign({}, object);
    Object.setPrototypeOf(clone, className.prototype);
    return clone;
};