<template>
    <div @touchstart="handleTouchStart"
         @touchmove="handleTouchMove"
         @touchend="handleTouchEnd">
        <slot/>
    </div>
</template>

<script lang="ts">
    /**
     * swipestart
     * swipemove
     * swipeend
     * pinchstart
     * pinchmove
     * pinchend
     */
    import {Component, Vue} from "vue-property-decorator";
    import MomijiSwipeEvent from "~/src/models/events/MomijiSwipeEvent";

    @Component
    export default class MomijiTouchHandler extends Vue {
        swipeEvent?: MomijiSwipeEvent;

        handleTouchStart(event: TouchEvent) {
            if (event.touches.length == 1) {
                this.swipeEvent = new MomijiSwipeEvent(event.touches[0]);
                this.$emit('swipestart', this.swipeEvent);
            }
        }

        handleTouchMove(event: TouchEvent) {
            if (event.touches.length == 1) {
                this.swipeEvent =
                    this.swipeEvent?.move(event.touches[0]) ?? new MomijiSwipeEvent(event.touches[0]);

                this.$emit('swipemove', this.swipeEvent);
            }
        }

        handleTouchEnd(event: TouchEvent) {
            if (event.touches.length <= 0) {
                this.swipeEvent = undefined;
                this.$emit('swipeend');
            }
        }
    };
</script>

<style scoped lang="scss">

</style>