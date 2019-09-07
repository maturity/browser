import _ from 'lodash'
import Vue from 'vue'
import Router from 'vue-router'
import Meta from 'vue-meta'
import iView from 'iview'
import { sync } from 'vuex-router-sync'
import store from '@/store'

Vue.use(Router)
Vue.use(Meta)

// 导入所有路由
const requireContext = require.context('./routes', false, /.*\.js$/)
const routes = requireContext.keys()
  .map(file => requireContext(file))
  .reduce((modules, module) => {
    modules = _.concat(modules, (module.default || module))
    return modules
  }, [])
const notFound = { path: '*', component: () => import('@/views/pages/system/NotFound.vue').then(m => m.default || m) }
routes.push(notFound)

// 全局中间件
const globalMiddleware = ['check-auth', 'locale']
// 所有的中间件
const routeMiddleware = resolveMiddleware(
  require.context('@/middleware', false, /.*\.js$/)
)

const router = createRouter()

sync(store, router)

export default router

/**
 * 创建路由实例
 */
function createRouter () {
  const router = new Router({
    scrollBehavior,
    mode: 'history',
    routes
  })

  router.beforeEach(beforeEach)
  router.afterEach(afterEach)

  return router
}

/**
 * Global router guard.
 *
 * @param {Route} to
 * @param {Route} from
 * @param {Function} next
 */
async function beforeEach (to, from, next) {
  // 得到路由所有匹配的组件
  const components = await resolveComponents(
    router.getMatchedComponents({ ...to })
  )
  // 路由不存在匹配的组件，404 not fond
  if (components.length === 0) {
    return next()
  }

  // 开始加载进度条
  iView.LoadingBar.start()
  // if (components[components.length - 1].Loading !== false) {
  //   router.app.$nextTick(() => router.app.$Loading.start())
  // }

  // 得到路由的所有中间建
  const middleware = getMiddleware(to)
  const layout = getlayout(to)

  // 执行中间建
  callMiddleware(middleware, to, from, (...args) => {
    // 没有参数说明中间建全部正常执行,设置页面布局。
    if (args.length === 0) {
      router.app.setLayout(layout)
    }

    next(...args)
  })
}

/**
 * Global after hook.
 *
 * @param {Route} to
 * @param {Route} from
 * @param {Function} next
 */
async function afterEach () {
  iView.LoadingBar.finish()
}

/**
 * Call each middleware.
 *
 * @param {Array} middleware
 * @param {Route} to
 * @param {Route} from
 * @param {Function} next
 */
function callMiddleware (middleware, to, from, next) {
  const stack = middleware.reverse()

  const _next = (...args) => {
    // 有参数说明中间建，未执行完就终止了，或者中间建全部执行完退出
    if (args.length > 0 || stack.length === 0) {
      if (args.length > 0) {
        iView.LoadingBar.finish()
      }
      return next(...args)
    }

    const middleware = stack.pop()

    if (typeof middleware === 'function') {
      middleware(to, from, _next)
    } else if (routeMiddleware[middleware]) {
      routeMiddleware[middleware](to, from, _next)
    } else {
      throw Error(`Undefined middleware [${middleware}]`)
    }
  }

  _next()
}

/**
 * Resolve async components.
 *
 * @param  {Array} components
 * @return {Array}
 */
function resolveComponents (components) {
  return Promise.all(components.map(component => {
    return typeof component === 'function' ? component() : component
  }))
}

/**
 * Merge the the global middleware with the components middleware.
 *
 * @param  {Array} components
 * @return {Array}
 */
function getMiddleware (to) {
  // 得到链接匹配的所有路由
  let components = to.matched

  const middleware = [...globalMiddleware]
  components.filter(c => c.meta.middleware).forEach(m => {
    if (Array.isArray(m.meta.middleware)) {
      middleware.push(...m.meta.middleware)
    } else {
      middleware.push(m.meta.middleware)
    }
  })

  return middleware
}

function getlayout (to) {
  // 得到链接匹配的所有路由，取最后一个设置的布局
  let components = to.matched.filter(c => c.meta.layout)

  if (components.length === 0) {
    return ''
  }

  let layout = components[components.length - 1]

  return layout.meta.layout
}

/**
 * Scroll Behavior
 *
 * @link https://router.vuejs.org/en/advanced/scroll-behavior.html
 *
 * @param  {Route} to
 * @param  {Route} from
 * @param  {Object|undefined} savedPosition
 * @return {Object}
 */
function scrollBehavior (to, from, savedPosition) {
  if (savedPosition) {
    return savedPosition
  }

  if (to.hash) {
    return { selector: to.hash }
  }

  const [component] = router.getMatchedComponents({ ...to }).slice(-1)

  if (component && component.scrollToTop === false) {
    return {}
  }

  return { x: 0, y: 0 }
}

/**
 * @param  {Object} requireContext
 * @return {Object}
 */
function resolveMiddleware (requireContext) {
  return requireContext.keys()
    .map(file =>
      [file.replace(/(^.\/)|(\.js$)/g, ''), requireContext(file)]
    )
    .reduce((guards, [name, guard]) => (
      { ...guards, [name]: guard.default }
    ), {})
}
