import Momiji2D from "~/src/models/Momiji2D";

export default class MomijiFingerPair {
    finger1: Momiji2D;
    finger2: Momiji2D;

    constructor(finger1: Momiji2D, finger2: Momiji2D) {
        this.finger1 = finger1;
        this.finger2 = finger2;
    }

    /*
     * Properties
     */

    get distance(): number {
        return Momiji2D.distance(this.finger1, this.finger2);
    }

    get centerPoint(): Momiji2D {
        return Momiji2D.average([this.finger1, this.finger2]);
    }
}