<template>
	<div class="create-device-footer">
		<div class="btn-container">
			<span @click="hiddenCreateDeviceFn">取消注册</span>
			<span @click="submitCreateDeviceFn">确认注册</span>
		</div>
	</div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'createDeviceName',
      'createDeviceCode',
      'createDeviceLocation',
      'createDevicePhonenumber',
      'createDeviceGatewayID',
      'createDeviceManufacturerName',
      'createDeviceHardwareModel',
      'createDeviceFirmwareVersion',
      'createDeviceNameDetectionResult',
      'createDeviceCodeDetectionResult',
      'createDeviceLocationDetectionResult',
      'createDevicePhonenumberDetectionResult',
      'allDetectionInformation'
    ])
  },
  mounted () {
    this.variableInitialFn()
  },
  methods: {
    hiddenCreateDeviceFn () {
      this.variableInitialFn()
      this.$router.push({path: '/device/overview'})
    },
    submitCreateDeviceFn () {
      if (this.createDeviceName === '') {
        this.$store.state.device.createDeviceNameDetectionResult = '1~32个字符，可使用数字、英文和中文'
      }
      if (this.createDeviceCode === '') {
        this.$store.state.device.createDeviceCodeDetectionResult = '6~16个字符，可使用数字和英文'
      }
      if (this.createDeviceLocation === '') {
        this.$store.state.device.createDeviceLocationDetectionResult = '1~64个字符，可使用数字、英文和中文'
      }
      if (this.createDevicePhonenumber === '') {
        this.$store.state.device.createDevicePhonenumberDetectionResult = '1~16个字符，只可使用数字'
      }
      this.warningOrderFn()
      if (this.createDeviceCodeDetectionResult === '' && this.createDeviceGatewayID !== '') {
        this.$http.get('./../../static/device/getewayNameDataDevice.json').then(function (res) {
          if (res.data.deviceCodeDetectionResult === 1) {
            this.$store.state.device.createDeviceCodeDetectionResult = '该测站编码已被占用'
          } else if (res.data.deviceCodeDetectionResult === 0) {
            this.$store.state.device.createDeviceCodeDetectionResult = ''
          }
        })
      }
      if (this.createDeviceNameDetectionResult === '' && this.createDeviceCodeDetectionResult === '' && this.createDeviceLocationDetectionResult === '' && this.createDevicePhonenumberDetectionResult === '' && this.allDetectionInformation === '') {
        console.log('将数据向后台传送')
        this.variableInitialFn()
        this.$router.push({path: '/device/overview'})
      }
    },
    warningOrderFn: function () {
      if (this.createDeviceGatewayID === '') {
        this.$store.state.device.allDetectionInformation = '请选择所属网关、厂商名称、硬件型号和固件版本'
        return
      }
      if (this.createDeviceManufacturerName === '') {
        this.$store.state.device.allDetectionInformation = '请选择厂商名称、硬件型号和固件版本'
        return
      }
      if (this.createDeviceHardwareModel === '') {
        this.$store.state.device.allDetectionInformation = '请选择硬件型号和固件版本'
        return
      }
      if (this.createDeviceFirmwareVersion === '') {
        this.$store.state.device.allDetectionInformation = '请选择固件版本'
      }
    },
    variableInitialFn: function () {
      this.$store.state.device.createDeviceName = ''
      this.$store.state.device.createDeviceCode = ''
      this.$store.state.device.createDeviceLocation = ''
      this.$store.state.device.createDevicePhonenumber = ''
      this.$store.state.device.createDeviceGatewayID = ''
      this.$store.state.device.createDeviceManufacturerName = ''
      this.$store.state.device.createDeviceHardwareModel = ''
      this.$store.state.device.createDeviceFirmwareVersion = ''
      this.$store.state.device.createDeviceNameDetectionResult = ''
      this.$store.state.device.createDeviceLocationDetectionResult = ''
      this.$store.state.device.createDevicePhonenumberDetectionResult = ''
      this.$store.state.device.createDeviceCodeDetectionResult = ''
      this.$store.state.device.allDetectionInformation = ''
    },
    logFn: function () {
      console.log('设备名称：' + this.$store.state.device.createDeviceName)
      console.log('测站编码：' + this.$store.state.device.createDeviceCode)
      console.log('地理位置：' + this.$store.state.device.createDeviceLocation)
      console.log('卡号    ：' + this.$store.state.device.createDevicePhonenumber)
      console.log('所选网关：' + this.$store.state.device.createDeviceGatewayID)
      console.log('厂商名称：' + this.$store.state.device.createDeviceManufacturerName)
      console.log('硬件型号：' + this.$store.state.device.createDeviceHardwareModel)
      console.log('固件版本：' + this.$store.state.device.createDeviceFirmwareVersion)
      console.log('全部检测：' + this.$store.state.device.allDetectionInformation)
    }
  }
}
</script>

<style>
  @import '../../../assets/css/device/create/overview.css'
</style>