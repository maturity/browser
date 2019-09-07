import config from '@/config'

const { locale, locales } = config.app

/**
 * 根据据浏览器的语言，来选择系统支持的语言
 */
function getBrowserLanguage () {
  let lang = navigator.language
  lang = lang.substr(0, 2)
  // 所有的英语国家，默认成美式英语
  if (lang === 'en') {
    return 'en-US'
  }
  // 所有的中文国家，默认成汉语简体
  if (lang === 'zh') {
    return 'zh-CN'
  }

  return locale
}

export const state = {
  locale: localStorage.getItem('locale') || getBrowserLanguage(),
  locales: locales
}

export const getters = {
  locale: state => state.locale,
  locales: state => state.locales
}

export const mutations = {
  SET_LOCALE (state, locale) {
    state.locale = locale
    localStorage.setItem('locale', locale)
  }
}

export const actions = {
  setLocale ({ commit }, locale) {
    commit('SET_LOCALE', locale)
  }
}
