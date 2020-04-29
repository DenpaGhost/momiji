import Momiji2D from "~/src/models/Momiji2D";

export default class MomijiSwiping {
    initPoint: Momiji2D;
    movingPoint: Momiji2D;

    weight: Momiji2D = new Momiji2D();

    private constructor(initPoint: Momiji2D) {
        this.initPoint = initPoint;
        this.movingPoint = initPoint;
    }

    /*
     * static methods
     */

    /**
     * スワイプを始める
     * @param finger
     */
    static start(finger: Momiji2D | Touch): MomijiSwiping {
        const value = finger instanceof Touch ? Momiji2D.to(finger) : finger;
        return new MomijiSwiping(value);
    }

    /*
     * Properties
     */

    translate2D(limit?: Momiji2D): Momiji2D {
        const diff = Momiji2D.diff(this.movingPoint, this.initPoint);
        diff.add(this.weight);

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

    start(finger: Momiji2D | Touch): MomijiSwiping {
        finger = finger instanceof Touch ? Momiji2D.to(finger) : finger;
        this.initPoint = finger;
        return this;
    }

    /**
     * 指を動かす
     * @param finger
     */
    move(finger: Momiji2D | Touch): MomijiSwiping {
        finger = finger instanceof Touch ? Momiji2D.to(finger) : finger;
        this.movingPoint = finger;
        return this;
    }

    /**
     * 重みを更新
     */
    end(limit?: Momiji2D): MomijiSwiping {
        this.weight = this.translate2D(limit);
        return this;
    }
}