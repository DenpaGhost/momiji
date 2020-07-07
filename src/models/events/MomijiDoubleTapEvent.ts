import Momiji2D from "~/src/models/Momiji2D";

export default class MomijiDoubleTapEvent {
    position: Momiji2D;

    constructor(position: Momiji2D | Touch) {
        if (position instanceof Touch) {
            this.position = Momiji2D.to(position);
        } else {
            this.position = position;
        }
    }
}