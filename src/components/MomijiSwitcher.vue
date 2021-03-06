<template>
    <div class="momiji-sw-outer">
        <div class="momiji-sw-transformer" :style="style">
            <div v-if="!disablePrevious"
                 class="momiji-sw-container momiji-sw-previous">
                <slot name="previous"/>
            </div>

            <div class="momiji-sw-container">
                <slot name="focus"/>
            </div>

            <div v-if="!disableNext"
                 class="momiji-sw-container momiji-sw-next">
                <slot name="next"/>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue, Watch} from "vue-property-decorator";

    @Component
    export default class MomijiSwitcher extends Vue {
        /*
         * states
         */
        @Prop({type: Boolean, default: false})
        isSwiping!: boolean;

        @Prop({type: Number, default: 0})
        translateX!: number;

        @Prop({type: Boolean, default: false})
        disablePrevious!: boolean;

        @Prop({type: Boolean, default: false})
        disableNext!: boolean;


        /*
         * settings
         */

        @Prop({type: Number, default: 200})
        animDuration!: number;

        @Prop({type: Number, default: 120})
        sensibility!: number;

        /*
         * Properties
         */

        l_translateX?: string;
        l_duration: number = 0;

        get style() {
            return {
                transition: `transform ${this.l_duration}ms ease-in-out`,
                transform: `translateX(${this.l_translateX ?? `${this.translateX ?? 0}px`})`
            }
        }

        /*
         * handler
         */
        @Watch('isSwiping')
        onChangeSwipingStatus() {
            if (!this.isSwiping) {
                if (this.translateX > this.sensibility) {
                    this.switchPrevious();
                } else if (this.translateX < -this.sensibility) {
                    this.switchNext();
                } else {
                    this.reset();
                }
            }
        }


        /*
         * methods
         */


        async switchNext() {
            this.l_duration = this.animDuration;
            this.l_translateX = 'calc(-100% - 10px)';
            await this.waitForMs(this.animDuration);
            this.$emit('next');
            this.l_translateX = undefined;
            this.l_duration = 0;
        }

        async switchPrevious() {
            this.l_duration = this.animDuration;
            this.l_translateX = 'calc(100% + 10px)';
            await this.waitForMs(this.animDuration);
            this.$emit('previous');
            this.l_translateX = undefined;
            this.l_duration = 0;
        }

        async reset() {
            this.$emit('reset');
            this.l_duration = this.animDuration;
            this.l_translateX = undefined;
            await this.waitForMs(this.l_duration);
            this.l_duration = 0;
        }

        /**
         * 指定ミリ秒待つ
         * @param ms
         */
        private waitForMs(ms: number): Promise<void> {
            return new Promise(resolve => {
                setTimeout(resolve, ms);
            });
        }
    };
</script>

<style scoped lang="scss">
    .momiji-sw-outer {
        overflow: hidden;
        position: relative;
    }

    .momiji-sw-transformer {
        position: relative;
        width: 100%;
        height: 100%;
    }

    .momiji-sw-container {
        width: 100%;
        height: 100%;

        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .momiji-sw-previous {
        left: -100%;
        margin-left: -10px;
    }

    .momiji-sw-next {
        right: -100%;
        margin-right: -10px;
    }
</style>