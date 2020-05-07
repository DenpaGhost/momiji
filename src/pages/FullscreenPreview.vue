<template>
    <div class="mag">
        <momiji-magnifier @zoombegin="zoomBegin" @zoomend="zoomEnd">
            <img src="/img/material.png" alt="material" class="img-fluid"/>
        </momiji-magnifier>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import MomijiMagnifier from "../components/Old/MomijiMagnifier.vue";

    @Component({
        components: {MomijiMagnifier}
    })
    export default class FullscreenPreview extends Vue {
        zoomBegin(){
            console.log('ズームし始めた');
        }

        zoomEnd(){
            console.log('ズームやめた');
        }
    };
</script>

<style scoped>
    .mag {
        background-color: #000000;
        height: 100vh;
        width: 100vw;
    }
</style>