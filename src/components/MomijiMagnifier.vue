<template>
    <div @touchstart="dragStart"
         @touchmove="dragging"
         @touchend="dragEnd">
        <div :style="style">
            <slot/>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import MomijiDistance from "~/src/models/MomijiDistance";
    import MomijiPoint from "~/src/models/MomijiPoint";

    @Component
    export default class MomijiMagnifier extends Vue {
        isPinching = false;
        baseDistance: number = 0;
        baseMagnificationRate: number = 1;
        currentMagnificationRate: number = 1;

        get style() {
            return {
                transform: `scale(${this.baseMagnificationRate + (this.currentMagnificationRate - 1)})`
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
                this.currentMagnificationRate = distance / this.baseDistance;

                console.log(this.currentMagnificationRate);
                // console.log(`拡大率 : ${(this.baseMagnificationRate + (this.currentMagnificationRate - 1)) * 100}`);

                this.$emit('zoomed', this.baseMagnificationRate + (this.currentMagnificationRate - 1));
            }
        }

        dragEnd(event: Event): void {
            if (event instanceof TouchEvent && event.touches.length < 2) {
                console.log("指が全部離れた");
                document.removeEventListener('touchmove', this.handleTouchMove);

                this.baseMagnificationRate += this.currentMagnificationRate - 1;
                this.currentMagnificationRate = 1;

                this.isPinching = false;
            }
        }
    }
</script>

<style scoped>

</style>