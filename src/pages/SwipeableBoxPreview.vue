<template>
    <momiji-swipable-box class="swipable-box">
        <template v-slot:previous>
            <img src="/img/windows-xp-bliss-4k-lu.jpg"
                 alt="windows xp"
                 class="img-fluid"/>
        </template>

        <template v-slot:focus>
            <img src="/img/material.png"
                 alt="material"
                 class="img-fluid"/>
        </template>

        <template v-slot:next>
            <img src="/img/windows-xp-bliss-4k-lu.jpg"
                 alt="windows xp"
                 class="img-fluid"/>
        </template>
    </momiji-swipable-box>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import MomijiSwipeableBox from "../components/MomijiSwipeableBox.vue";

    @Component({
        components: {MomijiSwipableBox: MomijiSwipeableBox}
    })
    export default class SwipeableBoxPreview extends Vue {

    }
</script>

<style scoped>
    .swipable-box {
        background-color: #000000;
        height: 100vh;
        width: 100vw;
    }
</style>