<template>
    <div @touchstart="dragStart"
         @touchmove="dragging"
         @touchend="dragEnd"
         ref="momiji-mag-viewport"
         class="momiji-mag-viewport">
        <div class="momiji-mag-positioning">
            <div :style="style" ref="momiji-mag-canvas">
                <slot/>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import MomijiPinching from "~/src/models/fingers/MomijiPinching";
    import Momiji2D from "~/src/models/Momiji2D";
    import MomijiSwiping from "~/src/models/fingers/MomijiSwiping";

    @Component
    export default class MomijiMagnifier extends Vue {
        pinch?: MomijiPinching;
        swipe?: MomijiSwiping;
        translate2d: Momiji2D = new Momiji2D(0, 0);
        magnificationRate: number = 1

        isPinching = false;
        isPreventing = false;

        get style() {
            return {
                transform: `translate(${this.translate2d.x}px, ${this.translate2d.y}px) scale(${this.magnificationRate})`
            }
        }

        mounted() {
            console.log(this.translateLimit());
        }

        handleTouchMove(event: any): void {
            event.preventDefault();
        }

        dragStart(event: Event): void {
            if (event instanceof TouchEvent) {
                if (!this.isPreventing) {
                    this.isPreventing = true;
                    document.addEventListener('touchmove', this.handleTouchMove, {passive: false});
                }

                if (event.touches.length == 1) {
                    if (!this.swipe) {
                        this.swipe = MomijiSwiping.start(event.touches[0]);
                    } else {
                        this.swipe.start(event.touches[0]);
                    }
                } else if (event.touches.length == 2) {
                    if (!this.pinch) {
                        this.pinch = MomijiPinching.start(event.touches[0], event.touches[1]);
                    } else {
                        this.pinch.start(event.touches[0], event.touches[1]);
                    }

                    if (!this.swipe) {
                        this.swipe = MomijiSwiping.start(this.pinch.initPair.centerPoint);
                    } else {
                        this.swipe.start(this.pinch.initPair.centerPoint);
                    }

                    this.isPinching = true;
                }
            }
        }

        dragging(event: Event): void {
            if (event instanceof TouchEvent) {
                if (event.touches.length == 1) {
                    if (!!this.swipe) {
                        this.translate2d = this.swipe.move(event.touches[0]).translate2D(this.translateLimit());
                    }
                } else if (event.touches.length == 2) {
                    if (!!this.pinch) {
                        this.pinch.move(event.touches[0], event.touches[1])
                        this.magnificationRate = this.pinch.scale(1, 4);

                        if (!!this.swipe) {
                            this.translate2d =
                                this.swipe.move(this.pinch.movingPair.centerPoint).translate2D(this.translateLimit());
                        }
                    }

                    this.$emit('zoomed', this.magnificationRate);
                }
            }
        }

        dragEnd(event: Event): void {
            if (event instanceof TouchEvent) {
                if (event.touches.length <= 0) {
                    if (this.isPinching && !!this.pinch) {
                        this.pinch.end(1, 4);
                        this.isPinching = false;
                    }

                    if (!!this.swipe) {
                        this.swipe.end(this.translateLimit());
                    }

                    if (this.isPreventing) {
                        this.isPreventing = false;
                        document.removeEventListener('touchmove', this.handleTouchMove);
                    }
                }
            }
        }

        /**
         * 表示域の取得
         */
        viewport(): Element {
            return this.$refs['momiji-mag-viewport'] as Element;
        }

        /**
         * 描画部分の取得
         */
        canvas(): Element {
            return this.$refs['momiji-mag-canvas'] as Element;
        }

        /**
         * キャンバス可動域を算出
         */
        translateLimit(): Momiji2D {
            const viewport = this.viewport().getBoundingClientRect();
            const canvas = this.canvas().getBoundingClientRect();

            const x = (canvas.width - viewport.width) / 2 <= 0 ? 0 : (canvas.width - viewport.width) / 2;
            const y = (canvas.height - viewport.height) / 2 <= 0 ? 0 : (canvas.height - viewport.height) / 2;

            return new Momiji2D(x, y);
        }
    }
</script>

<style scoped>
    .momiji-mag-viewport {
        overflow: hidden;

        display: flex;
        justify-content: center;
        align-items: center;

        width: 100%;
        height: 100%;
    }

    .momiji-mag-positioning {
        display: block;
    }
</style>