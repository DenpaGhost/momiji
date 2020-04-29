import Momiji2D from "~/src/models/Momiji2D";
import MomijiFingerPair from "~/src/models/fingers/MomijiFingerPair";

export default class MomijiPinching {
    initPair: MomijiFingerPair;
    movingPair: MomijiFingerPair;

    scaleWeight: number = 1;
    translateWeight: Momiji2D = new Momiji2D();

    private constructor(finger1: Momiji2D, finger2: Momiji2D) {
        this.initPair = new MomijiFingerPair(finger1, finger2);
        this.movingPair = new MomijiFingerPair(finger1, finger2);
    }

    /*
     * static methods
     */

    static start(touch1: Touch, touch2: Touch): MomijiPinching
    static start(finger1: Momiji2D, finger2: Momiji2D): MomijiPinching
    static start(value1: Touch | Momiji2D, value2: Touch | Momiji2D): MomijiPinching {
        const finger1 = this.mightConvert(value1);
        const finger2 = this.mightConvert(value2);
        return new MomijiPinching(finger1, finger2);
    }

    private static mightConvert(value: Momiji2D | Touch): Momiji2D {
        return value instanceof Touch ? Momiji2D.to2D(value) : value;
    }

    /*
     * Properties
     */

    /**
     * start時点での2本の指の距離から、何倍の距離になっているか
     */
    scale(min?: number, max?: number): number {
        const scale = (this.movingPair.distance / this.initPair.distance) * this.scaleWeight;

        if (!!max && scale > max) {
            return max;
        } else if (!!min && scale < min) {
            return min;
        } else {
            return scale;
        }
    }

    translate2D(limit?: Momiji2D): Momiji2D {
        const diff = Momiji2D.diff(this.movingPair.centerPoint, this.initPair.centerPoint);
        diff.add(this.translateWeight);
        if (!limit) return diff;

        if (diff.x > limit.x) {
            diff.x = limit.x;
        } else if (diff.x < -limit.x) {
            diff.x = -limit.x;
        }

        if (diff.y > limit.y) {
            diff.y = limit.y;
        } else if (diff.y < -limit.y) {
            diff.y = -limit.y;
        }

        return diff;
    }

    /*
     * instance methods
     */

    start(touch1: Touch, touch2: Touch): MomijiPinching
    start(finger1: Momiji2D, finger2: Momiji2D): MomijiPinching
    start(value1: Touch | Momiji2D, value2: Touch | Momiji2D): MomijiPinching {
        const finger1 = MomijiPinching.mightConvert(value1);
        const finger2 = MomijiPinching.mightConvert(value2);

        this.initPair = new MomijiFingerPair(finger1, finger2);
        this.movingPair = new MomijiFingerPair(finger1, finger2);

        return this;
    }

    move(touchA: Touch, touchB: Touch): MomijiPinching
    move(fingerA: Momiji2D, fingerB: Momiji2D): MomijiPinching
    move(value1: Touch | Momiji2D, value2: Touch | Momiji2D) {
        const fingerA = MomijiPinching.mightConvert(value1);
        const fingerB = MomijiPinching.mightConvert(value2);
        this.movingPair = new MomijiFingerPair(fingerA, fingerB);
        return this;
    }

    /**
     * 重みを更新する
     */
    end(): MomijiPinching {
        this.scaleWeight = this.scale();
        this.translateWeight = this.translate2D();
        return this;
    }
}