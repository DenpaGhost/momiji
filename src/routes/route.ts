import Base from "~/src/components/Base.vue";
import Gallery from "~/src/pages/Gallery.vue";
import Preview from "~/src/pages/Preview.vue";
import SwipableBoxPreview from "~/src/pages/SwipableBoxPreview.vue";

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
        },
        {
            path: '/box-preview',
            component: SwipableBoxPreview
        }
    ]
}