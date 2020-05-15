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
                              @quickzoomed=""
                              @scalereset=""
                              @updatelimit="onUpdateCanvasTranslateLimit"
                              :scale="pi_scale"
                              :translate-x="pi_translate.x"
                              :translate-y="pi_translate.y">
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
    import Momiji2D from "~/src/models/Momiji2D";
    import MomijiSwiping from "~/src/models/fingers/MomijiSwiping";

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
        canvas_sw_model: MomijiSwiping | null = null;
        pi_scale: number = 1;
        pi_translate: Momiji2D = new Momiji2D();
        pi_translateLimit: Momiji2D = new Momiji2D();

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


            if (this.isZooming) {
                // キャンバスの移動
                if (this.canvas_sw_model != null) {
                    this.canvas_sw_model.start(event.position);
                } else {
                    this.canvas_sw_model = MomijiSwiping.start(event.position);
                }
            } else {
                // 切り替え操作
                this.sw_model = MomijiSwitching.start(event.position);
            }
        }

        swipeMove(event: MomijiSwipeEvent) {
            // console.log(`(${event.position.x}, ${event.position.y})`);
            if (this.isZooming) {
                if (this.canvas_sw_model != null) {
                    this.canvas_sw_model.move(event.position);
                    this.pi_translate = this.canvas_sw_model.translate2D(this.pi_translateLimit);
                }
            } else {
                if (this.sw_model != null) {
                    this.sw_model.move(event.position, 10);
                    this.sw_translateX = this.sw_model.translate2D().x;
                }
            }
        }

        swipeEnd() {
            if (this.isZooming) {
                this.canvas_sw_model?.end(this.pi_translateLimit);
            } else {
                this.sw_model = null;
            }
        }

        pinchStart(event: MomijiPinchEvent) {
            // キャンバスのスケール計算
            if (this.pi_model != null) {
                this.pi_model.start(event.fingerPair.finger1, event.fingerPair.finger2);
            } else {
                this.pi_model = MomijiPinching.start(event.fingerPair.finger1, event.fingerPair.finger2);
            }

            // キャンバスの移動準備
            if (this.canvas_sw_model != null) {
                this.canvas_sw_model.start(event.fingerPair.centerPoint);
            } else {
                this.canvas_sw_model = MomijiSwiping.start(event.fingerPair.centerPoint);
            }
        }

        pinchMove(event: MomijiPinchEvent) {
            if (this.pi_model != null) {
                this.pi_model.move(event.fingerPair.finger1, event.fingerPair.finger2);
                this.pi_scale = this.pi_model.scale(1, 4);

                this.isZooming = this.pi_scale > 1;
            }

            if (this.canvas_sw_model != null) {
                this.canvas_sw_model.move(event.fingerPair.centerPoint);
                this.pi_translate = this.canvas_sw_model.translate2D(this.pi_translateLimit);
            }
        }

        pinchEnd() {
            if (this.pi_model != null) {
                this.pi_model.end(1, 4);
            }

            if (this.canvas_sw_model != null) {
                this.canvas_sw_model.end(this.pi_translateLimit);
            }
        }

        /*
        Component event handlers
         */

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

        onUpdateCanvasTranslateLimit(limit: Momiji2D) {
            this.pi_translateLimit = limit;
        }
    }
</script>

<style scoped lang="scss">
    .momiji-wh-100 {
        width: 100%;
        height: 100%;
    }
</style>