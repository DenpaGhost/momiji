import Momiji2D from "~/src/models/Momiji2D";

export default class MomijiSwipeEvent {
    position: Momiji2D;

    constructor(position: Momiji2D | Touch) {
        if (position instanceof Touch) {
            this.position = Momiji2D.to(position);
        } else {
            this.position = position;
        }
    }

    /**
     * インスタンスを維持したまま、座標を移動させる。
     * @param position
     */
    move(position: Momiji2D | Touch): MomijiSwipeEvent {
        if (position instanceof Touch) {
            this.position = Momiji2D.to(position);
        } else {
            this.position = position;
        }

        return this;
    }
}