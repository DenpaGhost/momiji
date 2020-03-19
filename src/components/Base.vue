<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-12">
                <h3>Momiji</h3>
                <momiji-img src="img/windows-xp-bliss-4k-lu.jpg"/>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import MomijiImg from "./MomijiImg.vue";

    @Component({
        components: {MomijiImg}
    })
    export default class Base extends Vue {
        mounted() {
            console.log("base mounted");
        }
    }
</script>

<style scoped>

</style>