const _import = file => () => import('@/views/pages/index/' + file + '.vue').then(m => m.default || m)

const Index = _import('Index')

const index = [
  {
    path: '/',
    name: 'index',
    meta: {
      layout: 'IndexLayout',
      locale: 'index'
    },
    redirect: '/auth/login',
    component: Index
  }
]

export default index
