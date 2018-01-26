<template>
	<div class="create-device-main">
		<div class="device-name">
			<span class="leftText">设备名称:</span>
			<span class="centerEditor">
				<input type="text" placeholder="请输入您的设备名称" v-model="deviceNameCurrent" @blur="deviceNameOnBlurFn"/>
			</span>
			<span :class="['rightPrompt', 'right-result-success', {'right-result-error': createDeviceNameDetectionResult.length !== 4}]" v-html="createDeviceNameDetectionResult" v-if="createDeviceNameDetectionResult"></span>
		</div>
		
		<div class="station-encoding">
			<span class="leftText">测站编码:</span>
			<span class="centerEditor">
				<input type="text" placeholder="请输入您的测站编码" v-model="deviceCodeCurrent"  @blur="deciceCodeOnblurFn"/>
			</span>
			<span :class="['rightPrompt', 'right-result-success', {'right-result-error': createDeviceCodeDetectionResult.length !== 4}]" v-html="createDeviceCodeDetectionResult" v-if="createDeviceCodeDetectionResult"></span>
		</div>
		
		<div class="geographical-position">
			<span class="leftText">地理位置:</span>
			<span class="centerEditor">
				<input type="text" placeholder="请输入您所在的位置" v-model="locationCurrent" @blur="locationOnblurFn"/>
			</span>
			<span :class="['rightPrompt', 'right-result-success', {'right-result-error': createDeviceLocationDetectionResult.length !== 4}]" v-html="createDeviceLocationDetectionResult" v-if="createDeviceLocationDetectionResult"></span>
		</div>
		
		<div class="card-number">
			<span class="leftText">卡号:<i>卡号</i></span>
			<span class="centerEditor">
				<input type="text" placeholder="请输入您的卡号" v-model="phonenumberCurrent" @blur="cardOnblurFn"/>
			</span>
			<span :class="['rightPrompt', 'right-result-success', {'right-result-error': createDevicePhonenumberDetectionResult.length !== 4}]" v-html="createDevicePhonenumberDetectionResult" v-if="createDevicePhonenumberDetectionResult"></span>
		</div>
		
		<div class="gateway-name">
			<span class="leftText">所属网关:</span>
			<div class="gateway-container">
				<div>
					<div v-for="(ul, index) in uls" :idname="ul.ID" :class="{'checkedGateway': index == currentIndex}" @click=checkedGatewayFn(ul.name,index,ul.ID)>
						<ul>
							<li>{{ul.IP}}</li>
							<li>{{ul.port}}</li>
							<li>{{ul.name}}</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
		
		<div class="drop-down-list-container">
			<div @click="isShowDropDownListTradeNameFn" :class="{ 'selected-option': isCheckedGateway}">
				<span>{{selectedTradeName}}</span><b :class="{'selectBoxClick': isCheckedGateway}"></b>
				<ul v-if="isShowDropDownListTradeName" v-clickoutside="hideDropDownListTradeName">
					<li v-for="list in drop_down_list_trade_name" @click.stop="checkTradeNameFn(list.name)" :idname="list.ID">{{list.name}}</li>
				</ul>
			</div>
			
			<div @click="isShowDropDownListHardwareModelFn" :class="{'selected-option': allowClickHardwareModel}">
				<span>{{selectedHardwareModel}}</span><b :class="{'selectBoxClick': allowClickHardwareModel}"></b>
				<ul v-if="isShowDropDownListHardwareModel" v-clickoutside="hideDropDownListHardwareModel">
					<li v-for="list in drop_down_list_hardware_model" @click.stop="checkHardwareModelFn(list.name)" :idname="list.ID">{{list.name}}</li>
				</ul>
			</div>
			
			<div @click="isShowDropDownListFirmwareVersionFn" :class="{'selected-option': allowClickFirmwareVersion}">
				<span>{{selectedFirmwareVersion}}</span><b :class="{'selectBoxClick': allowClickFirmwareVersion}"></b>
				<ul v-if="isShowDropDownListFirmwareVersion" v-clickoutside="hideDropDownListFirmwareVersion">
					<li v-for="list in drop_down_list_firmware_version" @click.stop="checkFirmwareVersionFn(list.name)" :idname="list.ID">{{list.name}}</li>
				</ul>
			</div>
		</div>
		
		<div class="detetction-information">
			<span v-html="allDetectionInformation"></span>
		</div>
	</div>
</template>

