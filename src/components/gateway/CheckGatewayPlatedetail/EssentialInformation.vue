<template>
<div class="widget-bodys">	
	<div class="content">
		<p>基本信息</p>
		<div class="essential ">
			<div class="message_box"  v-for="(template, index) in messagesTemplates">
				<!--名称-->
				<ul class="messageBox_userName">
					<li v-for="(message, index) in template.messages">
						<span>{{message.templateName}}</span>
						<span>{{message.templateVersion}}</span>
						<span>{{message.createUser}}</span>
						<span>{{message.createTime}}</span>
						<span>{{message.modifyUser}}</span>
						<span>{{message.modifyTime}}</span>
					</li>
			  </ul>
			  <!--数据-->
			  <ul class="messageBox_userData">
					<li v-for="(template, index) in template.templates">
						<span>{{template.templateName}}</span>
						<span>{{template.templateVersion}}</span>
						<span>{{template.modifyUserName}}</span>
						<span>{{template.createTime}}</span>
						<span>{{template.createUserName}}</span>
						<span>{{template.modifyTime}}</span>
					</li>
			  </ul>
			</div>
		  <!--详情描述-->
		  <div class="messageBox_describe">
		  	<div class="detail_description" >
		  		<p>详情描述:</p><span v-html="messag"></span>
		  	</div>
		  </div>
		</div>
	</div>
	<div class="conten">
		<p>认证设备</p>
			<div class="equipment_box" v-for="(template, templateIndex) in returnedResult">
				<p>改摸板支持以下所有厂商,以及以及各厂商所含型号和各个版本,点击不同的<span>厂商名称</span>与<span>硬件型号</span>查看支持设备。
				</p>
				<div class="equipment_name">
					<!--联动-型号01-->
					<div class="equipment_name_one">
						<p>厂商名称:</p>
						<ul>
							<li v-for="(manufactore, manufactoreIndex) in template.manufactoreName" :class="{'clickBackgroundColor': manufactore.isClick}" @click="clickManufactoreNameFn(templateIndex, manufactoreIndex)">{{manufactore.name}}</li>
						</ul>
					</div>
		     <div class="equipment_cityOne">
							<p>硬件型号:</p>
							<ul class="model_dl">
								<li v-for="(hardwareModel, hardwareModelIndex) in template.hardwareModel" :class="{'clickBackgroundColor': hardwareModel.isClick}" @click="clickHardwareModelFn(templateIndex, hardwareModelIndex)">{{hardwareModel.name}}</li>
							</ul>
							<div class="equipment_cityOnes">
								<p>固件版本:</p>
								<ul>
									<li v-for="(firmwareVersion, firmwareVersionIndex) in template.firmwareVersion">{{firmwareVersion.name}}</li>
								</ul>
							</div>
						</div>
					
					</div>
			</div>
		<div class="click_back ">
			<router-link to="/gateway/GatewayDeta/GatewayDetail">
				<button type="button" class="delteGateway">返回</button>
			</router-link>
		</div>
	</div>
</div>
</template>

<script>
import $ from 'jquery'
export default {
  data () {
    return {
      returnedResult: [],
      messag: ' 现在的中国正在科技大爆发，并且规模越来越大，科技成果输出在以远远快于经济成长的速度成长.中国现在每年产出科技成果.科技正在以远远远远快于经济成长速度成长果输出在以远.输出在在以远远远远快于经济成长速度成长果输出在以远输出在在以远远远远快于经济成长速度成长果输出在以远输出在在以远远远.',
      messagesTemplates: []
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      this.$http.get('../../../../static/gateway/Essential.json').then(function (res) {
        this.returnedResult = res.data.result
        this.messagesTemplates = res.data.result
      })
    })
  },
  methods: {
    clickManufactoreNameFn: function (templateIndex, manufactoreIndex) {
      this.$http.get('../../../../static/gateway/Essential.json').then(function (res) {
        console.log('请求硬件型号的数据')
      })
      this.returnedResult[templateIndex].manufactoreName[$($('.equipment_box')[templateIndex]).find('.equipment_name_one .clickBackgroundColor').index()].isClick = false
      this.returnedResult[templateIndex].manufactoreName[manufactoreIndex].isClick = true
    },
    clickHardwareModelFn: function (templateIndex, hardwareModelIndex) {
      this.$http.get('../../../../static/gateway/Essential.json').then(function (res) {
        console.log('请求固件版本数据')
      })
      this.returnedResult[templateIndex].hardwareModel[$($('.equipment_box')[templateIndex]).find('.model_dl .clickBackgroundColor').index()].isClick = false
      this.returnedResult[templateIndex].hardwareModel[hardwareModelIndex].isClick = true
    }
  }
}
</script>

<style>
@import '../../../assets/css/gateway/EssentialInformation.css';

</style>