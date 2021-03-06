<template>
    <div @touchstart.prevent="handleTouchStart"
         @touchmove.prevent="handleTouchMove"
         @touchend.prevent="handleTouchEnd">
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
     * doubleTap
     */
    import {Component, Vue} from "vue-property-decorator";
    import MomijiSwipeEvent from "~/src/models/events/MomijiSwipeEvent";
    import MomijiPinchEvent from "~/src/models/events/MomijiPinchEvent";
    import MomijiTapping from "~/src/models/fingers/MomijiTapping";
    import MomijiDoubleTapEvent from "~/src/models/events/MomijiDoubleTapEvent";

    @Component
    export default class MomijiTouchHandler extends Vue {
        swipeEvent?: MomijiSwipeEvent;
        pinchEvent?: MomijiPinchEvent;
        doubleTapping?: MomijiTapping;

        handleTouchStart(event: TouchEvent) {
            if (event.touches.length == 1) {
                this.attachSwipeEvent(event.touches[0]);
                this.emitDoubleTappingEvent(event.touches[0]);
            } else if (event.touches.length == 2) {
                this.detachSwipeEvent();
                this.attachPinchEvent(event.touches[0], event.touches[1]);
            }
        }

        handleTouchMove(event: TouchEvent) {
            if (event.touches.length == 1) {
                this.updateSwipeEvent(event.touches[0]);
            } else if (event.touches.length == 2) {
                this.updatePinchEvent(event.touches[0], event.touches[1]);
            }
        }

        handleTouchEnd(event: TouchEvent) {
            if (event.touches.length <= 0) {
                this.detachSwipeEvent();
            } else if (event.touches.length == 1) {
                this.detachPinchEvent();
            }
        }

        /*
         * methods
         */

        attachSwipeEvent(touch: Touch) {
            this.swipeEvent = new MomijiSwipeEvent(touch);
            this.$emit('swipestart', this.swipeEvent);
        }

        updateSwipeEvent(touch: Touch) {
            if (!!this.swipeEvent) {
                this.swipeEvent.move(touch);
                this.$emit('swipemove', this.swipeEvent);
            }
        }

        detachSwipeEvent() {
            this.swipeEvent = undefined;
            this.$emit('swipeend');
        }

        attachPinchEvent(touch1: Touch, touch2: Touch) {
            this.pinchEvent = new MomijiPinchEvent(touch1, touch2);
            this.$emit('pinchstart', this.pinchEvent);
        }

        updatePinchEvent(touch1: Touch, touch2: Touch) {
            if (!!this.pinchEvent) {
                this.pinchEvent.move(touch1, touch2);
                this.$emit('pinchmove', this.pinchEvent);
            }
        }

        detachPinchEvent() {
            this.pinchEvent = undefined;
            this.$emit('pinchend');
        }

        emitDoubleTappingEvent(touch: Touch) {
            if (this.doubleTapping) {
                this.doubleTapping.tap(performance.now());
            } else {
                this.doubleTapping = MomijiTapping.tap(performance.now());
            }

            if (this.doubleTapping.isDoubleTapping) {
                console.log('double tapping');
                this.$emit('doubletap', new MomijiDoubleTapEvent(touch));
                this.doubleTapping = undefined;
            }
        }
    };
</script>

<style scoped lang="scss">

</style>