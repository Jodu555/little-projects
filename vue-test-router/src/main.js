import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'

// import "bootstrap"

const networkingPlugin = {
    install: (app, options) => {
        app.config.globalProperties.$networking = new Networking('http://localhost:3100', '');
    }
}

const app = createApp(App);
app.use(networkingPlugin)
app.use(autoAnimatePlugin);

store.$app = app;
store.$networking = app.config.globalProperties.$networking;

app.use(store).use(router).mount('#app');
