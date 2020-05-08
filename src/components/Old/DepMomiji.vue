<template>
    <momiji-switcher>
        <template v-slot:previous>
            <slot name="previous"/>
        </template>

        <template v-slot:focus>
            <momiji-magnifier class="momiji-hw-100" @zoombegin="" @zoomend="">
                <slot name="focus"/>
            </momiji-magnifier>
        </template>

        <template v-slot:next>
            <slot name="next"/>
        </template>
    </momiji-switcher>
</template>

<script>
    import MomijiSwitcher from "@/src/components/Old/DepMomijiSwitcher";
    import MomijiMagnifier from "@/src/components/Old/DepMomijiMagnifier";

    export default {
        name: "Momiji",
        components: {MomijiMagnifier, MomijiSwitcher}
    }
</script>

<style scoped>
    .momiji-hw-100 {
        width: 100%;
        height: 100%;
    }
</style>