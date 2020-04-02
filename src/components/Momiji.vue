<template>
    <div class="momiji-outer"
         @touchstart="dragStart"
         @touchmove="dragging"
         @touchend="dragEnd">

        <div class="momiji-container momiji-previous"
             :style="style">
            <slot name="previous"/>
        </div>

        <div class="momiji-container"
             :style="style">
            <slot name="focus"/>
        </div>

        <div class="momiji-container momiji-next"
             :style="style">
            <slot name="next"/>
        </div>

    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import MomijiPosition from "~/src/models/MomijiPosition";

    @Component
    export default class MomijiSwipeableBox extends Vue {
        @Prop({type: Boolean, default: true})
        snap!: boolean;

        @Prop({type: Number, default: 80})
        sensibility!: number;

        position!: MomijiPosition;
        isDragging = false;
        isAnimating = false;

        isSnapHorizontal = false;
        isSnapVertical = false;

        dx: number = 0;
        dy: number = 0;

        get style() {
            return {
                transform: `translate(${this.dx}px, ${this.dy}px)`,
                transition: `transform ${this.isAnimating ? '200ms' : '0ms'}`
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

                document.removeEventListener('touchmove', this.handleTouchMove);
                this.isDragging = false;

                this.isAnimating = true;

                switch (this.SwipeDirection) {
                    case Direction.left:
                        this.dx = -(window.parent.screen.width + 10);
                        this.waitForMS(200).then(() => {
                            this.isAnimating = false;
                            this.$emit("swipeToLeft");

                            this.dx = 0;
                            this.dy = 0;
                        });
                        break;
                    case Direction.right:
                        this.dx = window.parent.screen.width + 10;
                        this.waitForMS(200).then(() => {
                            this.isAnimating = false;
                            this.$emit('swipeToRight');

                            this.dx = 0;
                            this.dy = 0;
                        });
                        break;
                    case Direction.up:
                        console.log('swipe up');
                        this.dx = 0;
                        this.dy = 0;
                        this.waitForMS(200).then(_ => {
                            this.isAnimating = false;
                        });
                        break;

                    case Direction.down:
                        console.log('swipe down');
                        this.dx = 0;
                        this.dy = 0;
                        this.waitForMS(200).then(_ => {
                            this.isAnimating = false;
                        });
                        break;

                    default:
                        this.dx = 0;
                        this.dy = 0;
                        this.waitForMS(200).then(_ => {
                            this.isAnimating = false;
                        });
                }

                this.isSnapHorizontal = false;
                this.isSnapVertical = false;
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

    .momiji-previous {
        left: -100vw;
        margin-left: -10px;
    }

    .momiji-next {
        left: 100vw;
        margin-left: 10px;
    }
</style>