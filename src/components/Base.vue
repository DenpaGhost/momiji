<template>
    <div>test</div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";

    @Component
    export default class Base extends Vue {
        mounted() {
            console.log("base mounted");
        }
    }
</script>

<style scoped>

</style>