import homeQuestion from '@/components/home/homeQuestion'
export default [
  {
    path: '/home/homeQuestion',
    name: 'homeQuestion',
    component: homeQuestion,
    meta: {
      definition: '搜索详单',
      level: 1,
      requiresAuth: true
    }
  }
]
