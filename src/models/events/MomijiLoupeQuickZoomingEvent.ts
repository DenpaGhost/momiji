import Momiji2D from "~/src/models/Momiji2D";

export default class MomijiLoupeQuickZoomingEvent {
    scale: number;
    translate: Momiji2D;

    constructor(scale: number, translate: Momiji2D) {
        this.scale = scale;
        this.translate = translate;
    }
}