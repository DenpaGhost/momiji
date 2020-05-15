<template>
    <momiji class="mag"
            @next="switchImage"
            @previous="switchImage">
        <template v-slot:previous>
            <img :src="images[flag ? 1:0]" alt="material" class="img-fluid"/>
        </template>
        <template v-slot:focus>
            <img :src="images[flag ? 0:1]" alt="material" class="img-fluid"/>
        </template>
        <template v-slot:next>
            <img :src="images[flag ? 1:0]" alt="material" class="img-fluid"/>
        </template>
    </momiji>
</template>

<script lang="ts">

    import {Component, Vue} from "vue-property-decorator";
    import MomijiSwitcher from "~/src/components/MomijiSwitcher.vue";
    import Momiji from "~/src/components/Momiji.vue";

    @Component({
        components: {Momiji, MomijiSwitcher}
    })
    export default class FullscreenPreview extends Vue {
        flag: boolean = false;

        images: string[] = [
            '/img/material.png',
            '/img/windows-xp-bliss-4k-lu.jpg'
        ]

        switchImage() {
            this.flag = !this.flag;
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