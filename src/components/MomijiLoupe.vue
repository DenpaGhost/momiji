<template>
    <div ref="momiji-mag-viewport"
         class="momiji-mag-viewport">
        <div class="momiji-mag-positioning">
            <div :style="style">
                <slot/>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";

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
        l_animDuration: number = 0;

        get style() {
            return {
                transform: `scale(${this.l_scale ?? this.scale})`,
                transition: `transform ease-in-out ${this.l_animDuration}ms`
            }
        }

        async quickZoom() {
            this.l_animDuration = this.animDuration;
            this.l_scale = this.quickZoomScale;
            await this.waitForMs(this.animDuration);
            this.l_animDuration = 0;
            this.$emit('quickzoomed', this.quickZoomScale);
            this.l_scale = undefined;
        }

        async reset() {
            this.l_animDuration = this.animDuration;
            this.l_scale = 1;
            await this.waitForMs(this.animDuration);
            this.l_animDuration = 0;
            this.$emit('scalereset', 1);
            this.l_scale = undefined;
        }

        waitForMs(ms: number): Promise<void> {
            return new Promise(resolve => {
                setTimeout(resolve, ms);
            });
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