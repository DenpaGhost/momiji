import Momiji2D from "~/src/models/Momiji2D";
import MomijiFingerPair from "~/src/models/fingers/MomijiFingerPair";

export default class MomijiPinchEvent {
    fingerPair: MomijiFingerPair;

    constructor(finger1: Momiji2D | Touch, finger2: Momiji2D | Touch) {
        finger1 = finger1 instanceof Touch ? Momiji2D.to(finger1) : finger1;
        finger2 = finger2 instanceof Touch ? Momiji2D.to(finger2) : finger2;

        this.fingerPair = new MomijiFingerPair(finger1, finger2);
    }

    move(finger1: Momiji2D | Touch, finger2: Momiji2D | Touch) {
        finger1 = finger1 instanceof Touch ? Momiji2D.to(finger1) : finger1;
        finger2 = finger2 instanceof Touch ? Momiji2D.to(finger2) : finger2;

        this.fingerPair.finger1 = finger1;
        this.fingerPair.finger2 = finger2;
    }

    get centerPoint(): Momiji2D {
        return this.fingerPair.centerPoint;
    }

    get distance(): number {
        return this.fingerPair.distance;
    }
}