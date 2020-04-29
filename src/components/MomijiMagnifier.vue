<template>
    <div @touchstart="dragStart"
         @touchmove="dragging"
         @touchend="dragEnd"
         ref="viewport"
         :class="{'momiji-mag-overflow-hidden': overflowHidden}">
        <div :style="style" ref="momiji-mag-frame">
            <slot/>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import MomijiPinching from "~/src/models/fingers/MomijiPinching";
    import Momiji2D from "~/src/models/Momiji2D";

    @Component
    export default class MomijiMagnifier extends Vue {
        @Prop({type: Boolean, default: false})
        overflowHidden!: boolean;

        isPinching = false;
        translate2d: Momiji2D = new Momiji2D(0, 0);
        magnificationRate: number = 1

        domRect: DOMRect | null = null;

        // refactor
        pinch!: MomijiPinching;

        get style() {
            return {
                transform: `translate(${this.translate2d.x}px, ${this.translate2d.y}px) scale(${this.magnificationRate})`
            }
        }

        handleTouchMove(event: any): void {
            event.preventDefault();
        }

        dragStart(event: Event): void {
            if (event instanceof TouchEvent && event.touches.length == 2) {
                document.addEventListener('touchmove', this.handleTouchMove, {passive: false});

                if (!this.pinch) {
                    this.pinch = MomijiPinching.start(event.touches[0], event.touches[1]);
                } else {
                    this.pinch.start(event.touches[0], event.touches[1]);
                }

                console.log("指が触れた")
                console.log(this.pinch);
                console.log(this.pinch.scale() / this.pinch.scaleWeight);
                console.log(Momiji2D.diff(this.pinch.translate2D(), this.pinch.translateWeight));

                this.isPinching = true;
            }
        }

        dragging(event: Event): void {
            if (event instanceof TouchEvent && event.touches.length == 2) {
                this.pinch.move(event.touches[0], event.touches[1])

                this.magnificationRate = this.pinch.scale(1, 4);
                this.translate2d = this.pinch.translate2D();

                this.$emit('zoomed', this.magnificationRate);
            }
        }

        dragEnd(event: Event): void {
            if (event instanceof TouchEvent && event.touches.length <= 0) {
                document.removeEventListener('touchmove', this.handleTouchMove);

                this.pinch.end();
                this.isPinching = false;

                console.log("指が全部離れた");
                console.log(this.pinch);
                console.log(this.pinch.scale() / this.pinch.scaleWeight);
                console.log(Momiji2D.diff(this.pinch.translate2D(), this.pinch.translateWeight));
            }
        }
    }
</script>

<style scoped>
    .momiji-mag-overflow-hidden {
        overflow: hidden;
    }
</style>