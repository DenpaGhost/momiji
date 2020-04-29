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
            this.y = y ?? 0;
        }
    }

    /**
     * 2点間の中点を求め、新たなインスタンスを作る
     * @param point
     */
    getDiff(point: MomijiPoint): MomijiPoint {
        return new MomijiPoint(
            this.x - point.x,
            this.y - point.y
        );
    }

    /**
     * 与えられた座標値を加算する
     * @param point
     */
    add(point: MomijiPoint): MomijiPoint {
        this.x += point.x;
        this.y += point.y;

        return this;
    }

    static total(point1: MomijiPoint, point2: MomijiPoint) {

    }
};