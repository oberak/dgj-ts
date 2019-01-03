import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: require('@/components/DashboardPage').default,
    },
    {
      path: '/settings',
      name: 'Settings',
      component: require('@/components/SettingsPage').default,
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
});
