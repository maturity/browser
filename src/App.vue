<template>
  <div id="app" :class="wrapClasses">
    <component v-if="layout" :is="layout"/>
  </div>
</template>

<script>
// 获取所有的布局
const requireContext = require.context('@/views/layouts', false, /.*\.vue$/)
const layouts = requireContext.keys()
  .map(file =>
    [file.replace(/(^.\/)|(\.vue$)/g, ''), requireContext(file)]
  )
  .reduce((components, [name, component]) => {
    components[name] = component.default || component
    return components
  }, {})

const prefixCls = 'f-app'

export default {
  el: '#app',

  name: 'App',

  data: () => ({
    layout: null,
    defaultLayout: 'DefaultLayout'
  }),
  metaInfo () {
    return {
      title: this.$config.app.name,
      titleTemplate: `%s · ${this.$config.app.name}`
    }
  },
  methods: {
    setLayout (layout) {
      // 如果布局已经设置了，且没有传设置的布局，则用上一个布局
      if (this.layout && !layout) {
        return
      }

      //
      if (!layout || !layouts[layout]) {
        layout = this.defaultLayout
      }

      this.layout = layouts[layout]
    }
  },
  computed: {
    wrapClasses () {
      return `${prefixCls}`
    }
  }

}
</script>
