<template>
    <div>
        <p>Hello, world!</p>
        <p>{{example}}</p>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";

    @Component
    export default class Example extends Vue {
        get example(): string {
            return "Hello world!"
        }
    }
</script>

<style scoped>

</style>