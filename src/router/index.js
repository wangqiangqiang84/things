import Vue from 'vue'
import Router from 'vue-router'
import GateWay from '@/components/gateway/Overview'
import Device from '@/components/device/Overview'
import Data from '@/components/data/Overview'
import Settings from '@/components/settings/Overview'
import switchAccount from '@/components/switchAccount/Overview'
import Home from '@/components/home/Overview'
import GateWayRoute from './gateway'
import DeviceRoute from './device'
import DataRoute from './data'
import SettingsRoute from './settings'
import SwitchAccountRoute from './switchAccount'
import HomeRoute from './home'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: '/',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        definition: '退出登录',
        godfather: '退出登录',
        level: '',
        requiresAuth: true
      }
    },
    {
      path: '/gateway/Overview',
      name: 'gateway',
      component: GateWay,
      meta: {
        definition: '网关管理',
        godfather: '网关管理',
        level: 0,
        requiresAuth: false
      }
    },
    {
      path: '/device/Overview',
      name: 'device',
      component: Device,
      meta: {
        definition: '设备管理',
        godfather: '设备管理',
        level: 0,
        requiresAuth: true
      }
    },
    {
      path: '/data/Overview',
      name: 'data',
      component: Data,
      meta: {
        definition: '数据管理',
        godfather: '数据管理',
        level: 0,
        requiresAuth: true
      }
    },
    {
      path: '/settings/Overview',
      name: 'settings',
      component: Settings,
      meta: {
        definition: '个人设置',
        godfather: '个人设置',
        level: 0,
        requiresAuth: true
      }
    },
    {
      path: '/switchAccount/Overview',
      name: 'SwitchAccount',
      component: switchAccount,
      meta: {
        definition: '切换账号',
        godfather: '切换账号',
        level: '',
        requiresAuth: true
      }
    },
    {
      path: '/home/Overview',
      name: 'home',
      component: Home,
      meta: {
        definition: '退出登录',
        godfather: '退出登录',
        level: '',
        requiresAuth: true
      }
    },
    ...GateWayRoute,
    ...DeviceRoute,
    ...DataRoute,
    ...SettingsRoute,
    ...SwitchAccountRoute,
    ...HomeRoute
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

