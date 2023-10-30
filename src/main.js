import { createApp } from 'vue'
import PrimeVue from "primevue/config";
import "primevue/resources/primevue.min.css"; /* Deprecated */
import './style.css'

import App from './App.vue'
import router from './router'
// import primevuestyle from './primevuestyle';
import Tailwind from "primevue/passthrough/tailwind"

 
            // optional
createApp(App)
    .use(router)
    
    .use(PrimeVue, { ripple: true , unstyled: true, pt: Tailwind, ptOptions: { mergeProps: true } })
    .mount('#app')
