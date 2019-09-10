import Mock from 'mockjs'
import config from '@/config'
import { register, login, logout, fetchUser, passwordEmail, passwordReset } from './api/auth'

// 后端的请求地址
const { baseURL } = config.axios

Mock.mock(baseURL + '/auth/admin/register', 'post', register)
Mock.mock(baseURL + '/auth/admin/login', 'post', login)
Mock.mock(baseURL + '/auth/admin/logout', 'get', logout)
Mock.mock(baseURL + '/auth/admin/fetchUser', 'get', fetchUser)
Mock.mock(baseURL + '/auth/admin/password/email', 'post', passwordEmail)
Mock.mock(baseURL + '/auth/admin/password/reset', 'post', passwordReset)
