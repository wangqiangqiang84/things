import router from '@/router'
import * as types from './mutation-types'
export const deviceClick = ({ commit, state }, device) => {
  commit(types.DEVICE_CLICK, {device})
  router.push('/device/detail')
}
export const createDeviceClick = ({commit}) => {
  commit(types.CREATE_DEVICE_CLICK)
}
