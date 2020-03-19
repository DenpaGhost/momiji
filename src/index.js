import 'bootstrap';
import '~/resource/style/app.scss';

import Vue from "vue";
import Base from "~/src/components/Base";

Vue.component('v-base', Base);

new Vue({
    el: '#app',
    template: '<v-base/>'
});