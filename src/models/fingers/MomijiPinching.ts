import Momiji2D from "~/src/models/Momiji2D";
import MomijiFingerPair from "~/src/models/fingers/MomijiFingerPair";

export default class MomijiPinching {
    initPair: MomijiFingerPair;
    movingPair: MomijiFingerPair;

    distanceWeight: number = 0;

    private constructor(finger1: Momiji2D, finger2: Momiji2D) {
        this.initPair = new MomijiFingerPair(finger1, finger2);
        this.movingPair = new MomijiFingerPair(finger1, finger2);
    }

    /*
     * static methods
     */

    /**
     *
     * @param finger1
     * @param finger2
     */
    static start(finger1: Momiji2D, finger2: Momiji2D): MomijiPinching {
        return new MomijiPinching(finger1, finger2);
    }

    /*
     * Properties
     */

    /**
     * start時点での2本の指の距離から、何倍の距離になっているか
     */
    scale(max: number = 4, min: number = 0): number {
        const scale = this.movingPair.distance / this.initPair.distance;

        if (scale > max) {
            return max;
        } else if (scale < min) {
            return min;
        } else {
            return scale;
        }
    }

    /*
     * instance methods
     */

    /**
     * 指を動かす
     * @param fingerA
     * @param fingerB
     */
    move(fingerA: Momiji2D, fingerB: Momiji2D): MomijiPinching {
        this.movingPair = new MomijiFingerPair(fingerA, fingerB);
        return this;
    }

    /**
     * 重みを更新する
     */
    end(): MomijiPinching {
        this.distanceWeight = this.scale();
        return this;
    }
}