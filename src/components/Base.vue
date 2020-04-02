<template>
    <momiji-switcher
            next-src="/img/material.png"
            focus-src="/img/windows-xp-bliss-4k-lu.jpg"
            previous-src="/img/material.png"
            :snap="true"/>
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
            console.log('base');
        }
    }
</script>

<style scoped>

</style>