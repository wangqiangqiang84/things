import Detail from '@/components/device/detail/DeviceDetail'
import CreateDevice from '@/components/device/create/createDevice'
import DataFlow from '@/components//device/detail/DeviceData/DataFlow'
import Authorization from '@/components/device/detail/authorizaiton/overview'
import Configuration from '@/components/device/detail/configuration/overview'
export default [
  {
    path: '/device/detail',
    name: 'device',
    component: Detail,
    meta: {
      definition: '设备详情',
      godfather: '设备管理',
      level: 1,
      requiresAuth: true
    }
  },
  {
    path: '/device/create',
    name: 'create',
    component: CreateDevice,
    meta: {
      definition: '设备创建',
      godfather: '设备管理',
      level: 1,
      requiresAuth: true
    }
  },
  {
    path: '/device/detail/DeviceData/DataFlow',
    name: 'DataFlow',
    component: DataFlow,
    meta: {
      definition: '设备数据流',
      godfather: '设备管理',
      leader: {
        path: '/device/detail',
        meta: {
          definition: '设备详情'
        }
      },
      level: 2,
      requiresAuth: true
    }
  },
  {
    path: '/device/detail/authorizaiton/overview',
    name: 'authorizaiton',
    component: Authorization,
    meta: {
      definition: '账户授权',
      godfather: '设备管理',
      leader: {
        path: '/device/detail',
        meta: {
          definition: '设备详情'
        }
      },
      level: 2,
      requiresAuth: true
    }
  },
  {
    path: '/device/detail/configuration/overview',
    name: 'configuration',
    component: Configuration,
    meta: {
      definition: '云端配置',
      godfather: '设备管理',
      leader: {
        path: '/device/detail',
        meta: {
          definition: '设备详情'
        }
      },
      level: 2,
      requiresAuth: true
    }
  }
]
