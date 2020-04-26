<template>
    <div @touchstart="dragStart"
         @touchmove="dragging"
         @touchend="dragEnd"
         :class="{'momiji-mag-overflow-hidden': overflowHidden}">
        <div :style="style">
            <slot/>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import MomijiDistance from "~/src/models/MomijiDistance";
    import MomijiPoint from "~/src/models/MomijiPoint";

    @Component
    export default class MomijiMagnifier extends Vue {
        @Prop({type: Boolean, default: false})
        overflowHidden!: boolean;

        isPinching = false;
        baseDistance: number = 0;
        baseCenterPoint: MomijiPoint | null = null;
        baseMagnificationRate: number = 1;
        currentMagnificationRate: number = 1;
        translate2d: MomijiPoint = new MomijiPoint(0, 0);

        get style() {
            return {
                transform: `translate(${this.translate2d.x}px, ${this.translate2d.y}px) scale(${this.currentMagnificationRate})`
            }
        }

        setMagnificationRate(value: number) {
            if (value > 4) {
                this.currentMagnificationRate = 4;
            } else if (value < 1) {
                this.currentMagnificationRate = 1
            } else {
                this.currentMagnificationRate = value;
            }
        }

        handleTouchMove(event: any): void {
            event.preventDefault();
        }

        dragStart(event: Event): void {
            if (event instanceof TouchEvent && event.touches.length == 2) {
                document.addEventListener('touchmove', this.handleTouchMove, {passive: false});

                const md = new MomijiDistance(
                    new MomijiPoint(event.touches[0]),
                    new MomijiPoint(event.touches[1])
                );

                this.baseDistance = md.distance;
                this.baseCenterPoint = md.centerPoint;

                this.isPinching = true;
            }
        }

        dragging(event: Event): void {
            if (event instanceof TouchEvent && event.touches.length == 2) {
                const md = new MomijiDistance(
                    new MomijiPoint(event.touches[0]),
                    new MomijiPoint(event.touches[1])
                );
                const distance = md.distance;

                this.setMagnificationRate((distance / this.baseDistance) * this.baseMagnificationRate);
                console.log(this.currentMagnificationRate);

                this.translate2d = md.centerPoint.getDiff(this.baseCenterPoint!);

                this.$emit('zoomed', this.currentMagnificationRate);
            }
        }

        dragEnd(event: Event): void {
            if (event instanceof TouchEvent && event.touches.length < 2) {
                console.log("指が全部離れた");
                document.removeEventListener('touchmove', this.handleTouchMove);

                this.baseMagnificationRate = this.currentMagnificationRate;

                this.isPinching = false;
            }
        }
    }
</script>

<style scoped>
    .momiji-mag-overflow-hidden {
        overflow: hidden;
    }
</style>