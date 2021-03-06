import Vue from 'vue'
import Vuetify from 'vuetify'
import VConfirmDialog from 'vuetify-confirm-dialog'
import 'vuetify/dist/vuetify.css'
import '@fortawesome/fontawesome-free/css/all.css'

import App from './App'
import router from './router'
import store from './store'

import './db'

Vue.use(Vuetify, {
  iconfont: 'fa',
})
Vue.use(VConfirmDialog)
if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>',
}).$mount('#app')
