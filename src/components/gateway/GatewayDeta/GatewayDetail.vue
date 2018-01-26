<template>
	<div class="gatewayDetail">
		<div class="mask" ref="mask" :style="{ top: '-' + distanceTop + 'px', left: '-' + distanceLeft + 'px'}"></div>
		<!-------------功能模块 --------------->
		<div class="gatewayDetail-one">
			<div class="gatewayDetail-one-box">
				<div class="gatewayDetail-one-l">
					<h1 v-text="messageArr"></h1>
				</div>
				<div class="gatewayDetail-one-c">
					<div class="gatewayDetail-one-c-top">
						<div class="testBox">
							<label  v-text="nameValue" class="nameValue" ></label>
						    <button type="button" class="alterGateway"  @click="showIdentificationAndCancelGatewayNameBtnFn">修改</button>
						</div>
						<ul class="gatewayDetail-one-c-bot4">
							<li v-for="(u,index) in gateways">
								<h3>{{u.EstablishUser}}</h3>
								<span>{{u.createUserName}}</span>
								<h3>{{u.EstablishTime}}</h3>
								<span>{{u.createTime}}</span>
							</li>
					    </ul>
					     
					</div>
					<!--弹出框提示-->
					<div class="hintArea" v-show="showHintArea">
						<div class="" v-show="modifyFn">
							<div v-text="modifyContent" class="modifyContent"></div>
							<textarea v-model="message" @keyup="getMessage"></textarea>
							<p v-text="warningTips" class="warningTips"></p>
							<div class="clickEvent">
								<button type="button" id="btn2"  @click='wordOutGatewayName' class="wordOut">取消</button>
								<button type="button" id="btn1"  @click='wordInGatewayName' class="wordIn">确认</button>
							</div>
						</div>
			        </div>		    
			        <div class="hintArea_delet" v-show="showDeleInformation">
						<div class="" v-show="modifyFn">
							<div v-text="modifyContent" class="modifyContent"></div>
							<textarea v-model="mesag" @keyup="getMessage"></textarea>
							<p v-text="warningTip" class="warningTip">454</p>
							<div class="clickEvent" v-show="show">
								<button type="button" id="btn1"  @click='wordDeleInformation' class="wordCall">取消</button>
								<button type="button" id="btn2"  @click='wordInGatewayFfirm' class="wordaFfirm">确认</button>
							</div>
							<div class="clickEvents" v-show="hide">
								<button type="button" id="btn1"  @click='wordDeleInformation' class="wordCall">取消</button>
								<router-link to="/gateway/overview">
								  <button type="button" id="btn3"  @click='wordInGatewayConfirm' class="wordaConfirm">确认</button>
								</router-link>
							</div>
						</div>
			        </div>
					<div class="gatewayDetail-one-c-bot">
						<ul class="gatewayDetail-one-c-bot1">
							<li>
								<h3>网关状态:</h3>
								<span :class="{ statusToggle: statusGatewayToggle }" v-text="statusContentToggle"></span>
								<button type="button"  v-text="statusBtnToggle" @click="statusGatewayToggleFn"></button>
							</li> 
							<li>
								<h3>IP:</h3>
								<span>61.150.43.161</span>
							</li>
							<li>
								<h3>网关端口:</h3>
								<input v-model="messages" :readonly="isReviseGatewayPort" type="text"/>
								<button type="button" class="alterGateway"  @click="showIdentificationAndCancelGatewayPortBtnFn">修改</button>
							</li>
						</ul>
						<!--摸板名称-->
						<ul class="gatewayDetail-one-c-bot2">
							<li v-for="(isName, index) in isNames">
								<h3>{{isName.templateName}}</h3>
								<span><router-link to="/gateway/CheckGatewayPlatedetail/EssentialInformation">{{isName.gatewayID}}</router-link></span>
								<h3>{{isName.currentVersion}}</h3>
								<span>{{isName.templateVersion}}</span>
								<h3>{{isName.transportProtocol}}</h3>
								<span>{{isName.transportType}}</span>
							</li>
						</ul>
					    <ul class="gatewayDetail-one-c-bot3">
							<li v-for="(u,index) in gateways">
								<h3>{{u.LastRuntime}}</h3>
								<span>{{u.RuntimeLength}}</span>
								<h3>{{u.LastStoptime}}</h3>
								<span>{{u.startTime}}</span>
							</li>
					    </ul>
					    
				   </div>
				</div>
			</div>
			<div class="gatewayDetail-one-b">
				<h3>详情描述：</h3>
				<span v-once> {{msg}}</span>
		    </div>
		    <div class="gatewayDetail-one-btn">
		        <router-link to="/device/create/createDevice">
		      	    <button class="dataFlowBtn">增加设备</button>
		        </router-link>
		        <router-link to="/gateway/GatewayDeta/DataTelemetry">
		      	    <button class="dataFlowBtn">数据遥测</button>
		        </router-link>
		        <router-link to="/device/detail/authorizaiton/overview">
		      	    <button class="dataFlowBtn">账户授权</button>
		        </router-link>
	       </div>
		</div>
		<!---------------- 统计模块 ------------------->
		<div class="gatewayDetail-two">
			<ul>
				<li>
					<h2>设备信息</h2>
				</li>
				<li class="gatewayDetail-two-top">
					<div class="gatewayDetail-two-top-box1">
						<span></span>
						<h3>当前在线:</h3>
						<p v-model="num">{{num}}</p>
					</div>					
					<div class="box" :style="{width: box + '%'}">
                        <div class="box1" :style="{width: num/(num1+num2)*100 + '%'}">
                        </div>
                    </div>
                    <div class="gatewayDetail-two-top-box1">
                    	
                    </div>
				</li>
				<li class="gatewayDetail-two-bot">
					<div class="gatewayDetail-two-top-box1">
						<span></span>
						<h3>已注册数:</h3>
						<p v-model="num1">{{ num1 }}</p>
					</div>
	                <div class="big_box" :style="{width: big_box + '%'}">
	                    <div class="small_box" :style="{width: num1/(num1+num2)*100 + '%'}">
	                    </div>
	                </div>
	                <div class="gatewayDetail-two-top-box1">
		        	    <h3 class="hh">剩余容量:</h3>
						<p class="p2" v-model="num2">{{ num2 }}</p>
						<span class="span2"></span>
					</div>
				</li>
			</ul>
		</div>
		<!----------------- 历史记录模块 -------------------->
		<div class="gatewayDetailthree">
	  	    <h2>历史日志</h2>
		    <ul id="demoContent" class="demoContent"></ul>
			<ul class="page" id="page"></ul>
		</div>
	    <!----------------- 删除网关 -------------------->
		<div class="gatewayDetail-delete">
			<button type="button" class="delteGateway" @click="deleteGateway">删除网关</button>
		</div>
	</div>
