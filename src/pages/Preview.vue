<template>
    <div class="container">
        <div class="row">
            <div class="col-12">
                <momiji-magnifier>
                    <img src="/img/material.png" alt="material" class="img-fluid"/>
                </momiji-magnifier>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import MomijiMagnifier from "~/src/components/MomijiMagnifier.vue";

    @Component({
        components: {MomijiMagnifier}
    })
    export default class Preview extends Vue {

    }
</script>

<style scoped>

</style>