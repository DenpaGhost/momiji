<template>
    <momiji-switcher
            :next-src="images[next]"
            :focus-src="images[focus]"
            :previous-src="images[previous]"
            @swipeToLeft="swipeToRight"
            @swipeToRight="swipeToRight"
    />
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import MomijiSwitcher from "../components/MomijiSwitcher.vue";

    @Component({
        components: {MomijiSwitcher}
    })
    export default class Gallery extends Vue {
        images: string[] = ['/img/windows-xp-bliss-4k-lu.jpg', '/img/material.png'];

        mounted() {
            console.log('gallery');
        }

        get next() {
            return parseInt(this.$route.params.index) == 0 ? 1 : 0;
        }

        get focus() {
            return parseInt(this.$route.params.index);
        }

        get previous() {
            return parseInt(this.$route.params.index) == 0 ? 1 : 0;
        }

        swipeToRight() {
            this.$router.push({
                name: 'gallery',
                params: {
                    index: `${this.focus == 0 ? 1 : 0}`
                }
            });
        }
    }
</script>

<style scoped>

</style>