import Preview from "~/src/pages/Preview.vue";
import SwipeableBoxPreview from "~/src/pages/SwipeableBoxPreview.vue";
import FullscreenPreview from "~/src/pages/FullscreenPreview.vue";
import MomijiPreview from "~/src/pages/MomijiPreview.vue";

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
        },
        {
            path: '/full',
            name: 'fullscreen',
            component: FullscreenPreview
        }, {
            path: '/momiji',
            name: 'momiji',
            component: MomijiPreview
        }
    ]
}