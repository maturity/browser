import axios from 'axios'

/**
 * ==========================
 * 所有有关请求用户鉴权 API 的方法
 * ==========================
 */
export default {
  register: (params) => {
    return axios.post('auth/admin/register', params)
  },
  login: (params) => {
    return axios.post('auth/admin/login', params)
  },
  logout: () => {
    return axios.get('auth/admin/logout')
  },
  fetchUser: () => {
    return axios.get('auth/admin/fetchUser')
  },
  passwordEmail: (params) => {
    return axios.post('auth/admin/password/email', params)
  },
  passwordReset: (params) => {
    return axios.post('auth/admin/password/reset', params)
  }
}
