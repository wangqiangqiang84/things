import GatewayDetail from '@/components/gateway/GatewayDeta/GatewayDetail'
import CreateGateway from '@/components/gateway/CreateGateway/Conent'
import EssentialInformation from '@/components/gateway/CheckGatewayPlatedetail/EssentialInformation'
import DataTelemetry from '@/components/gateway/GatewayDeta/DataTelemetry'
import TelemetryResults from '@/components/gateway/GatewayDeta/TelemetryResult/TelemetryResults'
import createDevice from '@/components/device/create/createDevice'
import overview from '@/components/device/detail/authorizaiton/overview'
export default [
  {
    path: '/gateway/GatewayDeta/GatewayDetail',
    name: 'gatewaydetail',
    component: GatewayDetail,
    meta: {
      definition: '网关详情',
      godfather: '网关管理',
      level: 1,
      requiresAuth: true
    }
  },
  {
    path: '/gateway/CreateGateway/Conent',
    name: 'CreateGateway',
    component: CreateGateway,
    meta: {
      definition: '网关创建',
      godfather: '网关管理',
      level: 1,
      requiresAuth: true
    }
  },
  {
    path: '/gateway/CheckGatewayPlatedetail/EssentialInformation',
    name: 'EssentialInformation',
    component: EssentialInformation,
    meta: {
      definition: '模板详情',
      godfather: '网关管理',
      leader: {
        path: '/gateway/GatewayDeta/GatewayDetail',
        meta: {
          definition: '网关详情'
        }
      },
      level: 2,
      requiresAuth: true
    }
  },
  {
    path: '/gateway/GatewayDeta/DataTelemetry',
    name: 'DataTelemetry',
    component: DataTelemetry,
    meta: {
      definition: '数据遥测',
      godfather: '网关管理',
      leader: {
        path: '/gateway/GatewayDeta/DataTelemetry',
        meta: {
          definition: '网关数据'
        }
      },
      level: 2,
      requiresAuth: true
    }
  },
  {
    path: '/device/create/createDevice',
    name: 'createDevice',
    component: createDevice,
    meta: {
      definition: '增加设备',
      godfather: '网关管理',
      leader: {
        path: '/device/create/createDevice',
        meta: {
          definition: '增加设备'
        }
      },
      level: 2,
      requiresAuth: true
    }
  },
  {
    path: '/device/detail/authorizaiton/overview',
    name: 'overview',
    component: overview,
    meta: {
      definition: '账户授权',
      godfather: '网关管理',
      leader: {
        path: '/device/detail/authorizaiton/overview',
        meta: {
          definition: '账户授权'
        }
      },
      level: 2,
      requiresAuth: true
    }
  },
  {
    path: '/gateway/GatewayDeta/TelemetryResult/TelemetryResults',
    name: 'TelemetryResults',
    component: TelemetryResults,
    meta: {
      definition: '结果',
      godfather: '网关管理',
      leader: {
        path: '/gateway/GatewayDeta/TelemetryResult/TelemetryResults',
        meta: {
          definition: '网关数据'
        }
      },
      father: {
        path: '/gateway/GatewayDeta/DataTelemetry',
        meta: {
          definition: '数据遥测'
        }
      },
      level: 3,
      requiresAuth: true
    }
  }
]
