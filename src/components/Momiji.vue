<template>
    <momiji-touch-handler
            class="momiji-wh-100"
            @swipestart="swipeStart"
            @swipemove="swipeMove"
            @swipeend="swipeEnd"
            @pinchstart="pinchStart"
            @pinchmove="pinchMove"
            @pinchend="pinchEnd">
        <momiji-switcher class="momiji-wh-100"
                         :is-swiping="sw_model != null"
                         :translate-x="sw_translateX"
                         @next="switchNext"
                         @previous="switchPrevious"
                         @reset="switcherReset"
                         ref="momiji-switcher">
            <template v-slot:previous>
                <slot name="previous"/>
            </template>

            <template v-slot:focus>
                <momiji-loupe ref="momiji-loupe"
                              class="momiji-wh-100"
                              :scale="pi_scale">
                    <slot name="focus"/>
                </momiji-loupe>
            </template>

            <template v-slot:next>
                <slot name="next"/>
            </template>
        </momiji-switcher>
    </momiji-touch-handler>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import MomijiTouchHandler from "~/src/components/MomijiTouchHandler.vue";
    import MomijiSwitcher from "~/src/components/MomijiSwitcher.vue";
    import MomijiLoupe from "~/src/components/MomijiLoupe.vue";
    import MomijiSwipeEvent from "~/src/models/events/MomijiSwipeEvent";
    import MomijiPinchEvent from "~/src/models/events/MomijiPinchEvent";
    import MomijiSwitching from "~/src/models/fingers/MomijiSwitching";
    import MomijiPinching from "~/src/models/fingers/MomijiPinching";

    @Component({
        components: {MomijiLoupe, MomijiSwitcher, MomijiTouchHandler}
    })
    export default class Momiji extends Vue {

        /*
         * members
         */
        isZooming: boolean = false;
        sw_model: MomijiSwitching | null = null;
        sw_translateX: number = 0;

        pi_model: MomijiPinching | null = null;
        pi_scale: number = 1;

        switcher(): any {
            return this.$refs['momiji-switcher'];
        }

        loupe(): any {
            return this.$refs['momiji-loupe'];
        }

        /*
         * event handlers
         */

        swipeStart(event: MomijiSwipeEvent) {
            // console.log(`(${event.position.x}, ${event.position.y})`);
            this.sw_model = MomijiSwitching.start(event.position);
        }

        swipeMove(event: MomijiSwipeEvent) {
            // console.log(`(${event.position.x}, ${event.position.y})`);
            if (!!this.sw_model) {
                this.sw_model.move(event.position, 10);
                this.sw_translateX = this.sw_model.translate2D().x;
            }
        }

        swipeEnd() {
            this.sw_model = null;
        }

        pinchStart(event: MomijiPinchEvent) {
            if (this.pi_model != null) {
                this.pi_model?.start(event.fingerPair.finger1, event.fingerPair.finger2);
            } else {
                this.pi_model = MomijiPinching.start(event.fingerPair.finger1, event.fingerPair.finger2);
            }
        }

        pinchMove(event: MomijiPinchEvent) {
            if (this.pi_model != null) {
                this.pi_model.move(event.fingerPair.finger1, event.fingerPair.finger2);
                this.pi_scale = this.pi_model.scale(1, 4);
            }
        }

        pinchEnd() {
            if (this.pi_model != null) {
                this.pi_model.end(1, 4);
            }
        }

        switcherReset() {
            this.sw_translateX = 0;
        }

        switchNext() {
            this.$emit('next');
            this.sw_translateX = 0;
        }

        switchPrevious() {
            this.$emit('previous');
            this.sw_translateX = 0;
        }
    }
</script>

<style scoped lang="scss">
    .momiji-wh-100 {
        width: 100%;
        height: 100%;
    }
</style>