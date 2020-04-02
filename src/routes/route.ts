import Preview from "~/src/pages/Preview.vue";
import SwipeableBoxPreview from "~/src/pages/SwipeableBoxPreview.vue";

export default {
    routes: [
        {
            path: '/',
            component: Preview,
            name: 'base'
        },
        {
            path: '/box-preview/:index',
            name: 'box-preview',
            component: SwipeableBoxPreview
        }
    ]
}