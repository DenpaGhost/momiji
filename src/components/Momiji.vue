<template>
    <div class="momiji"
         ref="momiji"
         :style="style"
         @touchstart="dragStart"
         @touchmove="dragging"
         @touchend="dragEnd">
        <slot/>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";

    @Component
    export default class Momiji extends Vue {
        @Prop({type: Boolean, default: true})
        snap!: boolean;

        @Prop({type: Number, default: 10})
        swipeDistance!: number;

        initX = 0;
        initY = 0;
        width = 0;

        isDragging = false;
        isAnimating = false;

        dx = 0;
        dy = 0;

        isSnapVertical = false;
        isSnapHorizontal = false;

        get momiji(): Element {
            return this.$refs.momiji as Element;
        }

        get style() {
            const obj: any = {
                'position': this.isAnimating ? 'fixed' : 'static',
                'transition': `all ${this.isDragging ? 0 : 200}ms ease-out`,
            };

            if (this.isDragging) {
                obj['transform'] = `translate(${this.dx}px, ${this.dy}px)`;
            }

            if (this.isAnimating) {
                obj['width'] = `${this.width}px`
            }

            return obj;
        }

        mounted(): void {
        }

        dragStart(event: Event): void {
            if (event instanceof TouchEvent) {
                this.initX = event.touches[0].pageX;
                this.initY = event.touches[0].pageY;

                this.width = this.momiji.getBoundingClientRect().width;

                this.isDragging = true;
                this.isAnimating = true;
            }
        }

        dragging(event: Event): void {
            if (event instanceof TouchEvent) {
                if (this.snap) {
                    if (!(this.isSnapHorizontal && this.isSnapVertical) && (this.isSnapHorizontal || this.isSnapVertical)) {
                        if (this.isSnapHorizontal) {
                            this.dx = this.distanceX(event);
                        } else {
                            this.dy = this.distanceY(event);
                        }
                    }
                } else {
                    this.dx = this.distanceX(event);
                    this.dy = this.distanceY(event);
                }

                if (this.snap && !(this.isSnapHorizontal || this.isSnapVertical)) {
                    if (Math.abs(this.distanceX(event)) > Math.abs(this.distanceY(event))) {
                        this.isSnapHorizontal = true;
                        this.dy = this.distanceY(event);
                        this.dy = 0;
                    } else {
                        this.isSnapVertical = true;
                        this.dx = 0;
                        this.dy = this.distanceY(event);
                    }
                }
            }
        }

        dragEnd(event: Event) {
            if (event instanceof TouchEvent) {
                if (this.dx > this.rem2px(this.swipeDistance)) {
                    console.log('swipe right');
                } else if (this.dx < this.rem2px(-this.swipeDistance)) {
                    console.log('swipe left');
                } else if (this.dy > this.rem2px(this.swipeDistance)) {
                    console.log('swipe down');
                } else if (this.dy < this.rem2px(-this.swipeDistance)) {
                    console.log('swipe up');
                }

                this.dx = 0;
                this.dy = 0;
                this.isDragging = false;

                this.wait(200).then(_ => {
                    this.isAnimating = false;

                    this.isSnapVertical = false;
                    this.isSnapHorizontal = false;
                });
            }
        }

        wait(ms: number) {
            return new Promise((resolve) => {
                setTimeout(resolve, ms);
            });
        }

        distanceX(event: TouchEvent): number {
            return event.touches[0].pageX - this.initX;
        }

        distanceY(event: TouchEvent): number {
            return event.touches[0].pageY - this.initY;
        }

        rem2px(rem: number): number {
            const font = getComputedStyle(document.documentElement).fontSize;
            return rem * parseFloat(font);
        }
    }
</script>

<style scoped>
    .momiji {
        user-select: none;
        height: auto;
    }
</style>