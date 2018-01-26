import DataDetails from '@/components/data/detail/DataDetails'
export default [
  {
    path: '/data/detail/DataDetails',
    name: 'DataDetails',
    component: DataDetails,
    meta: {
      definition: '数据详情',
      godfather: '数据管理',
      level: 1,
      requiresAuth: true
    }
  }
]
