<template>
	<div class="device-main-table">
			<table class="table-bordered" @mousewheel="refresh" @DOMMouseScroll="refresh">
				<thead>
					<tr>
						<th>名称</th>
						<th><span :class="['sort-default', { 'sort-anticlockwise': codeAnticlockwise, 'sort-clockwise': codeClockwise}]" @click="codeSortFn">测站编码</span></th>
						<th><span :class="['sort-default', { 'sort-anticlockwise': stateAnticlockwise, 'sort-clockwise': stateClockwise}]" @click="stateSortFn">状态</span></th>
						<th><span :class="['sort-default', { 'sort-anticlockwise': gatewayAnticlockwise, 'sort-clockwise': gatewayClockwise}]" @click="gatewaySortFn">所属网关</span></th>
						<th>卡号</th>
						<th><span  :class="['sort-default', { 'sort-anticlockwise': lastTimeAnticlockwise, 'sort-clockwise': lastTimeClockwise}]" @click="lastTimeSortFn">最后活动时间</span></th>
						<th>厂商</th>
						<th>位置</th>
					</tr>
				</thead>
			</table>
	    <div class="tbody">
	    	<div @click="showDeviceCreateFn" class="addEquipment" >添加新的设备</div>
		      <div class="dataList">
		      	<ul class="dataList_one">
			        <li  v-for="(tr, index) in allDeviceInformation" :idname="tr.ID" @click = "deviceClick(tr)">
			          <span>{{tr.name}}</span>
			          <span>{{tr.id.id}}</span>
			          <span></span>
			          <span></span> mn
			        </li>
		      	</ul>
			      <ul class="dataList_tow">
			        <li v-for="value in values">
			        	<span></span>
			        	<span>{{value}}</span>

			        </li>
			      </ul>
		    	</div>
	    	</div>
			<div v-show="distanceScrollTop !== 0" class="scroll-top" @click="scrollTopFn"></div>
		</div>
</template>

<script>
import $ from 'jquery'
 // import {mapActions} from 'vuex'
