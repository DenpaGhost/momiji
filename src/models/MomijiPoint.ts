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

    getDiff(point: MomijiPoint): MomijiPoint {
        return new MomijiPoint(
            this.x - point.x,
            this.y - point.y
        );
    }
};