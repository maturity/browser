import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import i18n from './lang'
import config from './config'

import './plugins'
import './components'

import './assets/styles/index.less'

if (process.env.NODE_ENV !== 'production') require('@/mock')

Vue.config.productionTip = false
Vue.prototype.$config = config

window.vue = new Vue({
  store,
  router,
  i18n,
  ...App
})