</template>
<script type='text/ecmascript-6'>
import $ from 'jquery'
export default {
  data () {
    return {
      num: 72,
      num1: 120,
      num2: 380,
      nameValue: '陕西图像站',
      mesag: '',
      message: '',
      messages: '90912',
      msg: '现在的中国正在科技大爆发，并且规模越来越大，科技成果输出在以远远快于经济成长速度成长',
      messageArr: [],
      showHintArea: false,
      showDeleInformation: false,
      modifyFn: false,
      show: true,
      hide: false,
      modifyContent: '',
      warningTips: '',
      warningTip: '',
      isReviseGatewayPort: true,
      statusContentToggle: '运行中',
      statusBtnToggle: '停止',
      statusGatewayToggle: false,
      gateways: [],
      isNames: [],
      box: '',
      big_box: '',
      distanceTop: 0,
      distanceLeft: 0
    }
  },

  mounted () {
    //监测当前浏览器的宽度
    window.addEventListener('resize', this.handleResize)
    this.$nextTick(function () {
    this.handleResize()
    this.$http.get('../../../../static/gateway/historyLog.json').then(function (res) {
        this.gateways = res.body.result
     })
//    单个网关详情与网关概况极小部分公用属性json数据接口
      this.$http.get('../../../../static/gateway/ContentFill.json').then(function (res) {
        this.isNames = res.body.isNames
      })
    })
    this.messageArr = this.nameValue[0]
    $(document).ready(function(){
		  var datas = [{
					"did": 1,
					"name": "又降价",
					"namex": '某某人在分停止了某某网关',
					"time": '2017-07-12'
				},
				{
					"did": 10,
					"name": "又降价",
					"namex": '某某人在分停止了某某网关',
					"time": '2017-07-12'
				},
				{
					"did": 10,
					"name": "又降价",
					"namex": '某某人在分停止了某某网关',
					"time": '2017-07-12'
				},
				{
					"did": 10,
					"name": "又降价",
					"namex": '某某人在分停止了某某网关',
					"time": '2017-07-12'
				},
				{
					"did": 10,
					"name": "又降价",
					"namex": '某某人在分停止了某某网关',
					"time": '2017-07-12'
				},
				{
					"did": 10,
					"name": "又降价",
					"namex": '某某人在分停止了某某网关',
					"time": '2017-07-12'
				},
				{
					"did": 10,
					"name": "又降价",
					"namex": '某某人在分停止了某某网关',
					"time": '2017-07-12'
				},
				{
					"did": 10,
					"name": "又降价",
					"namex": '某某人在分停止了某某网关',
					"time": '2017-07-12'
				},
				{
					"did": 10,
					"name": "又降价",
					"namex": '某某人在分停止了某某网关',
					"time": '2017-07-12'
				},
				{
					"did": 10,
					"name": "又降价",
					"namex": '某某人在分停止了某某网关',
					"time": '2017-07-12'
				},
				{
					"did": 10,
					"name": "又降价",
					"namex": '某某人在分停止了某某网关',
					"time": '2017-07-12'
				},
				{
					"did": 10,
					"name": "又降价",
					"namex": '某某人在分停止了某某网关',
					"time": '2017-07-12'
				},
				{
					"did": 10,
					"name": "又降价",
					"namex": '某某人在分停止了某某网关',
					"time": '2017-07-12'
				},
				{
					"did": 10,
					"name": "又降价",
					"namex": '某某人在分停止了某某网关',
					"time": '2017-07-12'
				},
				{
					"did": 10,
					"name": "又降价",
					"namex": '某某人在分停止了某某网关',
					"time": '2017-07-12'
				},
				{
					"did": 10,
					"name": "又降价",
					"namex": '某某人在分停止了某某网关',
					"time": '2017-07-12'
				},
				{
					"did": 10,
					"name": "又降价",
					"namex": '某某人在分停止了某某网关',
					"time": '2017-07-12'
				},
				{
					"did": 10,
					"name": "又降价",
					"namex": '某某人在分停止了某某网关',
					"time": '2017-07-12'
				},
				{
					"did": 10,
					"name": "又降价",
					"namex": '某某人在分停止了某某网关',
					"time": '2017-07-12'
				},
				{
					"did": 10,
					"name": "又降价",
					"namex": '某某人在分停止了某某网关',
					"time": '2017-07-12'
				},
				{
					"did": 10,
					"name": "又降价",
					"namex": '某某人在分停止了某某网关',
					"time": '2017-07-12'
				},
				{
					"did": 10,
					"name": "又降价",
					"namex": '某某人在分停止了某某网关',
					"time": '2017-07-12'
				},
				{
					"did": 10,
					"name": "又降价",
					"namex": '某某人在分停止了某某网关',
					"time": '2017-07-12'
				},
				{
					"did": 10,
					"name": "又降价",
					"namex": '某某人在分停止了某某网关',
					"time": '2017-07-12'
				},
				{
					"did": 10,
					"name": "又降价",
					"namex": '某某人在分停止了某某网关',
					"time": '2017-07-12'
				},
				{
					"did": 10,
					"name": "又降价",
					"namex": '某某人在分停止了某某网关',
					"time": '2017-07-12'
				},
				{
					"did": 10,
					"name": "又降价",
					"namex": '某某人在分停止了某某网关',
					"time": '2017-07-12'
				},
				{
					"did": 10,
					"name": "又降价",
					"namex": '某某人在分停止了某某网关',
					"time": '2017-07-12'
				},
				{
					"did": 10,
					"name": "又降价",
					"namex": '某某人在分停止了某某网关',
					"time": '2017-07-12'
				},
				{
					"did": 10,
					"name": "又降价",
					"namex": '某某人在分停止了某某网关',
					"time": '2017-07-12'
				},
				{
					"did": 10,
					"name": "又降价",
					"namex": '某某人在分停止了某某网关',
					"time": '2017-07-12'
				}
			]
		  var options = {
		    "id": "page", //显示页码的元素
		    "data": datas, //显示数据
		    "maxshowpageitem": 5, //最多显示的页码个数
		    "pagelistcount": 4, //每页显示数据个数
		    "callBack": function(result) {
		      var cHtml = "";
		      for(var i = 0; i < result.length; i++) {
		        cHtml += "<li>" + "<p>" + result[i].name + "</p>" + "<h3>" +result[i].namex + "</h3>" + "<span>" + result[i].time + "</span>" + "</li>"; //处理数据
		      }
		      $("#demoContent").html(cHtml); //将数据增加到页面中
		    }
			}
		  var page = {
				"pageId": "",
				"data": null,
				"maxshowpageitem": 5, //最多显示的页码个数
				"pagelistcount": 10, //每一页显示的内容条数
				"init": function(listCount, currentPage, options) {
					this.data = options.data,
						this.pageId = options.id,
						this.maxshowpageitem = options.maxshowpageitem, //最多显示的页码个数
						this.pagelistcount = options.pagelistcount //每一页显示的内容条数
					page.initPage(listCount, currentPage);
				},
		
				"initPage": function(listCount, currentPage) {
					var maxshowpageitem = page.maxshowpageitem;
					if(maxshowpageitem != null && maxshowpageitem > 0 && maxshowpageitem != "") {
						page.maxshowpageitem = maxshowpageitem;
					}
					var pagelistcount = page.pagelistcount;
					if(pagelistcount != null && pagelistcount > 0 && pagelistcount != "") {
						page.pagelistcount = pagelistcount;
					}
					page.pagelistcount = pagelistcount;
					if(listCount < 0) {
						listCount = 0;
					}
					if(currentPage <= 0) {
						currentPage = 1;
					}
		
					page.setPageListCount(listCount, currentPage);
				},
				/**
				 * 初始化分页界面
				 * @param listCount 列表总量
				 */
				"initWithUl": function(listCount, currentPage) {
					var pageCount = 1;
					if(listCount >= 0) {
						var pageCount = listCount % page.pagelistcount > 0 ? parseInt(listCount / page.pagelistcount) + 1 : parseInt(listCount / page.pagelistcount);
					}
					var appendStr = page.getPageListModel(pageCount, currentPage);
					$("#" + page.pageId).html(appendStr);
				},
				/**
				 * 设置列表总量和当前页码
				 * @param listCount 列表总量
				 * @param currentPage 当前页码
				 */
				"setPageListCount": function(listCount, currentPage) {
					listCount = parseInt(listCount);
					currentPage = parseInt(currentPage);
					page.initWithUl(listCount, currentPage);
					page.initPageEvent(listCount);
					page.viewPage(currentPage, listCount, page.pagelistcount, page.data)
					//      fun(currentPage);
				},
				//页面显示功能
				"viewPage": function(currentPage, listCount, pagelistcount, data) {
					var NUM = listCount % pagelistcount == 0 ? listCount / pagelistcount : parseInt(listCount / pagelistcount) + 1;
					if(currentPage == NUM) {
						var result = data.slice((currentPage - 1) * pagelistcount, data.length);
					} else {
						var result = data.slice((currentPage - 1) * pagelistcount, (currentPage - 1) * pagelistcount + pagelistcount);
					}
					options.callBack(result);
				},
				"initPageEvent": function(listCount) {
					$("#" + page.pageId + ">li[class='pageItem']").on("click", function() {
						page.setPageListCount(listCount, $(this).attr("page-data"), page.fun);
					});
				},
				"getPageListModel": function(pageCount, currentPage) {
					var prePage = currentPage - 1;
					var nextPage = currentPage + 1;
					var prePageClass = "pageItem";
					var nextPageClass = "pageItem";
					if(prePage <= 0) {
						prePageClass = "pageItemDisable";
					}
					if(nextPage > pageCount) {
						nextPageClass = "pageItemDisable";
					}
					var appendStr = "";
					appendStr += "<li class='" + prePageClass + "' page-data='1' page-rel='firstpage'>首页</li>";
					appendStr += "<li class='" + prePageClass + "' page-data='" + prePage + "' page-rel='prepage'>&lt;上一页</li>";
					var miniPageNumber = 1;
					if(currentPage - parseInt(page.maxshowpageitem / 2) > 0 && currentPage + parseInt(page.maxshowpageitem / 2) <= pageCount) {
						miniPageNumber = currentPage - parseInt(page.maxshowpageitem / 2);
					} else if(currentPage - parseInt(page.maxshowpageitem / 2) > 0 && currentPage + parseInt(page.maxshowpageitem / 2) > pageCount) {
						miniPageNumber = pageCount - page.maxshowpageitem + 1;
						if(miniPageNumber <= 0) {
							miniPageNumber = 1;
						}
					}
					var showPageNum = parseInt(page.maxshowpageitem);
					if(pageCount < showPageNum) {
						showPageNum = pageCount;
					}
					for(var i = 0; i < showPageNum; i++) {
						var pageNumber = miniPageNumber++;
						var itemPageClass = "pageItem";
						if(pageNumber == currentPage) {
							itemPageClass = "pageItemActive";
						}
		
						appendStr += "<li class='" + itemPageClass + "' page-data='" + pageNumber + "' page-rel='itempage'>" + pageNumber + "</li>";
					}
					appendStr += "<li class='" + nextPageClass + "' page-data='" + nextPage + "' page-rel='nextpage'>下一页&gt;</li>";
					appendStr += "<li class='" + nextPageClass + "' page-data='" + pageCount + "' page-rel='lastpage'>尾页</li>";
					return appendStr;
				}
			}
		  page.init(datas.length, 1, options);
		})
  },
  methods: {
//   网关名称修改

//    网关状态修改，点击按钮 
    statusGatewayToggleFn () {
      this.statusGatewayToggle = !this.statusGatewayToggle
      this.toggleFn(this.statusGatewayToggle)
    },
    toggleFn (state) {
      if (state) {
        this.statusContentToggle = '已停止'
        this.statusBtnToggle = '启动'
      } else {
        this.statusContentToggle = '运行中'
        this.statusBtnToggle = '停止'
      }
    },
//    网关名称修改
//    当前提示框显示
//    当前输入框内容为空
//    当前警告提示框内容为空
//    当前修改的事件框为 ‘修改网关名称’
//    父级动态添加遮罩层显示
//    html样式溢出隐藏滚动事件，防止鼠标滚动引遮罩层滚动事件
    showIdentificationAndCancelGatewayNameBtnFn () {
      this.modifyFn = true
      this.showHintArea = true
      this.showDeleInformation = false
      this.message = ''
      this.warningTips = ''
      this.modifyContent = '修改网关名称'
      $('.gatewayDetail .mask').css('display', 'block')
      $('html').css('overflow', 'hidden')
    },
//    网关端口修改
//    当前提示框显示
//    当前输入框内容为空
//    当前警告提示框内容为空
//    当前修改的事件框为 ‘修改网关端口’
//    父级动态添加遮罩层显示
//    html样式溢出隐藏滚动事件，防止鼠标滚动引遮罩层滚动事件    
    showIdentificationAndCancelGatewayPortBtnFn () {
      this.modifyFn = true
      this.showHintArea = true
      this.showDeleInformation = false
      this.message = ''
      this.warningTips = ''
      this.modifyContent = '修改网关端口'
      $('.gatewayDetail .mask').css('display', 'block')
      $('html').css('overflow', 'hidden')
    },
    

//    确认提交
    wordInGatewayName (event) {
//    如果当前修改的是‘修改网关名称’
      if (this.modifyContent === '修改网关名称'){
      //  如果当前输入框内容为空或者符合当前正则判断条件
      //  不符合当前判断条件时，警告提示框显示错误信息
        if (!(new RegExp(/^[\u4e00-\u9fa5_a-zA-Z0-9]{1,32}$/).test(this.message)) || this.message === ''){
          this.warningTips = '1~32个字符，可使用数字、英文和中文'
        }else {  //  否则
        //  将当前输入值付到输入框中
        //  弹出框隐藏
        //  父级动态添加遮罩层隐藏
        //  html中样式清除
          this.nameValue = this.message
          this.showHintArea = false
          $('.gatewayDetail .mask').css('display', 'none')
          $('html').css('overflow', '')
        }
      } else if (this.modifyContent === '修改网关端口') {
    //    如果当前修改的是‘修改网关名称’
        //  如果当前输入框内容为空或者符合当前正则判断条件
        //  不符合当前判断条件时，警告提示框显示错误信息
        if (!(new RegExp(/^[0-9]{5}$/).test(this.message)) || this.message === ''){
          this.warningTips = '5个字符，只可使用数字'
        } else {  //  否则
        //  将当前输入值付到输入框中
        //  弹出框隐藏
        //  父级动态添加遮罩层隐藏
        //  html中样式清除
          this.messages = this.message
          this.showHintArea = false
          $('.gatewayDetail .mask').css('display', 'none')
          $('html').css('overflow', '')
        }
      }
    //  获得当前输入框中的第一个下标付值给当前显示内容区
      this.messageArr = this.nameValue[0]
    },
    
//  对每一次输入的内容进行判断
    getMessage () {
    //  如果当前修改的是‘修改网关名称’
      //  如果输入内容与正则判断相符
        //  当前警告提示为空
      if (this.modifyContent === '修改网关名称'){
        if ((new RegExp(/^[\u4e00-\u9fa5_a-zA-Z0-9]{1,32}$/).test(this.message))){
          this.warningTips = ''
        }
      }
    //  如果当前修改的是‘修改网关端口’
      //  如果输入内容与正则判断相符
        //  当前警告提示为空
      if (this.modifyContent === '修改网关端口') {
        if ((new RegExp(/^[0-9]{1,5}$/).test(this.message))){
          this.warningTips = ''
        }
      }
      if (this.modifyContent === '请输入网关名称确认删除') {
        if ((new RegExp(/^[\u4e00-\u9fa5_a-zA-Z0-9]{1,32}$/).test(this.message)) != this.mesag || this.mesag === '' ) {
          this.warningTip = '要删除的名称与原网关名称不符，请重新输入'
          this.show = true
          this.hide = false
        } else if ((new RegExp(/^[\u4e00-\u9fa5_a-zA-Z0-9]{1,32}$/).test(this.message)) == this.mesag || this.mesag === ''){
        	this.show = false
        	this.hide = true
          this.warningTip = '删除后不可重复！确定要删除次网关吗？'
        }
      }
    },
    
//  点击修改取消按钮事件
    wordOutGatewayName () {
    //  当前弹出框隐藏
    //  父级动态添加遮罩层隐藏
        //  html中样式清除
      this.showHintArea = false
      $('.gatewayDetail .mask').css('display', 'none')
      $('html').css('overflow', '')
    },
    
    
//  点击删除网关
    deleteGateway () {
      this.mesag = ''
      this.modifyFn = true
      this.showHintArea = false
      this.showDeleInformation = true
      this.modifyContent = '请输入网关名称确认删除'
      $('.gatewayDetail .mask').css('display', 'block')
    },
    
    
//  点击删除取消按钮事件
    wordDeleInformation () {
    //  当前弹出框隐藏
    //  父级动态添加遮罩层隐藏
        //  html中样式清除
      this.showHintArea = false
      this.showDeleInformation = false
      this.warningTip = ''
      $('.gatewayDetail .mask').css('display', 'none')
    },
    
    
//  点击确认对用户输入的删除名称进行值传递判断
    wordInGatewayFfirm (event) {
      if (this.modifyContent === '请输入网关名称确认删除') {
        if (this.nameValue != this.mesag ) {
          this.warningTip = '要删除的名称与原网关名称不符，请重新输入'
          this.show = true
          this.hide = false
        } else if (this.nameValue == this.mesag){
        	this.show = false
        	this.hide = true
          this.warningTip = '删除后不可重复！确定要删除此网关吗？'
        }
      }
    },
    wordInGatewayConfirm (event) {
      if (this.modifyContent === '请输入网关名称确认删除') {
         if (this.nameValue === this.mesag){
        	this.hide = true
          this.show = false
        }
      }
    },
    handleResize (mask) {}
  }
}
</script>

<style>
	@import "../../../assets/css/gateway/GatewayDetail.css";
	@import "../../../assets/css/gateway/GatewayDetailthree/GatewayDetailthree.css";
</style>
