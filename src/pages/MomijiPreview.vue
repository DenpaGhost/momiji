<template>
    <momiji class="box">
        <template v-slot:previous>
            <img src="/img/material.png" alt="material" class="img-fluid"/>
        </template>

        <template v-slot:focus>
            <img src="/img/material.png" alt="material" class="img-fluid"/>
        </template>

        <template v-slot:next>
            <img src="/img/material.png" alt="material" class="img-fluid"/>
        </template>
    </momiji>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import Momiji from "~/src/components/Old/DepMomiji.vue";

    @Component({
        components: {Momiji}
    })
    export default class MomijiPreview extends Vue {

    }
</script>

<style scoped lang="scss">
    .box {
        height: 100vh;
        width: 100vw;
    }
</style>