import Momiji2D from "~/src/models/Momiji2D";

export default class MomijiSwitching {
    initPoint: Momiji2D;
    movingPoint: Momiji2D;

    isSnappingVertical: boolean = false;
    isSnappingHorizontal: boolean = false;

    protected constructor(initPoint: Momiji2D) {
        this.initPoint = initPoint;
        this.movingPoint = initPoint;
    }


    /*
     * static methods
     */

    /**
     * スワイプ操作を始める
     * @param finger
     */
    static start(finger: Momiji2D | Touch): MomijiSwitching {
        const value = finger instanceof Touch ? Momiji2D.to(finger) : finger;
        return new MomijiSwitching(value);
    }


    /*
     * Properties
     */

    translate2D(): Momiji2D {
        return this.isSnapping ? this.diff : new Momiji2D();
    }

    get diff(): Momiji2D {
        return Momiji2D.diff(this.movingPoint, this.initPoint);
    }

    get isSnapping(): boolean {
        return this.isSnappingVertical || this.isSnappingHorizontal;
    }


    /*
     * instance methods
     */

    /**
     * スワイプ操作を始める
     * @param finger
     */
    start(finger: Momiji2D | Touch): MomijiSwitching {
        const value = finger instanceof Touch ? Momiji2D.to(finger) : finger;
        this.initPoint = value;
        this.movingPoint = value;
        return this;
    }

    /**
     * 指を動かす
     * @param finger 指の触れている座標
     * @param snappingDistance　スナップし始める距離
     */
    move(finger: Momiji2D | Touch, snappingDistance?: number): MomijiSwitching {
        this.movingPoint = finger instanceof Touch ? Momiji2D.to(finger) : finger;

        if (snappingDistance != undefined) {
            if (Math.abs(this.diff.x) > snappingDistance) {
                this.isSnappingHorizontal = true;
            } else if (Math.abs(this.diff.y) > snappingDistance) {
                this.isSnappingVertical = true;
            }
        } else {
            if (this.diff.x > this.diff.y) {
                this.isSnappingHorizontal = true;
            } else {
                this.isSnappingVertical = true;
            }
        }

        return this;
    }
}