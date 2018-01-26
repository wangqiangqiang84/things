// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import VueResource from 'vue-resource'
/*eslint-disable */
import $ from 'jquery'
import iView from 'iview'
import 'jquery'
import 'iview/dist/styles/iview.css'

Vue.use(iView)
/*eslint-enable */
Vue.config.productionTip = false
/* eslint-disable no-new */
Vue.use(VueResource)
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  data: {
    fullHeight: document.documentElement.clientHeight
  },
  components: {
    App
  },
  mounted: function () {
    var navSystemHeight = $(this.$el).find('.nav-system').outerHeight(true)
    var leftPanelHeight = $(this.$el).find('#left-panel').outerHeight(true)
    $(this.$el).height(navSystemHeight + leftPanelHeight)
  },
  updated: function () {
    console.log('updated')
    var navSystemHeight = $(this.$el).find('.nav-system').outerHeight(true)
    var leftPanelHeight = $(this.$el).find('#left-panel').outerHeight(true)
    $(this.$el).height(navSystemHeight + leftPanelHeight)
  }
})
