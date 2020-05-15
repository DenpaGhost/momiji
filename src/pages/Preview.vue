<template>
    <div class="container">
        <div class="row">
            <div class="col-12">
                <momiji-switcher
                        :translate-x="translate"
                        style="height: 400px; width: 100%"
                        ref="momijiSwitch">
                    <template v-slot:previous>
                        <img src="/img/material.png" alt="material" class="img-fluid"/>
                    </template>

                    <template v-slot:focus>
                        <img src="/img/windows-xp-bliss-4k-lu.jpg" alt="material" class="img-fluid"/>
                    </template>

                    <template v-slot:next>
                        <img src="/img/material.png" alt="material" class="img-fluid"/>
                    </template>
                </momiji-switcher>
            </div>
            <div class="col-12 my-3">
                <button type="button"
                        class="btn btn-info"
                        @click="handlePrevious">
                    Previous
                </button>

                <button type="button"
                        class="btn btn-secondary"
                        @click="handleReset">
                    Focus
                </button>

                <button type="button"
                        class="btn btn-info"
                        @click="handleNext">
                    Next
                </button>

                <label for="num">swipe</label>
                <input id="num" type="number" v-model="num"/>
            </div>
        </div>

        <div class="row">
            <div class="col-12">
                <momiji-loupe ref="loupe" :scale="Scale">
                    <img src="/img/material.png" alt="material" class="img-fluid"/>
                </momiji-loupe>
            </div>
            <div class="col-12 my-3">
                <button type="button"
                        class="btn btn-info"
                        @click="quickZoom">
                    Quick Zoom
                </button>

                <button type="button"
                        class="btn btn-info"
                        @click="reset">
                    Reset
                </button>

                <label for="scale">scale</label>
                <input id="scale" v-model="scale" type="number">
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import MomijiSwitcher from "~/src/components/MomijiSwitcher.vue";
    import MomijiLoupe from "~/src/components/MomijiLoupe.vue";

    @Component({
        components: {MomijiLoupe, MomijiSwitcher}
    })
    export default class Preview extends Vue {
        num: string = '0';
        scale: string = '1';

        get translate(): number {
            const num = parseInt(this.num);
            return isNaN(num) ? 0 : num;
        }

        get Scale(): number {
            const scale = parseInt(this.scale);
            return isNaN(scale) ? 1 : scale;
        }

        get switcher(): any {
            return this.$refs['momijiSwitch']
        }

        get loupe(): any {
            return this.$refs['loupe'];
        }

        async handleNext() {
            await this.switcher.switchNext();
        }

        async handlePrevious() {
            await this.switcher.switchPrevious();
        }

        handleReset() {
            this.switcher.reset();
        }

        async quickZoom() {
            await this.loupe.quickZoom();
        }

        async reset() {
            await this.loupe.reset();
        }
    }
</script>

<style scoped>

</style>