<template>
    <div class="container">
        <div class="row">
            <div class="col-12">
                <momiji>
                    <img src="/img/material.png" class="img-fluid">
                </momiji>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import Momiji from "~/src/components/Momiji.vue";

    @Component({
        components: {Momiji}
    })
    export default class Preview extends Vue {

    }
</script>

<style scoped>

</style>