<template>
    <momiji-magnifier class="mag" overflow-hidden>
        <img src="/img/material.png" alt="material" class="img-fluid"/>
    </momiji-magnifier>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import MomijiMagnifier from "../components/MomijiMagnifier.vue";
    @Component({
        components: {MomijiMagnifier}
    })
    export default class FullscreenPreview extends Vue {

    };
</script>

<style scoped>
    .mag {
        background-color: #000000;
        height: 100vh;
        width: 100vw;
    }
</style>