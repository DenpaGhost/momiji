<template>
    <div ref="momiji-mag-viewport"
         class="momiji-mag-viewport">
        <div class="momiji-mag-positioning">
            <div ref="momiji-mag-canvas"
                 :style="style">
                <slot/>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue, Watch} from "vue-property-decorator";
    import Momiji2D from "~/src/models/Momiji2D";
    import MomijiLoupeQuickZoomingEvent from "~/src/models/events/MomijiLoupeQuickZoomingEvent";
    import Momiji from "~/src/components/Momiji.vue";

    @Component
    export default class MomijiLoupe extends Vue {
        @Prop({type: Number, default: 1})
        scale!: number;

        @Prop({type: Number, default: 0})
        translateX!: number;

        @Prop({type: Number, default: 0})
        translateY!: number;

        @Prop({type: Number, default: 200})
        animDuration!: number;

        @Prop({type: Number, default: 2})
        quickZoomScale!: number;

        l_scale?: number;
        l_translate?: Momiji2D;
        l_animDuration: number = 0;

        get style() {
            return {
                transform: `translate(${this.l_translate ? this.l_translate.x : this.translateX}px, ${this.l_translate ? this.l_translate.y : this.translateY}px) scale(${this.l_scale ?? this.scale})`,
                transition: `transform ease-in-out ${this.l_animDuration}ms`
            }
        }

        async quickZoom() {
            this.l_animDuration = this.animDuration;
            this.l_scale = this.quickZoomScale;
            await this.waitForMs(this.animDuration + 100); // 動作ラグによりキャンバス移動限界がズレる場合があるため余裕を持たせてます。
            this.l_animDuration = 0;
            this.$emit('quickzoomed', new MomijiLoupeQuickZoomingEvent(this.quickZoomScale, new Momiji2D()));
            this.l_scale = undefined;
        }

        async reset() {
            this.l_animDuration = this.animDuration;
            this.l_scale = 1;
            this.l_translate = new Momiji2D();
            await this.waitForMs(this.animDuration + 100); // 動作ラグによりキャンバス移動限界がズレる場合があるため余裕を持たせてます。
            this.l_animDuration = 0;
            this.$emit('scalereset', new MomijiLoupeQuickZoomingEvent(1, new Momiji2D()));
            this.l_scale = undefined;
            this.l_translate = undefined;
        }

        waitForMs(ms: number): Promise<void> {
            return new Promise(resolve => {
                setTimeout(resolve, ms);
            });
        }

        /*
        Members
         */

        viewport(): Element {
            return this.$refs['momiji-mag-viewport'] as Element;
        }

        canvas(): Element {
            return this.$refs['momiji-mag-canvas'] as Element;
        }

        translateLimit(): Momiji2D {
            const viewport = this.viewport().getBoundingClientRect();
            const canvas = this.canvas().getBoundingClientRect();

            const x = (canvas.width - viewport.width) / 2 <= 0 ? 0 : (canvas.width - viewport.width) / 2;
            const y = (canvas.height - viewport.height) / 2 <= 0 ? 0 : (canvas.height - viewport.height) / 2;

            return new Momiji2D(x, y);
        }

        /*
        Watcher
         */

        @Watch('scale')
        onScaleUpdate() {
            this.$emit('updatelimit', this.translateLimit());
        }
    }
</script>

<style scoped lang="scss">
    .momiji-mag-viewport {
        overflow: hidden;

        display: flex;
        justify-content: center;
        align-items: center;

        transition: transform ease-in-out 200ms;
    }

    .momiji-mag-positioning {
        display: block;
    }
</style>