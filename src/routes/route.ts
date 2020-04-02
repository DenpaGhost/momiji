import Base from "~/src/components/Base.vue";
import Gallery from "~/src/pages/Gallery.vue";
import Preview from "~/src/pages/Preview.vue";

export default {
    routes: [
        {
            path: '/',
            component: Preview,
            name: 'base'
        },
        {
            path: '/gallery/:index',
            name: 'gallery',
            component: Gallery
        },
        {
            path: '/preview',
            component: Base
        }
    ]
}