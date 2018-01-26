import * as actions from './actions'
import mutations from './mutations'
import * as getters from './getters'
const state = {
  deivces: [],
  selectedDevice: '',
  createDeviceName: '',
  createDeviceCode: '',
  createDeviceLocation: '',
  createDevicePhonenumber: '',
  createDeviceGatewayID: '',
  createDeviceManufacturerName: '',
  createDeviceHardwareModel: '',
  createDeviceFirmwareVersion: '',
  createDeviceNameDetectionResult: '',
  createDeviceCodeDetectionResult: '',
  createDeviceLocationDetectionResult: '',
  createDevicePhonenumberDetectionResult: '',
  allDetectionInformation: '',
  perpage: 0,
  isResetSortDevice: false,
  deviceName: '',
  dataType: '',
  dateTime: '',
  dataTypeValue: '',
  dateTimeValue: ''
}
export default {
  state,
  getters,
  actions,
  mutations
}
