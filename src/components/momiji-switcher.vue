<template>
    <div class="momiji-outer">
        <!--        <img src="img/material.png" class="fluid">-->
        <!--        <img src="img/windows-xp-bliss-4k-lu.jpg" class="fluid focus">-->
        <!--        <img src="img/material.png" class="fluid next">-->

        <div class="momiji-container">
            <img src="img/windows-xp-bliss-4k-lu.jpg" class="momiji-img-fluid">
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";

    @Component
    export default class MomijiSwitcher extends Vue {

    }
</script>

<style scoped>
    .momiji-outer {
        height: 100vh;
        width: 100vw;
        background-color: #212121;

        overflow: scroll;
        position: relative;
    }

    .momiji-container {
        width: 100%;
        height: 100%;

        display: flex;
        align-items: center;
    }

    .momiji-img-fluid {
        max-width: 100%;
        max-height: 100%;
        width: auto;
        height: auto;
    }
</style>