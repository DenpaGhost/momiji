import 'bootstrap';
import '~/resource/style/app.scss';

import Vue from "vue";
import VueRouter from 'vue-router';
import Base from "~/src/components/Base";
import route from "~/src/routes/route";

Vue.use(VueRouter);
Vue.component('v-base', Base);

const router = new VueRouter(route);

const app = new Vue({
    router,
    el: '#app',
    template: '<router-view></router-view>'
});