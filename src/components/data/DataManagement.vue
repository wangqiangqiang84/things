<template>
	<div class="dataManagement">
		<div class="dataManagement-l">
            <!--<Table class="table1" size="large" height="810" stripe :columns="columns1" :data="data1" ></Table>-->
            <!--<Table class="table2" size="large" height="610" stripe :columns="columns1" :data="data1" ></Table>-->
            <!--<Table class="table3" size="small" height="430" stripe :columns="columns1" :data="data1" ></Table>-->
      <!--<Table height="500"  :columns="columns1" :data="data2"></Table>-->
      <Table :loading="loading"   height="520"  :columns="columns1" :data="data2" ></Table>
      <!--<table>-->
        <!--<thead class="dataKeys">-->
          <!--<tr v-for="n in keys">-->
            <!--<td>{{n.variableName}}</td>-->
            <!--<td>{{n.time}}</td>-->
            <!--<td>{{n.value}}</td>-->
            <!--<td>{{n.deviceCode}}</td>-->
            <!--<td>{{n.gatewayname}}</td>-->
            <!--<td>{{n.devicename}}</td>-->
          <!--</tr>-->
        <!--</thead>-->
        <!--<tbody  class="dataDetails">-->
          <!--<tr v-for="n in data">-->
            <!--<td width="16%">{{dataType}}</td>-->
            <!--<td width="16%">{{dateTimeValue}}</td>-->
            <!--<td width="16%">{{dataTypeValue}}立方米每秒</td>-->
            <!--<td width="16%">{{n.deviceCode}}</td>-->
            <!--<td width="16%">{{n.gatewayname}}</td>-->
            <!--<td width="16%">{{deviceName}}</td>-->
          <!--</tr>-->
        <!--</tbody>-->
      <!--</table>-->
			<div class="dataManagement-number">
				<p>根据当前筛选条件共获取<span>{{total}}</span>条数据</p>
			</div>
		</div>
		<div class="dataManagement-r">
            <div class="dataManagement-r-top">
                <img src="../../../static/data/img/sx.png">
            </div>
            <div class="litter">暂无数据</div>
            <div class="dataManagement-r-bot">
            	<div class="tabs">
            		<ul id="tabs">
	            		<li class="tab-nav-action">网关统计</li>
	            		<li class="tab-nav">数据统计</li>
	            		<li class="tab-nav">设备统计</li>
	            	</ul>
            	</div>
            	<div id="tabsBody" class="tabsBody">
				    <div style="display:block;">
                        <ul>
                        	<li v-for="(n, index) in list1">
                        		<p>{{n.gatewayName}}</p>
                        		<div class="big_width" :style="{width: big_width + '%'}">
                        			<div class="small_width" :style="{width: (list1[index].value)/gray_number*100 + '%'}"></div>
                        		</div>
                        		<b>{{n.value}}</b>
                        	</li>
                        </ul>
				    </div>
				    <div style="display:none">
				        <ul>
                        	<li v-for="(n, index) in list2">
                        		<p>{{n.gatewayName}}</p>
                        		<div class="big_width" :style="{width: big_width + '%'}">
                        			<div class="small_width" :style="{width: (list2[index].value)/gray_number*100 + '%'}"></div>
                        		</div>
                        		<b>{{n.value}}</b>
                        	</li>
                        </ul>
				    </div>
				    <div style="display:none">
				        <ul>
                        	<li v-for="(n, index) in list3">
                        		<p>{{n.gatewayName}}</p>
                        		<div class="big_width" :style="{width: big_width + '%'}">
                        			<div class="small_width" :style="{width: (list3[index].value)/gray_number*100 + '%'}"></div>
                        		</div>
                        		<b>{{n.value}}</b>
                        	</li>
                        </ul>
				    </div>
				</div>
            </div>
		</div>
		<div class="dataManagement-out">
			<form  class="dataManagement-content">
				<div class="head">
					<h2>筛选数据</h2>
				</div>
				<div class="gatewayName">
					<h3>网关名称:</h3>
					<ul>
						<li v-for="(n, index) in gatewayName" :class="{clickShowGatewayStyle: (gatewayIndexArr.indexOf(index) == -1) ? false: true}" @click="addGatewayStyle(index)">{{n.gatewayname}}</li>
					</ul>
				</div>
				<div class="STCD">
					<div class="STCD-top">
						<h3 >测站编码:</h3>
						<div class="input-group">
							<input type="text" id="courseInput" v-model="newTodo" maxlength="16"/><button type="button" id="addItemCourse" @click="addTodoSTCDList">添加</button>
						</div>
					</div>
					<div class="STCD-cont">
						<ul id="ItemCourseList">
							<li><p>1234567890</p><span>&Chi;</span></li>
							<li><p>1234567890</p><span>&Chi;</span></li>
							<li><p>1234567890</p><span>&Chi;</span></li>
							<li><p>1234567890</p><span>&Chi;</span></li>
                            <li v-for="(todo, index) in todos"><p>{{ todo.text }}</p><span @click="removeTodo(index)">&Chi;</span></li>
						</ul>
					</div>
				</div>
				<div class="dataType">
					<h3>数据类型:</h3>
					<ul>
						<li v-for="(n, index) in dataType" :class="{clickShowDataStyle: (dataIndexArr.indexOf(index) == -1) ? false: true}" @click="addDataTypeStyle(index)">{{n.variableName}}</li>
					</ul>
				</div>
				<div class="startTime">
					<h3>起止时间:</h3>
					<div class="startTime-content">
						<Date-picker type="datetime" format="yyyy-MM-dd HH:mm" placeholder="选择起止时间" placement="top" size="large"></Date-picker>
				        <Date-picker type="datetime" format="yyyy-MM-dd HH:mm" placeholder="选择截止时间" placement="top" size="large"></Date-picker>
					</div>
			    </div>
			    <div class="foot">
			    	<button type="button" class="resetContent" @click="resetContent">重置</button>
			    	<button type="button" class="affirm">确认</button>
			    </div>
			</form>
		</div>
	</div>
