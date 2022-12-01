import { createApp } from 'vue';
import App from './App.vue';

import 'bootstrap';

const app = createApp(App);

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import { faSquare, faSquareCheck } from '@fortawesome/free-regular-svg-icons';

library.add(faSquare, faSquareCheck); // regular

app.component('font-awesome-icon', FontAwesomeIcon);

app.mount('#app');
