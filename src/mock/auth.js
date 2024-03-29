import Mock from 'mockjs'
import config from '@/config'
import { register, login, logout, fetchUser, passwordEmail, passwordReset } from './api/auth'

// 后端的请求地址
const { baseURL } = config.axios

Mock.mock(baseURL + '/auth/customer/register', 'post', register)
Mock.mock(baseURL + '/auth/customer/login', 'post', login)
Mock.mock(baseURL + '/auth/customer/logout', 'get', logout)
Mock.mock(baseURL + '/auth/customer/fetchUser', 'get', fetchUser)
Mock.mock(baseURL + '/auth/customer/password/email', 'post', passwordEmail)
Mock.mock(baseURL + '/auth/customer/password/reset', 'post', passwordReset)