<script>
import clickoutside from './clickoutside'
import {mapGetters} from 'vuex'
// import $ from 'jquery'
export default {
  name: 'createDeviceMain',
  data () {
    return {
      deviceNameCurrent: '',
      deviceCodeCurrent: '',
      locationCurrent: '',
      phonenumberCurrent: '',
      isCheckedGateway: false,
      currentIndex: -1,
      checkedGatewayName: '',
      isShowDropDownListTradeName: false,
      selectedTradeName: '请选择厂商名称',
      allowClickHardwareModel: false,
      selectedHardwareModel: '请选择硬件型号',
      isShowDropDownListHardwareModel: false,
      allowClickFirmwareVersion: false,
      selectedFirmwareVersion: '请选择固件版本',
      isShowDropDownListFirmwareVersion: false,
      uls: [],
      drop_down_list_trade_name: [],
      drop_down_list_hardware_model: [],
      drop_down_list_firmware_version: [],
      detectionResultSuccess: '检测通过'
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      this.$http.get('../../../static/device/getewayNameDataDevice.json').then(function (res) {
        this.uls = res.body.result
      })
    })
  },
  computed: {
    ...mapGetters([
      'createDeviceName',
      'createDeviceNameDetectionResult',
      'createDeviceCode',
      'createDeviceCodeDetectionResult',
      'createDeviceLocation',
      'createDeviceLocationDetectionResult',
      'createDevicePhonenumber',
      'createDevicePhonenumberDetectionResult',
      'createDeviceGatewayID',
      'createDeviceManufacturerName',
      'createDeviceHardwareModel',
      'createDeviceFirmwareVersion',
      'allDetectionInformation'
    ])
  },
  watch: {
    deviceNameCurrent: function () {
      // 当用户输入的设备名称个数发生变化的时候，提示信息消失
      // 将用户输入的内容保存到状态管理中
      this.$store.state.device.createDeviceNameDetectionResult = ''
      this.$store.state.device.createDeviceName = this.deviceNameCurrent
    },
    deviceCodeCurrent: function () {
      // 当用户输入的测站编码的个数发生变化的时候，提示信息消失
      // 将用户输入的内容保存到状态管理中
      this.$store.state.device.createDeviceCodeDetectionResult = ''
      this.$store.state.device.createDeviceCode = this.deviceCodeCurrent
    },
    locationCurrent: function () {
      // 当用户输入的地理位置的个数发生变化的时候，提示信息消失
      // 将用户输入的内容保存到状态管理中
      this.$store.state.device.createDeviceLocationDetectionResult = ''
      this.$store.state.device.createDeviceLocation = this.locationCurrent
    },
    phonenumberCurrent: function () {
      // 当用户输入的卡号的个数发生变化的时候，提示信息消失
      // 将用户输入的内容保存到状态管理中
      this.$store.state.device.createDevicePhonenumberDetectionResult = ''
      this.$store.state.device.createDevicePhonenumber = this.phonenumberCurrent
    },
    currentIndex: function () {
      // 当保存的下标发生改变；意味着已经选择了网关或网关进行了切换； 然后通过网关名称对厂商名称的下拉列表进行请求
      //   将请求到的厂商下拉列表的数组保存到变量 drop_down_list_trade_name 里通过vue渲染在页面上
      // 将两个判断下拉列表是否允许被电击的判断参数设置为false
      // 将三个下拉列表的选中值修改为默认值
      // 将厂商名称在状态管理中保存的变量置为空
      // 将硬件型号在状态管理中保存的变量置为空
      // 将固件版本在状态管理中保存的变量置为空
      // 将所选网关和三个下拉列表的全部检测信息 置为空
      this.$http.get('../../../static/device/getewayNameDataDevice.json').then(function (res) {
        console.log('厂商名称的下拉列表已经发生刷新')
        this.drop_down_list_trade_name = res.data.tradeName
      })
      this.allowClickHardwareModel = false
      this.allowClickFirmwareVersion = false
      this.isShowDropDownListTradeName = false
      this.isShowDropDownListHardwareModel = false
      this.isShowDropDownListFirmwareVersion = false
      this.selectedTradeName = '请选择厂商名称'
      this.selectedHardwareModel = '请选择硬件型号'
      this.selectedFirmwareVersion = '请选择固件版本'
      this.$store.state.device.createDeviceManufacturerName = ''
      this.$store.state.device.createDeviceHardwareModel = ''
      this.$store.state.device.createDeviceFirmwareVersion = ''
      this.$store.state.device.allDetectionInformation = ''
    },
    selectedTradeName: function () {
      // 当厂商下拉列表的选中值发生改变且不是默认值；就允许硬件型号下拉列表可以被电击
      // 通过选中的厂商名称，向后台请求硬件型号的数据；并保存在变量 drop_down_list_hardware_model 里
      // 将其后的下拉列表值恢复为默认状态；并且让选择固件版本下拉列表处于不可点击状态
      // 将硬件型号在状态管理中保存的变量置为空
      // 将固件版本在状态管理中保存的变量置为空
      if (this.selectedTradeName !== '请选择厂商名称') {
        this.allowClickHardwareModel = true
      }
      this.$http.get('../../../static/device/getewayNameDataDevice.json').then(function (res) {
        console.log('硬件型号的下拉列表已经刷新')
        this.drop_down_list_hardware_model = res.data.hardwareModel
      })
      this.selectedHardwareModel = '请选择硬件型号'
      this.allowClickFirmwareVersion = false
      this.$store.state.device.createDeviceHardwareModel = ''
      this.$store.state.device.createDeviceFirmwareVersion = ''
    },
    selectedHardwareModel: function () {
      // 当硬件型号的下拉列表的选种值发生改变且不是默认值； 就允许固件版本的下拉列表允许被电击
      // 通过选中的硬件型号，向后台请求固件版本下拉列表的数据；并保存到变量  drop_down_list_firmware_version 里
      // 并将其后的下拉框的值恢复为默认状态
      // 将固件版本在状态管理中保存的变量置为空
      if (this.selectedHardwareModel !== '请选择硬件型号') {
        this.allowClickFirmwareVersion = true
      }
      this.$http.get('../../../static/device/getewayNameDataDevice.json').then(function (res) {
        console.log('固件版本的下拉列表已经刷新')
        this.drop_down_list_firmware_version = res.data.firmwareVersion
      })
      this.selectedFirmwareVersion = '请选择固件版本'
      this.$store.state.device.createDeviceFirmwareVersion = ''
    }
  },
  methods: {
    deviceNameOnBlurFn: function () {
      // 当设备名称输入框失去焦点的时候进行判定，
      // 如果用户输入的内容为空，或者符合规则，输入的内容是由1~32位数字英文中文组成，
      //    什么也不做，将提示信息清空，不管有没有提示信息
      // 否则
      //    提示信息出现
      let reg = /^[\u4e00-\u9fa5-0-9a-zA-Z]{1,32}$/
      if (reg.test(this.deviceNameCurrent) || !this.deviceNameCurrent) {
        this.$store.state.device.createDeviceNameDetectionResult = ''
      } else {
        this.$store.state.device.createDeviceNameDetectionResult = '1~32个字符，可使用数字、英文和中文'
      }
    },
    deciceCodeOnblurFn: function () {
      // 当测站编码输入框失去焦点的时候进行判定，
      // 如果用户输入的内容为空，或者符合规则，输入的内容是由6~16位数字英文组成，
      //    什么也不做，将提示信息清空，不管有没有提示信息
      // 否则
      //    提示信息出现 
      let reg = /^[0-9a-zA-Z]{6,16}$/
      if (reg.test(this.deviceCodeCurrent) || !this.deviceCodeCurrent) {
        this.$store.state.device.createDeviceCodeDetectionResult = ''
      } else {
        this.$store.state.device.createDeviceCodeDetectionResult = '6~16个字符，可使用数字和英文'
      }
    },
    locationOnblurFn: function () {
      // 当地理位置输入框失去焦点的时候进行判定，
      // 如果用户输入的地理位置为空，或者符合规则，输入的内容是由1~64位数字英文中文组成，
      //    什么也不做，将提示信息清空，不管有没有提示信息
      // 否则
      //    提示信息出现 
      let reg = /^[\u4e00-\u9fa5-0-9a-zA-Z]{1,64}$/
      if (reg.test(this.locationCurrent) || !this.locationCurrent) {
        this.$store.state.device.createDeviceLocationDetectionResult = ''
      } else {
        this.$store.state.device.createDeviceLocationDetectionResult = '1~64个字符，可使用数字、英文和中文'
      }
    },
    cardOnblurFn: function () {
      // 当卡号输入框失去焦点的时候进行判定，
      // 如果用户输入的卡号为空，或者符合规则，输入的内容是由1~16位数字，
      //    什么也不做，将提示信息清空，不管有没有提示信息
      // 否则
      //    提示信息出现 
      let reg = /^[0-9]{1,16}$/
      if (reg.test(this.phonenumberCurrent) || !this.phonenumberCurrent) {
        this.$store.state.device.createDevicePhonenumberDetectionResult = ''
      } else {
        this.$store.state.device.createDevicePhonenumberDetectionResult = '1~16个字符，只可使用数字'
      }
    },
    detectStationEncodingInputContentFn: function () {},
    checkedGatewayFn: function (gateway, index, IDName) {
      // 点击网关时调用的方法，需要把当前点击的网关详细信息以及下标传进来
      // 将下标保存到变量currentIndex中
      // 将网关名称保存到变量checkedGatewayName中
      // 将变量isCheckedGateway 置为true，允许点击厂商名称的下拉列表
      // 如果网关是被点击的 ===>> 参数gateway 是否为false
      //    将厂商名称的下拉列表的样式改为可以点击状态
      // 否则
      //    将厂商名称的下拉列表的样式改为不可以点击状态
      // 最后将所选的网关ID传递到状态管理里,如果所选网关的状态为false
      //    将状态管理的变量置为空
      // 否则
      //    将所选网关的ID进行保存
      this.currentIndex = index
      this.checkedGatewayName = gateway
      if (gateway) {
        this.isCheckedGateway = true
      } else {
        this.isCheckedGateway = false
      }
      if (this.isCheckedGateway === false) {
        this.$store.state.device.createDeviceGatewayID = ''
      } else {
        this.$store.state.device.createDeviceGatewayID = IDName
      }
    },
    isShowDropDownListTradeNameFn: function () {
      // 点击厂商下拉列表的时候先要判断有没有选择网关；否则下拉列表不显示
      //   将变量isShowDropDownListTradeName变为true；让下拉列表显示出来
      //   如果在另外两个下拉列表处于点开状态下点击厂商名称的下拉列表，那么隐藏其余的下拉列表;并将其恢复为默认样式
      //   将所选网关和三个下拉列表的全部检测信息 置为空
      if (this.isCheckedGateway) {
        console.log('点击厂商下拉列表')
        this.isShowDropDownListTradeName = true
        this.isShowDropDownListHardwareModel = false
        this.isShowDropDownListFirmwareVersion = false
        this.$store.state.device.allDetectionInformation = ''
      }
    },
    checkTradeNameFn: function (list) {
      // 选择厂商之后 让下拉列表隐藏
      // 将下拉列表呈现的值改为当前的选中值
      // 恢复下拉列表的默认样式
      // 将硬件型号的下拉列表样式改为可以点击状态
      // 最后将厂商名称下拉列表的所选值在状态管理中保存起来
      this.isShowDropDownListTradeName = false
      this.selectedTradeName = list
      this.$store.state.device.createDeviceManufacturerName = this.selectedTradeName
    },
    isShowDropDownListHardwareModelFn: function () {
      // 判断是否已经选择厂商的名称
      //    显示硬件型号的下拉列表
      //    如果在另外两个下拉列表处于点开状态下点击硬件型号下拉列表，那么隐藏其余的下拉列表;并将其恢复为默认样式
      //    将所选网关和三个下拉列表的全部检测信息 置为空
      if (this.allowClickHardwareModel) {
        console.log('点击硬件型号下拉列表')
        this.isShowDropDownListHardwareModel = true
        this.isShowDropDownListTradeName = false
        this.isShowDropDownListFirmwareVersion = false
        this.$store.state.device.allDetectionInformation = ''
      }
    },
    checkHardwareModelFn: function (list) {
      // 隐藏下拉硬件型号的下拉列表
      // 将选中的硬件型号的值赋值给下拉列表的选中值
      // 恢复硬件型号下拉列表的默认样式
      // 将固件版本的下拉列表样式改为可以点击状态
      // 最后将硬件型号下拉列表的所选值在状态管理中保存起来
      this.isShowDropDownListHardwareModel = false
      this.selectedHardwareModel = list
      this.$store.state.device.createDeviceHardwareModel = this.selectedHardwareModel
    },
    isShowDropDownListFirmwareVersionFn: function () {
      // 判断是否已经选择了硬件型号
      //   显示固件版本的下拉列表
      //   显示选中状态的固件版本下拉列表的样式
      //   将所选网关和三个下拉列表的全部检测信息 置为空
      if (this.allowClickFirmwareVersion) {
        console.log('点击固件版本下拉列表')
        this.isShowDropDownListFirmwareVersion = true
        this.$store.state.device.allDetectionInformation = ''
      }
    },
    checkFirmwareVersionFn: function (list) {
      // 将固件版本的下拉列表隐藏
      // 将选中的固件版本的值付给固件版本下拉列表
      // 最后将固件版本的下拉列表的所选值在状态管理中保存起来
      this.isShowDropDownListFirmwareVersion = false
      this.selectedFirmwareVersion = list
      this.$store.state.device.createDeviceFirmwareVersion = this.selectedFirmwareVersion
    },
    hideDropDownListTradeName: function (e) {
      // 点击厂商名称的下拉列表之外的区域时
      //   先隐藏下拉列表
      this.isShowDropDownListTradeName = false
    },
    hideDropDownListHardwareModel: function (e) {
      // 点击硬件型号的下拉列表之外的区域时
      //   先隐藏下拉列表
      this.isShowDropDownListHardwareModel = false
    },
    hideDropDownListFirmwareVersion: function (e) {
      // 点击固件版本的下拉列表之外的区域时
      //   先隐藏下拉列表
      this.isShowDropDownListFirmwareVersion = false
    }
  },
  directives: {
    clickoutside
  }
}
</script>

<style>
  @import '../../../assets/css/device/create/overview.css'
</style>