const _import = file => () => import('@/views/pages/home/' + file + '.vue').then(m => m.default || m)

const Home = _import('Home')

const home = [{
  path: '/home',
  name: 'home',
  component: Home,
  meta: {
    middleware: 'auth',
    layout: 'HomeLayout'
  }
}]

export default home