export default {
  name: 'device-main-table',
  data () {
    return {
      table_page: 0,
      total_device: 0,
      codeClockwise: false,
      codeAnticlockwise: false,
      stateClockwise: false,
      stateAnticlockwise: false,
      gatewayClockwise: false,
      gatewayAnticlockwise: false,
      lastTimeClockwise: false,
      lastTimeAnticlockwise: false,
      distanceScrollTop: 0,
      allDeviceInformation: [],
      lastDataTime: '',
      deviceIds: [],
      values: []
    }
  },
  computed: {
//    ...mapActions({
//      deviceClick: 'deviceClick'
//    }),
    isResetSortDevice () {
      return this.$store.state.device.isResetSortDevice
    }
  },
  mounted () {
    this.$nextTick(() => {
      // // 每次切换到设备概况页面时需要先把保存设备信息的状态管理里的数组清空
      let token = sessionStorage.getItem('res')
      token = 'Bearer ' + token
//      let customerId = this.$store.state.customerId
      let customerId = sessionStorage.getItem('customerId')
      let url = '/api/customer/' + customerId + '/devices?limit=10'
      this.$http.get(url, {headers: {'X-Authorization': token}}).then(response => {
        // success callback
        // get status
        console.log(response.body)
        for (let i in response.body.data) {
          let deviceId = response.body.data[i].id.id
          let url1 = '/api/plugins/telemetry/DEVICE/' + deviceId + '/keys/attributes'
          this.$http.get(url1, {headers: {'X-Authorization': token}}).then(response => {
            console.log(response)
            // success callback
            // get status
//          console.log( response.body[0])
            if (response.body.length === 0) {
              this.lastDataTime = '无此数据'
              this.values.push(this.lastDataTime)
            } else {
              let lastDataTime = response.body[0]
              let url12 = '/api/plugins/telemetry/DEVICE/' + deviceId + '/values/attributes?keys=' + lastDataTime
              this.$http.get(url12, {headers: {'X-Authorization': token}}).then(response => {
                // success callback
                // get status
                console.log(response.body[0].value)
                this.lastDataTime = response.body[0].value
                this.values.push(this.lastDataTime)
                console.log(this.values)
              }, response => {
              })
            }
          }, response => {
            console.log(response.status)
          })
        }
        let that = this
        that.allDeviceInformation = response.body.data
      }, response => {
        // error callback
        console.log(response.status)
      })
    })
  },
  watch: {
    table_page () {
      // 当鼠标滚轮下滑的时候请求下一页的数据并将其合并到保存表格数据的变量中
      //    将请求到的数据合并到保存表格数据的数组中
//    //    同时将返回的数据总条数保存起来
//    this.$http.get('../../../static/device/tableDataDevice.json').then((res) => {
//      this.$store.state.device.allDeviceInformation = this.$store.state.device.allDeviceInformation.concat(res.data.result)
//      this.total_device = res.data.total
//    })
    },
    isResetSortDevice () {
      // 如果状态管理里的此变量发生了改变，证明用户点击了搜索，那么将排序方式回复默认
      // 获取的数据页数也回复默认为第一页 ==>> 状态管理里的变量，再补充
      this.codeClockwise = false
      this.codeAnticlockwise = false
      this.stateClockwise = false
      this.stateAnticlockwise = false
      this.gatewayClockwise = false
      this.gatewayAnticlockwise = false
      this.lastTimeClockwise = false
      this.lastTimeAnticlockwise = false
    }
  },
  methods: {
//    ...mapActions({
//      deviceClick: 'deviceClick'
//    }),
    deviceClick: function (index) {
      this.$router.push({path: '/device/detail'})
      let token = sessionStorage.getItem('res')
      token = 'Bearer ' + token
      let deviceId = index.id.id
      sessionStorage.setItem('deviceName', index.name)
      let url = '/api/plugins/telemetry/DEVICE/' + deviceId + '/keys/timeseries'
      this.$http.get(url, {headers: {'X-Authorization': token}}).then(response => {
        console.log(response)
        // 如果设备没有相关属性，值均为空
        if (response.body.length === 0) {
          sessionStorage.setItem('dateTime', '无数据')
          sessionStorage.setItem('dataType', '无数据')
          sessionStorage.setItem('dateTimeValue', '无数据')
          sessionStorage.setItem('dataTypeValue', '无数据')
          console.log('此设备没有相关数据')
        } else {
          // 如果设备有相关属性，将属性保存并且获取值
          sessionStorage.setItem('dateTime', (response.body)[0])
          sessionStorage.setItem('dataType', (response.body)[1])
          let dateTime = sessionStorage.getItem('dateTime')
          let dataType = sessionStorage.getItem('dataType')
          let array = new Array(2)
          array[0] = dateTime
          array[1] = dataType
          let url2 = '/api/plugins/telemetry/DEVICE/' + deviceId + '/values/timeseries?keys=' + array
          this.$http.get(url2, {headers: {'X-Authorization': token}}).then(response => {
            console.log(response.body)
            sessionStorage.setItem('dateTimeValue', response.body.localDateTime[0].value)
            sessionStorage.setItem('dataTypeValue', response.body.rainfall[0].value)
          }, response => {
            console.log(response.status)
          })
        }
      }, response => {
        console.log(response.status)
      })
    },
    showDeviceCreateFn () {
      this.$router.push({path: '/device/create'})
    },
    refresh () {
      // 如果滚动条到顶部的垂直高度 大于或等于  页面文档的高度 - 浏览器显示区域的高度 - 指定的滚动条距离底部的最小垂直高度  且 上次请求到的数据条数等于8条
      //    将表格的页数 + 1
      if ($(document).scrollTop() >= ($(document).height() - $(window).height() - 200) && (this.table_page * 8 < this.total_device)) {
        this.table_page ++
      }
    },
    codeSortFn () {
      // 如果测站编码还没有排序
      //    先将测站编码逆时针排序
      //    将其他项的排序取消
      // 否则，如果测站编码是逆时针排序
      //    将测站编码变为顺时针排序
      // 否则， 将所有的数据恢复默认状态不进行排序
      if (!this.codeClockwise && !this.codeAnticlockwise) {
        this.codeAnticlockwise = true
        this.stateClockwise = false
        this.stateAnticlockwise = false
        this.gatewayClockwise = false
        this.gatewayAnticlockwise = false
        this.lastTimeClockwise = false
        this.lastTimeAnticlockwise = false
      } else if (this.codeAnticlockwise) {
        this.codeAnticlockwise = false
        this.codeClockwise = true
      } else {
        this.codeClockwise = false
      }
    },
    stateSortFn () {
      // 如果状态还没有排序
      //    先将状态逆时针排序
      //    将其他项的排序取消
      // 否则，如果状态是逆时针排序
      //    将状态变为顺时针排序
      // 否则， 将所有的数据恢复默认状态不进行排序
      if (!this.stateClockwise && !this.stateAnticlockwise) {
        this.stateAnticlockwise = true
        this.codeClockwise = false
        this.codeAnticlockwise = false
        this.gatewayClockwise = false
        this.gatewayAnticlockwise = false
        this.lastTimeClockwise = false
        this.lastTimeAnticlockwise = false
      } else if (this.stateAnticlockwise) {
        this.stateAnticlockwise = false
        this.stateClockwise = true
      } else {
        this.stateClockwise = false
      }
    },
    gatewaySortFn () {
      // 如果所属网关还没有排序
      //    先将所属网关逆时针排序
      //    将其他项的排序取消
      // 否则，如果所属网关是逆时针排序
      //    将所属网关变为顺时针排序
      // 否则， 将所有的数据恢复默认状态不进行排序
      if (!this.gatewayClockwise && !this.gatewayAnticlockwise) {
        this.gatewayAnticlockwise = true
        this.codeClockwise = false
        this.codeAnticlockwise = false
        this.stateClockwise = false
        this.stateAnticlockwise = false
        this.lastTimeClockwise = false
        this.lastTimeAnticlockwise = false
      } else if (this.gatewayAnticlockwise) {
        this.gatewayAnticlockwise = false
        this.gatewayClockwise = true
      } else {
        this.gatewayClockwise = false
      }
    },
    lastTimeSortFn () {
      // 如果最后活动时间还没有排序
      //    先将最后活动时间逆时针排序
      //    将其他项的排序取消
      // 否则，如果最后活动时间是逆时针排序
      //    将最后活动时间变为顺时针排序
      // 否则， 将所有的数据恢复默认状态不进行排序
      if (!this.lastTimeClockwise && !this.lastTimeAnticlockwise) {
        this.lastTimeAnticlockwise = true
        this.codeClockwise = false
        this.codeAnticlockwise = false
        this.stateClockwise = false
        this.stateAnticlockwise = false
        this.gatewayClockwise = false
        this.gatewayAnticlockwise = false
      } else if (this.lastTimeAnticlockwise) {
        this.lastTimeAnticlockwise = false
        this.lastTimeClockwise = true
      } else {
        this.lastTimeClockwise = false
      }
    },
    scrollTopFn () {
      // 火狐和ie触发html的动画
      // chrome触发body的动画
      $('html').animate({scrollTop: 0}, 200)
      $('body').animate({scrollTop: 0}, 200)
    },
    isShowScrollTopFn () {
      this.distanceScrollTop = $(document).scrollTop()
    }
  }
}
</script>

<style>
  @import '../../assets/css/device/mainTable.css';
</style>
