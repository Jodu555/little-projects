import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

const networkingPlugin = {
    install: (app, options) => {
        app.config.globalProperties.$networking = new Networking({ API_URL: 'http://localhost:3100', auth_token: '' });
    }
}

const app = createApp(App);

store.$app = app;

app.use(networkingPlugin).use(store).use(router).mount('#app');
