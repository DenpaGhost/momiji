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
            <div class="col-12 mt-3">
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
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import MomijiMagnifier from "~/src/components/Old/DepMomijiMagnifier.vue";
    import MomijiSwitcher from "~/src/components/MomijiSwitcher.vue";

    @Component({
        components: {MomijiSwitcher, MomijiMagnifier}
    })
    export default class Preview extends Vue {
        num: string = '0';

        get translate(): number {
            const num = parseInt(this.num);
            return isNaN(num) ? 0 : parseInt(this.num);
        }

        get switcher(): any {
            return this.$refs['momijiSwitch']
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
    }
</script>

<style scoped>

</style>