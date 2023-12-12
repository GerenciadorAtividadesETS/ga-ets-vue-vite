import { createApp } from 'vue'
import PrimeVue from "primevue/config";
import Tooltip from 'primevue/tooltip';
// import VueCookie from 'vue-cookie';
import "primevue/resources/primevue.min.css"; /* Deprecated */
import './style.css'

import Breadcrumb from 'primevue/breadcrumb';

import App from './App.vue'
import router from './router'
// import primevuestyle from './primevuestyle';
import Tailwind from "primevue/passthrough/tailwind"

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faUserSecret, faCircleQuestion, faCopy } from '@fortawesome/free-solid-svg-icons'


import VueCookies from 'vue-cookies'

library.add(faUserSecret)
library.add(faCircleQuestion)
library.add(faCopy)
            // optional
createApp(App)
    .use(router)
    .component('font-awesome-icon', FontAwesomeIcon)
    .component('breadcumb', Breadcrumb)
    .directive('tooltip', Tooltip)
    .use(VueCookies, {})
    .use(PrimeVue, { pt: Tailwind })
    .mount('#app')
