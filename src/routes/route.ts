import Preview from "~/src/pages/Preview.vue";
import FullscreenPreview from "~/src/pages/FullscreenPreview.vue";

export default {
    routes: [
        {
            path: '/',
            component: Preview,
            name: 'base'
        },
        {
            path: '/full',
            name: 'fullscreen',
            component: FullscreenPreview
        },
    ]
}