export default class Momiji2D {
    /*
     * static methods
     */

    /**
     * TouchをMomiji2Dに変換
     * @param touch
     */
    static to2D(touch: Touch): Momiji2D {
        return new Momiji2D(touch.pageX, touch.pageY);
    }

    /**
     * 合計を求める
     * @param points
     */
    static total(points: Momiji2D[]) {
        const instance = new Momiji2D(0, 0)
        points.forEach(it => {
            instance.x += it.x;
            instance.y += it.y;
        });
        return instance;
    }

    /**
     * 平均を求める
     * @param points
     */
    static average(points: Momiji2D[]) {
        const instance = Momiji2D.total(points);
        instance.x = instance.x / points.length;
        instance.y = instance.y / points.length;
        return instance;
    }

    /**
     * 差を求め、新しいインスタンスを返す
     * @param pointA
     * @param pointB
     */
    static diff(pointA: Momiji2D, pointB: Momiji2D): Momiji2D {
        return new Momiji2D(pointA.x - pointB.x, pointA.y - pointB.y);
    }

    /**
     * 2点間の距離を求める
     * @param pointA
     * @param pointB
     */
    static distance(pointA: Momiji2D, pointB: Momiji2D): number {
        return Math.sqrt((pointA.x - pointB.x) ** 2 + (pointA.y - pointB.y) ** 2);
    }

    // properties

    x: number;
    y: number;

    constructor(x: number = 0, y: number = 0) {
        this.x = x;
        this.y = y;
    }

    /*
     * instance methods
     */

    /**
     * 足す
     * @param point
     */
    add(point: Momiji2D): Momiji2D {
        this.x += point.x;
        this.y += point.y;

        return this;
    }

    /**
     * 引く
     * @param point
     */
    sub(point: Momiji2D): Momiji2D {
        this.x -= point.x;
        this.y -= point.y;

        return this;
    }
}