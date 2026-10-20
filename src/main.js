import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createRouter, createWebHashHistory } from 'vue-router';
import App from './App.vue';
import Dashboard from './views/Dashboard.vue';
import Shipments from './views/Shipments.vue';
import Analytics from './views/Analytics.vue';
import Settings from './views/Settings.vue';
import './style.css';
const router = createRouter({ history: createWebHashHistory(), routes: [
 { path: '/', component: Dashboard, meta: { title: 'Overview' } },
 { path: '/shipments', component: Shipments, meta: { title: 'Shipments' } },
 { path: '/analytics', component: Analytics, meta: { title: 'Analytics' } },
 { path: '/settings', component: Settings, meta: { title: 'Settings' } },
 { path: '/:pathMatch(.*)*', redirect: '/' }
] });
router.afterEach(to => { document.title = `${to.meta.title} · Dispatch`; });
createApp(App).use(createPinia()).use(router).mount('#app');
