<template>
    <momiji-switcher :snap="true"/>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import Momiji from "./Momiji.vue";
    import MomijiSwitcher from "~/src/components/momiji-switcher.vue";

    @Component({
        components: {MomijiSwitcher, Momiji: Momiji}
    })
    export default class Base extends Vue {
        mounted() {
        }
    }
</script>

<style scoped>

</style>