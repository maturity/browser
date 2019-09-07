import axios from 'axios'
import Vue from 'vue'
import store from '@/store'
import router from '@/router'
import i18n from '@/lang'
import config from '@/config'

const { baseURL, timeout } = config.axios

axios.defaults.baseURL = baseURL
axios.defaults.timeout = timeout

axios.interceptors.request.use(request => {
  const token = store.getters['auth/token']
  if (token) {
    request.headers.common['Authorization'] = `${token}`
  }

  const locale = store.getters['lang/locale']
  if (locale) {
    request.headers.common['Accept-Language'] = locale
  }

  // request.headers['X-Socket-Id'] = Echo.socketId()

  return request
}, error => {
  Vue.prototype.$Message.error({
    content: i18n.t('error.clientError'),
    duration: 3,
    closable: true
  })
  return Promise.reject(error)
})

axios.interceptors.response.use(response => response.data, error => {
  let message = i18n.t('error.message')

  if (typeof error.response === 'undefined') {
    if (error.message.includes('timeout')) {
      message = i18n.t('error.timeout')
    } else {
      message = i18n.t('error.econnaborted')
    }
  } else {
    const { status } = error.response
    switch (status) {
      case 500:
        message = i18n.t('error.serviceError500')
        break
      case 401:
        message = error.response.data.message
        if (store.getters['auth/check']) {
          // 这种情况只存在于理论中，除非客户登录之后，不刷新页面浏览网站到服务器token过期。
          store.commit('auth/LOGOUT')
          message = error.egg
        }
        router.push({ name: 'login' })
        break
      default:
        if (error.response.data.message) {
          message = error.response.data.message
        }
    }
  }

  Vue.prototype.$Message.error({
    content: message,
    duration: 6,
    closable: true
  })

  return Promise.reject(error)
})
