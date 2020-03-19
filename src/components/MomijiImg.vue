<template>
    <div>
        <img :src="src"
             alt="windows"
             @touchstart="dragStart"
             @touchmove="dragging"
             @touchend="dragEnd"
             ref="img"
             :style="style"
             class="momiji"/>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";

    @Component
    export default class MomijiImg extends Vue {
        @Prop({type: String, required: true})
        src!: string;

        @Prop({type: Boolean, default: true})
        snap!: boolean;

        initX = 0;
        initY = 0;

        imgWidth = 0;
        dx = 0;
        dy = 0;

        isDragging = false;
        isAnimating = false;

        isSnapVertical = false;
        isSnapHorizontal = false;

        get img(): Element {
            return this.$refs.img as Element;
        }

        get style() {
            const obj: any = {
                'position': this.isAnimating ? 'fixed' : 'static',
                'max-width': this.isAnimating ? `${this.imgWidth}px` : '100%',
                'transition': `all ${this.isDragging ? 0 : 200}ms ease-out`,
            };

            if (this.isDragging) {
                obj['transform'] = `translate(${this.dx}px, ${this.dy}px)`;
            }

            return obj;
        }

        mounted(): void {
        }

        dragStart(event: Event): void {
            if (event instanceof TouchEvent) {
                this.initX = event.touches[0].pageX;
                this.initY = event.touches[0].pageY;

                this.imgWidth = this.img.getBoundingClientRect().width;

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
    }
</script>

<style scoped>
    .momiji {
        user-select: none;
        height: auto;
    }
</style>