import * as types from './mutation-types'
export default {
  [types.DEVICE_CLICK] (state, {device}) {
    state.selectedDevice = device
  },
  [types.CREATE_DEVICE_CLICK] (state) {
    state.isShowDeviceCreate = !state.isShowDeviceCreate
  }
}
