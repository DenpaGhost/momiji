import Momiji2D from "~/src/models/Momiji2D";

export default class MomijiSwiping {
    initPoint: Momiji2D;
    movingPoint: Momiji2D;

    weight: Momiji2D;

    private constructor(initPoint: Momiji2D) {
        this.initPoint = initPoint;
        this.movingPoint = initPoint;

        this.weight = this.translate2D;
    }

    /*
     * static methods
     */

    /**
     * スワイプを始める
     * @param finger
     */
    static start(finger: Momiji2D): MomijiSwiping {
        return new MomijiSwiping(finger);
    }

    /*
     * Properties
     */

    get translate2D(): Momiji2D {
        return Momiji2D.diff(this.initPoint, this.movingPoint);
    }

    /*
     * instance methods
     */

    /**
     * 指を動かす
     * @param finger
     */
    move(finger: Momiji2D): MomijiSwiping {
        this.movingPoint = finger;
        return this;
    }

    /**
     * 重みを更新
     */
    end(): MomijiSwiping {
        this.weight = this.translate2D;
        return this;
    }
}