</template>
<script type='text/ecmascript-6'>
import $ from 'jquery'
import {mapGetters} from 'vuex'
export default {
  data () {
    return {
      isA: false,
      total: '',
      gatewayIndexArr: [],
      dataIndexArr: [],
      list1: [],
      list2: [],
      list3: [],
      newTodo: '',
      small_width: [],
      big_width: 100,
      gray_number: 0,
      color_number: 0,
      gatewayName: [],
      data1: [],
      data: [],
      keys: [],
      todos: [{
        text: '1234567890'
      }],
      timeOut: '',
      loading: true,
      columns1: [
        {
          title: '数据类型',
          key: 'variableName'
        },
        {
          title: '时间',
          key: 'time'
      //    className: 'time'
        },
        {
          title: '值(立方米每秒)',
          key: 'value'
        },
        {
          title: '网关名称',
          key: 'gatewayname'
       //   className: 'gatewayname'
        },
        {
          title: '测站编码',
          key: 'deviceCode'
      //    className: 'tel'
        },
        {
          title: '设备名称',
          key: 'devicename'
        }
      ],
      data2: [
        {
          variableName: '雨量',
          time: '2018-1-1',
          value: '67mm',
          gatewayname: '西安山脉',
          deviceCode: '6541212',
          devicename: '最新设备'
        },
        {
          variableName: '雨量',
          time: '2018-1-1',
          value: '67mm',
          gatewayname: '西安山脉',
          deviceCode: '6541212',
          devicename: '最新设备'
        },
        {
          variableName: '雨量',
          time: '2018-1-1',
          value: '67mm',
          gatewayname: '西安山脉',
          deviceCode: '6541212',
          devicename: '最新设备'
        },
        {
          variableName: '雨量',
          time: '2018-1-1',
          value: '67mm',
          gatewayname: '西安山脉',
          deviceCode: '6541212',
          devicename: '最新设备'
        },
        {
          variableName: '雨量',
          time: '2018-1-1',
          value: '67mm',
          gatewayname: '西安山脉',
          deviceCode: '6541212',
          devicename: '最新设备'
        },
        {
          variableName: '雨量',
          time: '2018-1-1',
          value: '67mm',
          gatewayname: '西安山脉',
          deviceCode: '6541212',
          devicename: '最新设备'
        },
        {
          variableName: '雨量',
          time: '2018-1-1',
          value: '67mm',
          gatewayname: '西安山脉',
          deviceCode: '6541212',
          devicename: '最新设备'
        },
        {
          variableName: '雨量',
          time: '2018-1-1',
          value: '67mm',
          gatewayname: '西安山脉',
          deviceCode: '6541212',
          devicename: '最新设备'
        },
        {
          variableName: '雨量',
          time: '2018-1-1',
          value: '67mm',
          gatewayname: '西安山脉',
          deviceCode: '6541212',
          devicename: '最新设备'
        },
        {
          variableName: '雨量',
          time: '2018-1-1',
          value: '67mm',
          gatewayname: '西安山脉',
          deviceCode: '6541212',
          devicename: '最新设备'
        },
        {
          variableName: '雨量',
          time: '2018-1-1',
          value: '67mm',
          gatewayname: '西安山脉',
          deviceCode: '6541212',
          devicename: '最新设备'
        },
        {
          variableName: '雨量',
          time: '2018-1-1',
          value: '67mm',
          gatewayname: '西安山脉',
          deviceCode: '6541212',
          devicename: '最新设备'
        },
        {
          variableName: '雨量',
          time: '2018-1-1',
          value: '67mm',
          gatewayname: '西安山脉',
          deviceCode: '6541212',
          devicename: '最新设备'
        },
        {
          variableName: '雨量',
          time: '2018-1-1',
          value: '67mm',
          gatewayname: '西安山脉',
          deviceCode: '6541212',
          devicename: '最新设备'
        },
        {
          variableName: '雨量',
          time: '2018-1-1',
          value: '67mm',
          gatewayname: '西安山脉',
          deviceCode: '6541212',
          devicename: '最新设备'
        }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'dataType',
      'dateTimeValue',
      'deviceName',
      'dataTypeValue'
    ])
  },
  mounted: function () {
    this.$store.state.device.dataType = sessionStorage.getItem('dataType')
    this.$store.state.device.dateTimeValue = sessionStorage.getItem('dateTimeValue')
    this.$store.state.device.deviceName = sessionStorage.getItem('deviceName')
    this.$store.state.device.dataTypeValue = sessionStorage.getItem('dataTypeValue')
    for (let i in this.data2) {
      this.data2[i].variableName = this.$store.state.device.dataType
      this.data2[i].time = this.$store.state.device.dateTimeValue
      this.data2[i].value = this.$store.state.device.dataTypeValue
      this.data2[i].devicename = this.$store.state.device.deviceName
    }
    this.timeOut = setTimeout(() => {
      let _this = this
      _this.loading = false
    }, 3000)
    this.$nextTick(function () {
      this.$http.get('../../../static/data/dataTable.json').then(function (res) {
//        this.data1 = res.body.result
//        this.gatewayName = res.data.result
//        this.dataType = res.data.result
//        this.total = res.data.result.length
        this.data = res.body.result
        this.keys = res.body.keys
      })
      this.$http.get('../../../static/data/gatewayStatistics.json').then(function (res) {
        this.list1 = res.body.result
        this.gray_number = 600
      })
      this.$http.get('../../../static/data/dataStatistics.json').then(function (res) {
        this.list2 = res.body.result
        this.gray_number = 600
      })
      this.$http.get('../../../static/data/deviceStatistics.json').then(function (res) {
        this.list3 = res.body.result
        this.gray_number = 600
      })
    })
    $(document).ready(function () {
      $('#tabs li').click(function () {
        var index = $(this).index()
        var divs = $('#tabsBody > div')
        $(this).parent().children('li').attr('class', 'tab-nav')
        $(this).attr('class', 'tab-nav-action')
        divs.hide()
        divs.eq(index).show()
      })
    })
    $('.dataManagement-r-top').click(function () {
      $('.dataManagement-out').slideDown('slow')
    })
    $('.affirm').click(function () {
      $('.dataManagement-out').hide()
      $('.dataManagement-r-bot').show(function () {
        $('.litter').hide()
      })
      return false
    })
    var lastScrollTop = 0
    $('.dataManagement-l .ivu-table-body').scroll(function (event) {
      var st = $(this).scrollTop()
      if (st > lastScrollTop) {
        $('.dataManagement-number').fadeIn('slow')
      } else {
        $('.dataManagement-number').hide()
      }
      lastScrollTop = st
    })
    $('.ivu-table-tbody').on('click', 'tr', (e) => {
      this.$router.push({'path': '/data/detail/DataDetails'})
    })
  },
  methods: {
    addGatewayStyle: function (index) {
      if (this.gatewayIndexArr.indexOf(index) !== -1) {
        this.gatewayIndexArr.splice(this.gatewayIndexArr.indexOf(index), 1)
      } else {
        this.gatewayIndexArr.push(index)
      }
    },
    addDataTypeStyle: function (index) {
      if (this.dataIndexArr.indexOf(index) !== -1) {
        this.dataIndexArr.splice(this.dataIndexArr.indexOf(index), 1)
      } else {
        this.dataIndexArr.push(index)
      }
    },
    addTodoSTCDList () {
      var text = this.newTodo.trim()
      if (text) {
        this.todos.push({
          text: text
        })
      } else {
        this.newTodo = ''
      }
    },
    removeTodo: function (index) {
      this.todos.splice(index, 1)
    },
    resetContent () {
      this.gatewayIndexArr = []
      this.dataIndexArr = []
      this.newTodo = ''
      this.todos = []
    }
  }
}
</script>
<style>
	@import "../../assets/css/data/DataManagement.css";
</style>
