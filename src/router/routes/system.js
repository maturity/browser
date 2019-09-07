const _import = file => () => import('@/views/pages/system/' + file + '.vue').then(m => m.default || m)

const NotFound = _import('NotFound')

const system = [
  {
    path: '/notFound',
    name: 'notFound',
    component: NotFound
  }
]

export default system
