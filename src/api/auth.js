import axios from 'axios'

/**
 * ==========================
 * 所有有关请求用户鉴权 API 的方法
 * ==========================
 */
export default {
  register: (params) => {
    return axios.post('auth/customer/register', params)
  },
  login: (params) => {
    return axios.post('auth/customer/login', params)
  },
  logout: () => {
    return axios.get('auth/customer/logout')
  },
  fetchUser: () => {
    return axios.get('auth/customer/fetchUser')
  },
  passwordEmail: (params) => {
    return axios.post('auth/customer/password/email', params)
  },
  passwordReset: (params) => {
    return axios.post('auth/customer/password/reset', params)
  }
}
