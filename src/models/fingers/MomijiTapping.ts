export default class MomijiTapping {
    lastTapAt: number;
    isDoubleTapping: boolean = false;

    doubleTapSensibility: number = 200;

    protected constructor(tapAt: number) {
        this.lastTapAt = tapAt;
    }

    /*
    static methods
     */

    static tap(tapAt: number): MomijiTapping {
        return new MomijiTapping(tapAt);
    }

    /*
    instance methods
     */

    tap(tapAt: number): MomijiTapping {
        this.isDoubleTapping = tapAt - this.lastTapAt < this.doubleTapSensibility;
        this.lastTapAt = tapAt;
        return this;
    }
}