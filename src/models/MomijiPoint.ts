export default class MomijiPoint {
    x: number;
    y: number;

    constructor(touch: Touch)
    constructor(x: number, y: number)
    constructor(value: Touch | number, y?: number) {
        if (value instanceof Touch) {
            this.x = value.pageX;
            this.y = value.pageY;
        } else {
            this.x = value;
            this.y = y || 0;
        }
    }
};