export default class MomijiPosition {
    initX!: number;
    initY!: number;
    public event: TouchEvent | null = null;
    public finger: number = 0;

    constructor(initX: number, initY: number) {
        this.initX = initX;
        this.initY = initY;
    }

    get distanceX(): number {
        if (this.event != null) {
            return this.event.touches[this.finger].pageX - this.initX;
        } else {
            return 0;
        }
    }

    get distanceY(): number {
        if (this.event != null) {
            return this.event.touches[this.finger].pageY - this.initY;
        } else {
            return 0;
        }
    }
};