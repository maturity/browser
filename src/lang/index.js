import Vue from 'vue'
import VueI18n from 'vue-i18n'
import store from '@/store'
import enIview from 'iview/dist/locale/en-US'
import zhIview from 'iview/dist/locale/zh-CN'
import enCommon from '@/lang/common/en-US'
import zhCommon from '@/lang/common/zh-CN'

Vue.use(VueI18n)
Vue.locale = () => {
}

const messages = {
  'en-US': Object.assign(enCommon, enIview),
  'zh-CN': Object.assign(zhCommon, zhIview)
}

const i18n = new VueI18n({
  locale: store.getters['lang/locale'],
  messages: messages
})

export default i18n

// 加载语言包信息
// export async function loadMessages(){
//   let locale = store.getters['lang/locale']
//   if (i18n.locale !== locale) {
//     i18n.locale = locale
//   }
// }

// 加载公共的语言包,初始化加载
// export async function loadCommonMessages(locale) {
//   if (Object.keys(i18n.getLocaleMessage(locale)).length === 0) {
//     await Promise.all([
//       import(`iview/dist/locale/${locale}`),
//       import(`@/lang/common/${locale}`)
//     ]).then(([iview, common]) => {
//       let iviewMessages = iview.default
//       let commonMessages = common.default
//       i18n.setLocaleMessage(locale, {...iviewMessages, ...commonMessages})
//     })
//   }
// }

// 加载页面语言包，按路由加载,按路由分层次加载语言包
export async function loadPageMessages (locale, route) {
  let routes = route.matched.filter(c => c.meta.locale)
  let localePath = ''
  let localeNamespace = []
  for (let i in routes) {
    let route = routes[i]
    localePath = localePath + '/' + route.meta.locale
    localeNamespace.push(route.meta.locale)
    let loadedMessage = localeNamespace.reduce((messages, name) => {
      if (typeof messages[name] === 'undefined') {
        return {}
      }
      return messages[name]
    }, i18n.getLocaleMessage(locale))

    if (Object.keys(loadedMessage).length === 0) {
      let pageMessage = await import(`@/lang/page${localePath}/${locale}`).then(m => m.default || m)
      i18n.mergeLocaleMessage(locale, pageMessage)
    }
  }
}

// (async function () {
//   await loadCommonMessages(store.getters['lang/locale'])
// })()
