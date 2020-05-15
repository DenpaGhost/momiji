import 'bootstrap';
import '~/resource/style/app.scss';

import Vue from "vue";
import VueRouter from 'vue-router';
import route from "~/src/routes/route";

Vue.use(VueRouter);

const router = new VueRouter(route);

const app = new Vue({
    router,
    el: '#app',
    template: '<router-view></router-view>'
});