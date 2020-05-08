<template>
    <div class="container">
        <div class="row">
            <div class="col-12">
                <momiji-magnifier @zoomed="handleZoomed" overflow-hidden>
                    <img src="/img/material.png" alt="material" class="img-fluid"/>
                </momiji-magnifier>
            </div>
            <div class="col-12">
                {{magnificationRate}}
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import MomijiMagnifier from "~/src/components/Old/DepMomijiMagnifier.vue";

    @Component({
        components: {MomijiMagnifier}
    })
    export default class Preview extends Vue {
        magnificationRate: number = 0;

        handleZoomed(event: any) {
            this.magnificationRate = event!;
        }

    }
</script>

<style scoped>

</style>