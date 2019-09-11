const _import = file => () => import('@/views/pages/auth/' + file + '.vue').then(m => m.default || m)

const Register = _import('Register')
const Login = _import('Login')
const Auth = _import('Auth')
const PasswordEmail = _import('password/PasswordEmail')
const PasswordReset = _import('password/PasswordReset')

const auth = [{
  path: '/auth',
  component: Auth,
  meta: {
    middleware: 'guest',
    layout: 'AuthLayout',
    locale: 'auth'
  },
  redirect: '/auth/login',
  children: [
    { path: 'register', name: 'register', component: Register },
    { path: 'login', name: 'login', component: Login },
    { path: 'password/email', name: 'passwordEmail', component: PasswordEmail },
    { path: 'password/reset/:token', name: 'passwordReset', component: PasswordReset }
  ]
}]

export default auth
