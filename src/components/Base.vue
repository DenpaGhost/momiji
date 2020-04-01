<template>
<!--    <div class="container-fluid">-->
<!--        <div class="row">-->
<!--            <div class="col-12">-->
<!--                <h3>Momiji</h3>-->
<!--                <h3 class="mt-3">snap true</h3>-->
<!--                <momiji :snap="true">-->
<!--                    <img src="img/windows-xp-bliss-4k-lu.jpg" class="img-fluid">-->
<!--                </momiji>-->

<!--                <h3 class="mt-3">snap false</h3>-->
<!--                <momiji :snap="false">-->
<!--                    <img src="img/windows-xp-bliss-4k-lu.jpg" class="img-fluid">-->
<!--                </momiji>-->

<!--                -->

<!--            </div>-->
<!--        </div>-->
<!--    </div>-->

    <momiji-switcher/>
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