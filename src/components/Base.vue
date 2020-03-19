<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-12">
                <h3>Momiji</h3>
                <momiji>
                    <img src="img/windows-xp-bliss-4k-lu.jpg" class="img-fluid">
                </momiji>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import Momiji from "./Momiji.vue";

    @Component({
        components: {Momiji: Momiji}
    })
    export default class Base extends Vue {
        mounted() {
        }
    }
</script>

<style scoped>

</style>