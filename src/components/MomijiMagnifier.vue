<template>
    <div class="momiji"
         ref="momiji"
         :style="style">
        <slot/>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";

    @Component
    export default class MomijiMagnifier extends Vue {

    }
</script>

<style scoped>
    .momiji {
        user-select: none;
        height: auto;
    }
</style>