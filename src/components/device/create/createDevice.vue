<template>
	<div class="create-device"  ref="createDevice">
		<div id="create-container" class="container">
			<div class="create-device-header">
				<p>注册设备</p>
			</div>
			<create-device-main></create-device-main>
			<create-device-footer></create-device-footer>
		</div>
	</div>
</template>

<script>
import CreateDeviceMain from './createDeviceMain'
import CreateDeviceFooter from './createDeviceFooter'
export default {
  name: 'create-device',
  components: {
    CreateDeviceMain,
    CreateDeviceFooter
  },
  data () {
    return {
      fullWidth: document.documentElement.clientWidth,
      distanceLeft: 0
    }
  },
  mounted () {
    window.addEventListener('resize', this.handleResize)
    this.distanceChangeFn(this.$el)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    handleResize (event) {
      this.fullWidth = document.documentElement.clientWidth
      this.distanceChangeFn(this.$refs.createDevice)
    },
    distanceChangeFn (createDevice) {
      this.distanceLeft = createDevice.getBoundingClientRect().left
    }
  }
}
</script>

<style>
	@import url("../../../assets/css/device/create/overview.css" );
</style>