<template>
    <momiji-switcher class="swipable-box"
                     @swipeToLeft="swipe"
                     @swipeToRight="swipe">
        <template v-slot:previous>
            <img :src="images[previous]"
                 alt="前の画像"
                 class="img-fluid"/>
        </template>

        <template v-slot:focus>
            <img :src="images[focus]"
                 alt="画像"
                 class="img-fluid"/>
        </template>

        <template v-slot:next>
            <img :src="images[next]"
                 alt="次の画像"
                 class="img-fluid"/>
        </template>
    </momiji-switcher>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import MomijiSwitcher from "~/src/components/MomijiSwitcher.vue";

    @Component({
        components: {MomijiSwitcher}
    })
    export default class SwipeableBoxPreview extends Vue {
        images: Array<string> = ['/img/windows-xp-bliss-4k-lu.jpg', '/img/material.png'];

        get previous(): number {
            return parseInt(this.$route.params.index) == 0 ? 1 : 0;
        }

        get focus(): number {
            return parseInt(this.$route.params.index);
        }

        get next(): number {
            return parseInt(this.$route.params.index) == 0 ? 1 : 0;
        }

        swipe() {
            this.$router.push({
                name: 'box-preview',
                params: {
                    index: `${this.focus == 0 ? 1 : 0}`
                }
            })
        }
    }
</script>

<style scoped>
    .swipable-box {
        background-color: #000000;
        height: 100vh;
        width: 100vw;
    }
</style>