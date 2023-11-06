import { createApp } from 'vue'
import PrimeVue from "primevue/config";
import "primevue/resources/primevue.min.css"; /* Deprecated */
import './style.css'

import App from './App.vue'
import router from './router'
// import primevuestyle from './primevuestyle';
import Tailwind from "primevue/passthrough/tailwind"

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faUserSecret, faCircleQuestion } from '@fortawesome/free-solid-svg-icons'

library.add(faUserSecret)
library.add(faCircleQuestion)
            // optional
createApp(App)
    .use(router)
    .component('font-awesome-icon', FontAwesomeIcon)
    .use(PrimeVue, { pt: Tailwind })
    .mount('#app')
