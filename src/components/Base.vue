<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-12">
                <h3>Momiji</h3>
                <momiji>
                    <img src="img/windows-xp-bliss-4k-lu.jpg" class="img-fluid">
                </momiji>

                <momiji>
                    <div class="card">
                        <div class="card-body">
                            <h3 class="card-title font-weight-bold">Momiji</h3>
                            <h6 class="card-title">Swipeable frame</h6>
                            <p class="lead text-muted"></p>
                        </div>
                    </div>
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
            console.log("base mounted");
        }
    }
</script>

<style scoped>

</style>