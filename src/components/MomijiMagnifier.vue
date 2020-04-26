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
        baseMagnificationRate: number = 1;
        currentMagnificationRate: number = 1;

        get style() {
            return {
                transform: `scale(${this.currentMagnificationRate})`
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

                this.baseDistance = new MomijiDistance(
                    new MomijiPoint(event.touches[0]),
                    new MomijiPoint(event.touches[1])
                ).distance;

                this.isPinching = true;
            }
        }

        dragging(event: Event): void {
            if (event instanceof TouchEvent && event.touches.length == 2) {
                const distance = new MomijiDistance(
                    new MomijiPoint(event.touches[0]),
                    new MomijiPoint(event.touches[1])
                ).distance;

                this.setMagnificationRate((distance / this.baseDistance) * this.baseMagnificationRate);
                console.log(this.currentMagnificationRate);

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