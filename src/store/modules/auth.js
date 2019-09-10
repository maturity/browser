import Cookies from 'js-cookie'
import Auth from '@/api/auth'

export const state = {
  admin: null,
  token: Cookies.get('token') ? Cookies.get('token') : null,
  check: false
}

export const getters = {
  admin: state => state.admin,
  token: state => state.token,
  check: state => state.admin !== null
}

export const mutations = {
  SAVE_TOKEN (state, { token, expiresIn, remember }) {
    if (remember) {
      // token在客户端的过期时间比服务器早一天，防止客户在登录使用的时候，token过期
      let expires = new Date(new Date().getTime() + (expiresIn - 86400) * 1000)
      Cookies.set('token', token, { expires: expires })
    } else {
      Cookies.set('token', token)
    }
  },

  LOGIN (state, { admin, token }) {
    state.admin = admin
    state.token = token
  },

  LOGOUT (state) {
    state.admin = null
    state.token = null
    Cookies.remove('token')
  }
}

export const actions = {

  async register ({ commit }, params) {
    const data = await Auth.register(params)
    const { admin, tokenType, accessToken, expiresIn } = data.data

    let token = tokenType + ' ' + accessToken
    let remember = false

    commit('LOGIN', { admin: admin, token: token })
    commit('SAVE_TOKEN', { token: token, expiresIn: expiresIn, remember: remember })

    return data
  },

  async login ({ commit }, params) {
    const data = await Auth.login(params)
    const { admin, tokenType, accessToken, expiresIn } = data.data

    let token = tokenType + ' ' + accessToken
    let remember = params.remember

    commit('LOGIN', { admin: admin, token: token })
    commit('SAVE_TOKEN', { token: token, expiresIn: expiresIn, remember: remember })

    return data
  },
  async logout ({ commit }) {
    await Auth.logout()
    commit('LOGOUT')
  },
  async fetchUser ({ commit, state }) {
    try {
      const data = await Auth.fetchUser()
      const { admin } = data.data
      commit('LOGIN', { admin: admin, token: state.token })
    } catch (e) {
      commit('LOGOUT')
    }
  },
  async passwordEmail (context, params) {
    return Auth.passwordEmail(params)
  },
  async passwordReset (context, params) {
    return Auth.passwordReset(params)
  }
}
