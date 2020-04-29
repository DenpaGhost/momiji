import Preview from "~/src/pages/Preview.vue";
import SwipeableBoxPreview from "~/src/pages/SwipeableBoxPreview.vue";
import FullscreenPreview from "~/src/pages/FullscreenPreview.vue";

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
        }, {
            path: '/magnifier',
            name: 'magnifier',
            component: FullscreenPreview
        }
    ]
}