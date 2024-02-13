import { createApp } from 'vue';
import App from './App.vue';
import { autoAnimatePlugin } from '@formkit/auto-animate/vue';
import 'bootstrap';

const app = createApp(App);

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import { faSquare, faSquareCheck } from '@fortawesome/free-regular-svg-icons';
import { faPen, faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';

library.add(faSquare, faSquareCheck, faPen, faChevronRight, faChevronLeft); // regular

app.component('font-awesome-icon', FontAwesomeIcon);

app.use(autoAnimatePlugin);

app.mount('#app');
