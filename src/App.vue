<template>
  <div id="app">
  	<navigation :routes="navigatorRoutes" ></navigation>
  	<div id="navigation-out"></div>
  	<div id="main-left"></div>
  	<div id="main" role="main">
  		<nand-header :paths="breadcrumb"></nand-header>
      <contents :paths="breadcrumb"></contents>
  	</div>
    <div id="main-right"></div>
  </div>
</template>
<style>
  @import "./assets/css/bootstrap.min.css";
  @import "./assets/css/smartadmin-production.min.css";
  @import "./assets/css/smartadmin-skins.min.css";
  @import "./assets/css/buttons.css";
  @import "./assets/css/main.css";
  @import "./assets/css/dialog.class.css";

</style>
<script>
  /*eslint-disable */
  import '@/assets/js/libs/jquery-ui-1.10.3.min'
  /*JS TOUCH : include this plugin for mobile drag / drop touch events*/
  import '@/assets/js/plugin/jquery-touch/jquery.ui.touch-punch.min'
  /*BOOTSTRAP JS*/
  import '@/assets/js/bootstrap/bootstrap.min'
  import '@/assets/js/smartwidgets/jarvis.widget.min'
  /*eslint-enable */
  import Navigation from '@/components/Navigation.vue'
  import Contents from '@/components/Contents.vue'
  import NandHeader from '@/components/NandHeader.vue'

  export default {
    components: {
      NandHeader,
      Contents,
      Navigation
    },
    name: 'app',
    data: function () {
      return {
        navigatorRoutes: [
          {
            path: '/device/overview',
            name: '设备管理',
            alias: '设备',
            isActive: false,
            icon: 'fa fa-laptop',
            color: '',
            meta: {
              definition: '设备管理',
              level: 0,
              requiresAuth: true
            }
          },
          {
            path: '/data/overview',
            name: '数据管理',
            alias: '数据',
            isActive: false,
            icon: 'fa fa-pie-chart',
            color: '',
            meta: {
              definition: '数据管理',
              level: 0,
              requiresAuth: true
            }
          },
          {
            path: '/settings/overview',
            name: '个人设置',
            alias: '个人',
            isActive: false,
            icon: 'fa fa-cog',
            color: '',
            meta: {
              definition: '个人设置',
              level: 0,
              requiresAuth: true
            }
          }
        ],
        selectedNavigator: {},
        breadcrumb: []
      }
    },
    watch: {
      'selectedNavigator': function (newValue, oldValue) {
        this.breadcrumbFunction(newValue)
      },
      '$route' (to) {
        this.switchByPath(to.path)
        if (this.$route.meta.level !== '') {
          this.breadcrumb.splice(this.$route.meta.level)
          this.breadcrumb[this.$route.meta.level] = this.$route
        }
      }
    },
    mounted () {
      let index = this.navigatorRoutes.findIndex( (n) => n.name === this.$route.meta.godfather )
      if (index !== -1) {
        let lev = this.$route.meta.level
        this.breadcrumb.unshift(this.navigatorRoutes[index])
        if (lev === 1) {
          this.breadcrumb.push(this.$route)
        } else if (lev === 2) {
          this.breadcrumb.push(this.$route.meta.leader)
          this.breadcrumb.push(this.$route)
        } else if (lev === 3) {
          this.breadcrumb.push(this.$route.meta.leader)
          this.breadcrumb.push(this.$route.meta.father)
          this.breadcrumb.push(this.$route)
        }
      } else {
        this.breadcrumb = []
      }
    },
    methods: {
      switchNavigetin: function (e) {
        for (var i = 0; i < this.$data.navigatorRoutes.length; i++) {
          var nav = this.$data.navigatorRoutes[i]
          nav.isActive = false
          nav.color = ''
          this.$set(this.$data.navigatorRoutes, i, nav)
          if (e === this.$data.navigatorRoutes[i]) {
            nav.isActive = true
            nav.color = 'txt-color-redYellow'
            this.$set(this.$data.navigatorRoutes, i, nav)
            this.$data.selectedNavigator = nav
          }
        }
      },
      breadcrumbFunction: function (e) {
        this.$data.breadcrumb = []
        this.$set(this.$data.breadcrumb, 0, this.$route)
      },
      getRoute: function (path) {
        for (var i = 0; i < this.$data.navigatorRoutes.length; i++) {
          if (this.$data.navigatorRoutes[i].path === path) {
            return this.$data.navigatorRoutes[i]
          }
        }
      },
      switchByPath: function (path) {
        var obj = this.getRoute(path)
        if (undefined !== obj) {
          this.switchNavigetin(obj)
        }
      }
    }
  }
</script>
