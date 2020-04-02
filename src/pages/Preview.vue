<template>
    <div class="container">
        <div class="row">
            <div class="col-12">
                <momiji-pinch>
                    <img src="/img/material.png" class="img-fluid">
                </momiji-pinch>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import MomijiPinch from "~/src/components/MomijiPinch.vue";

    @Component({
        components: {MomijiPinch}
    })
    export default class Preview extends Vue {

    }
</script>

<style scoped>

</style>