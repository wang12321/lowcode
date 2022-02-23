import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control
import * as filters from './filters' // global filters
import JsonViewer from 'vue-json-viewer'
Vue.use(JsonViewer)
import AvueFormDesign from '@sscfaith/avue-form-design'
import Avue from '@smallwei/avue'
import '@smallwei/avue/lib/index.css'
Vue.use(Avue)

Vue.use(AvueFormDesign)

// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
Vue.use(ElementUI)

// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

// 引入 vue-ele-component-zonst css
import 'vue-ele-component-zonst/lib/index/style/index.css'
// 全部引入 vue-ele-component-zonst js
import VueEleComponentZonst from 'vue-ele-component-zonst'
// 在ElementUI后调用
import VueDND from 'awe-dnd' // 列表拖拽

Vue.use(ElementUI).use(VueEleComponentZonst).use(VueDND)
import draggable from 'vuedraggable'
Vue.component('draggable', draggable)
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

