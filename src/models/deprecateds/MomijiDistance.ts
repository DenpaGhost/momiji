import MomijiPoint from "~/src/models/deprecateds/MomijiPoint";

export default class MomijiDistance {
    point1: MomijiPoint;
    point2: MomijiPoint;

    constructor(point1: MomijiPoint, point2: MomijiPoint) {
        this.point1 = point1;
        this.point2 = point2;
    }

    get distance(): number {
        return Math.sqrt(
            (this.point1.x - this.point2.x) ** 2 + (this.point1.y - this.point2.y) ** 2
        );
    }

    get centerPoint(): MomijiPoint {
        return new MomijiPoint(
            (this.point1.x + this.point2.x) / 2,
            (this.point1.y + this.point2.y) / 2
        );
    }
};