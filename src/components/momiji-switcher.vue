<template>
    <div class="momiji-outer"
         @touchstart="dragStart"
         @touchmove="dragging"
         @touchend="dragEnd">

        <div class="momiji-container momiji-previous"
             :style="style">
            <img :src="previousSrc" class="momiji-img-fluid">
        </div>

        <div class="momiji-container"
             :style="style">
            <img :src="focusSrc" class="momiji-img-fluid">
        </div>

        <div class="momiji-container momiji-next"
             :style="style">
            <img :src="nextSrc" class="momiji-img-fluid">
        </div>

    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import MomijiPosition from "~/src/models/MomijiPosition";

    @Component
    export default class MomijiSwitcher extends Vue {
        @Prop({type: Boolean, default: true})
        snap!: boolean;

        @Prop({type: Number, default: 160})
        sensibility!: number;

        @Prop({type: String, required: true})
        nextSrc!: string;

        @Prop({type: String, required: true})
        focusSrc!: string;

        @Prop({type: String, required: true})
        previousSrc!: string;

        position!: MomijiPosition;
        isDragging = false;
        isAnimating = false;

        isSnapHorizontal = false;
        isSnapVertical = false;

        dx: number = 0;
        dy: number = 0;

        get style() {
            const x_limit = window.parent.screen.width + 10;
            const y_limit = window.parent.screen.height;

            const x = this.dx > x_limit ? x_limit : this.dx;
            const y = this.dy > y_limit ? y_limit : this.dy;

            return {
                transform: `translate(${x}px, ${y}px)`,
                transition: `transform ${this.isDragging ? '0ms' : '200ms'}`
            };
        }

        get wasSetSnap(): boolean {
            return this.isSnapHorizontal || this.isSnapVertical;
        }

        handleTouchMove(event: any): void {
            event.preventDefault();
        }

        dragStart(event: Event): void {
            if (event instanceof TouchEvent) {
                this.position = new MomijiPosition(event.touches[0].pageX, event.touches[0].pageY);
                this.position.finger = 0;
                document.addEventListener('touchmove', this.handleTouchMove, {passive: false});
                this.isDragging = true;
            }
        }

        dragging(event: Event): void {
            if (event instanceof TouchEvent) {
                this.position.event = event;

                if (this.snap && !this.wasSetSnap) {
                    if (Math.abs(this.position.distanceX) > Math.abs(this.position.distanceY)) {
                        this.isSnapHorizontal = true;
                    } else {
                        this.isSnapVertical = true;
                    }
                }

                if (this.snap) {
                    if (this.wasSetSnap) {
                        if (this.isSnapHorizontal) {
                            this.dx = this.position.distanceX;
                        } else if (this.isSnapVertical) {
                            this.dy = this.position.distanceY;
                        }
                    }
                } else {
                    this.dx = this.position.distanceX;
                    this.dy = this.position.distanceY;
                }
            }
        }

        dragEnd(event: Event): void {
            if (event instanceof TouchEvent
            ) {
                this.position.event = event;

                switch (this.SwipeDirection) {
                    case Direction.left:
                        this.dx = -(window.parent.screen.width + 10);
                        this.$emit("swipeToLeft");
                        break;
                    case Direction.right:
                        this.dx = window.parent.screen.width + 10;
                        this.$emit('swipeToRight');
                        break;
                    case Direction.up:
                        console.log('swipe up');
                        break;
                    case Direction.down:
                        console.log('swipe down');
                        break;
                    default:

                }

                this.isSnapHorizontal = false;
                this.isSnapVertical = false;

                document.removeEventListener('touchmove', this.handleTouchMove);
                this.isDragging = false;

                this.waitForMS(1000).then(_ => {
                    this.isAnimating = false;

                    this.dx = 0;
                    this.dy = 0;
                });
            }
        }

        waitForMS(ms: number): Promise<void> {
            return new Promise((resolve) => {
                setTimeout(resolve, ms);
            });
        }

        get SwipeDirection(): Direction | null {
            if (this.dx > this.sensibility) {
                this.dx = window.parent.screen.width + 10;
                return Direction.right;
            } else if (this.dx < -this.sensibility) {
                this.dx = -(window.parent.screen.width + 10);
                return Direction.left;
            } else if (this.dy > this.sensibility) {
                return Direction.down;
            } else if (this.dy < -this.sensibility) {
                return Direction.up;
            } else {
                return null;
            }
        }
    }

    enum Direction {
        left,
        right,
        up,
        down
    }
</script>

<style scoped>
    .momiji-outer {
        height: 100vh;
        width: 100vw;
        background-color: #212121;

        overflow: hidden;
        position: relative;
    }

    .momiji-container {
        width: 100%;
        height: 100%;

        position: absolute;
        display: flex;
        align-items: center;
    }

    .momiji-img-fluid {
        max-width: 100%;
        max-height: 100%;
        width: auto;
        height: auto;
    }

    .momiji-previous {
        left: -100vw;
        margin-left: -10px;
    }

    .momiji-next {
        left: 100vw;
        margin-left: 10px;
    }
</style>