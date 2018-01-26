<template>
  <div class="gatewayTelemetry">
  	<div class="dataTelemetry_box">
  		<div class="dataTelemetry_p">
  			<p>数据遥测</p>
	  		<div class="search">
	  			<span class="search_box">
	  				<span class="search_span" @click="searchFn"></span>
	  				<input class="search_input"  placeholder='精确查找,只能输入一个数值'  v-model='search'  />
	  			</span>
	  		</div>
  		</div>
  		<div class="dataTelemetry_body">
  			<ul class="dataTelemetry_nav">
  				<li @click="isShowInfoFn" :class="{showStyl: isShowDataType}">数据类型</li>
  				<li @click="isShowSafeFn" :class="{showStyl: isShowDeviceCode}">设备编码</li>
  			</ul>
  			<div class="dataTelemetry_conent">
  				<div class="dataType" v-show="isShowDataType">
				  	<div class="dataType_conent">
				  		<ul>
								<li v-for="(n, index) in searchData"  :class="{clickShowGatewayStyle: (dataTypeIndexArr.indexOf(index) == -1) ? false: true}" @click="searchGatewayStyle(index)">{{n.dataTypeName}}</li>
							</ul>
				  	</div>
				  </div>

				  <div class="deviceCode" v-show="isShowDeviceCode">
				  	<div class="deviceCode_conent">
				  		<ul>
								<li v-for="(n, index) in codingData"  :class="{clickShowGatewayStyle: (deviceCodeIndexArr.indexOf(index) == -1) ? false: true}" @click="codingGatewayStyle(index)">{{n.dataCoding}}</li>
							</ul>
				  	</div>
				  </div>
  			</div>
  		</div>
  		
			<div class="dataTelemetry_viewResults">
				<div class="dataTelemetry_select">
					<div class="default">
						<span class="defaultA" v-show="defaulA">
							<img src="../../../../static/gateway/img/default.png"/>
						</span><span class="defaultB" v-show="defaulB">
							<img src="../../../../static/gateway/img/selected.png"/>
						</span><span class="select" @click="isSelectFn" >全选</span>
					</div>
				</div>
				<router-link to="/gateway/GatewayDeta/TelemetryResult/TelemetryResults">
				  <button type="button" class="viewResults" >查看结果</button>
				</router-link>
			</div>
  	</div>
  </div>
</template>

<script type='text/ecmascript-6'>
  import $ from 'jquery'
  export default {
    name: 'gatewayTelemetry',
    data () {
      return {
        defaulA: true,
        defaulB: false,
        search: '',
        dataTypeName: [],
        dataCoding: [],
        dataTypeIndexArr: [],
        deviceCodeIndexArr: [],
        isShowDataType: true,
        isShowDeviceCode:false
      }
    },
    computed: {
      searchData: function (){
        let search = this.search
        if (search) {
          return this.dataTypeName.filter(function(dataTypeNames) {
            return Object.keys(dataTypeNames).some(function(key) {
              return String(dataTypeNames[key]).toLowerCase().indexOf(search) > -1
            })
          })
        }
         return this.dataTypeName
      },
      codingData: function (){
        let search = this.search
        if (search) {
          return this.dataCoding.filter(function(dataCodings) {
            return Object.keys(dataCodings).some(function(key) {
              return String(dataCodings[key]).toLowerCase().indexOf(search) > -1
            })
          })
        }
         return this.dataCoding
      }
    },
    methods: {
      searchGatewayStyle: function (index) {
        if (this.dataTypeIndexArr.indexOf(index) !== -1) {
          this.dataTypeIndexArr.splice(this.dataTypeIndexArr.indexOf(index), 1)
        } else {
          this.dataTypeIndexArr.push(index)
        }
      },
      codingGatewayStyle: function (index) {
        if (this.deviceCodeIndexArr.indexOf(index) !== -1) {
          this.deviceCodeIndexArr.splice(this.deviceCodeIndexArr.indexOf(index), 1)
        } else {
          this.deviceCodeIndexArr.push(index)
        }
      },
      searchFn () {
        if (!this.search) {
          alert('请输入想要查询的数据类型/测站编码')
        } 
      },
      isShowInfoFn () {
        this.isShowDataType = true
        this.isShowDeviceCode = false
      },
      isShowSafeFn () {
        this.isShowDataType = false
        this.isShowDeviceCode = true
      },
      isSelectFn () {
        let obj = $('.dataType_conent li')
        let objNes = $('.deviceCode_conent li')
        let defaul = $('.default span')
        if (this.isShowDataType === true) {
          if (!obj.hasClass("clickShowGatewayStyle")) {
            obj.addClass("clickShowGatewayStyle")
//          this.defaulA = false
//          this.defaulB = true
          } else {
            obj.removeClass("clickShowGatewayStyle")
//          this.defaulA = true
//          this.defaulB = false
          }
        } 
        if (this.isShowDeviceCode === true) {
          if (!objNes.hasClass("clickShowGatewayStyle")) {
            objNes.addClass("clickShowGatewayStyle")
//          this.defaulA = false
//        	this.defaulB = true
          } else {
            objNes.removeClass("clickShowGatewayStyle")
//          this.defaulA = true
//          this.defaulB = false
          }
        }
      }
    },
    mounted () {
      this.$nextTick(function () {
        this.$http.get('../../../../static/gateway/DataType.json').then(function (res) {
          this.dataCoding = res.data.coding
          this.dataTypeName = res.data.result
        })
      })
    }
  }
</script>

<style>
 @import '../../../assets/css/gateway/DataTelemetry/DataTelemetry.css';
</style>