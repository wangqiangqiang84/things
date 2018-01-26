<template>
	
	<div class="conent">
		<div class="informationed">
			<p>网关摸板</p>
			<div class="gat_template">
				<div class="gat_hint" v-for="(template, templateIndex) in returnedResult">
					<p>
						该模板支持以下所有厂商,以及以及各厂商所含型号和各个版本,点击不同的<span>厂商名称</span>与<span>硬件型号</span>查看支持设备。
						<i >
							<span class="classA" ></span>
						</i>
					</p>
					<div class="template_name">
						<!--摸板名称-->
						<ul class="template_one">
							<li>		
								<b>摸板名称:</b>
								<span>{{template.templateName}}</span>
							</li>
							<li>			
								<b>当前版本:</b>
								<span>{{template.currentVersion}}</span>
							</li>
							<li>
								<b>详情描述:</b>
								<span class="span">{{template.detailDescription}}</span>
							</li>
						</ul>
						<!--联动-型号01-->
						<div class="template_tow">
							<p>厂商名称:</p>
							<ul>
								<li v-for="(manufactore, manufactoreIndex) in template.manufactoreName" :class="{'clickBackgroundColor': manufactore.isClick}" @click="clickManufactoreNameFn(templateIndex, manufactoreIndex)">{{manufactore.name}}</li>
							</ul>
						</div>
						<!--01-->
						<div class="cityOne">
							<p>硬件型号:</p>
							<ul class="model_dl">
								<li v-for="(hardwareModel, hardwareModelIndex) in template.hardwareModel" :class="{'clickBackgroundColor': hardwareModel.isClick}" @click="clickHardwareModelFn(templateIndex, hardwareModelIndex)">{{hardwareModel.name}}</li>
							</ul>
							<div class="cityOne_one">
								<p>固件版本:</p>
								<ul class="firmware">
									<li  v-for="(firmwareVersion, firmwareVersionIndex) in template.firmwareVersion"  :class="{'clickBackgroundColor': firmwareVersion.isClick}" @click="clickfirmwareVersionFn(templateIndex, firmwareVersionIndex)">{{firmwareVersion.name}}</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
			
		</div>
	</div>
</template>

<script>
  import $ from 'jquery'
  export default {
    name: 'subject',
    data () {
      return {
        hardwareModelIndex: 0,
        firmwareVersionIndex: 0,
        returnedResult: []
      }
    },
    mounted: function () {
      this.$nextTick(function () {
        this.$http.get('../../../static/gateway/template.json').then(function (res) {
          this.returnedResult = res.data.result
        })
      })
      let templateGatewayId = -1
//  确认创建按钮默认禁止
//  点击网关摸板边框高亮事件
      $('.informationed').on('click', '.gat_hint>p>i>span', function () {
        if ($(this).parents('.gat_hint').index() === templateGatewayId) {
          templateGatewayId = -1
          $('.gat_hintCorlor').removeClass('gat_hintCorlor')
          $('.gat_hints').removeClass('gat_hints')
          $('.template_ones').removeClass('template_ones')
          $('.cityOne_ones').removeClass('cityOne_ones')
          $('.cityOnes').removeClass('cityOnes')
          $('#creation').removeClass('bton')
          $(this).removeClass('classB').addClass('classA')
          $(this).parent().parent().removeClass('gat_hints')
          console.log('取消网关摸板事件触发')
        } else {
          templateGatewayId = $(this).parents('.gat_hint').index()
          $(this).parent().parent().addClass('gat_hints')
          $(this).parent().parent().siblings().children('ul').addClass('template_ones')
          $(this).parent().parent().siblings().children().last().children('div').addClass('cityOne_ones')
          $(this).parent().parent().siblings().children().last('div').addClass('cityOnes')
          $(this).removeClass('classA').addClass('classB')
          $(this).parent().parent().parent().addClass('gat_hintCorlor')
          $('#creation').addClass('bton')
          console.log(' 选择网关摸板事件触发')
        }
      })
    },
    methods: {
      clickManufactoreNameFn: function (templateIndex, manufactoreIndex) {
        // 点击厂商名称的每一项都会请求当前厂商名称所支持的硬件型号和固件版本
        // 点击时把拥有背景色的的厂商名称的判断参数置为false
        // 将点击的当前厂商名称的背景色判断参数置为true
        this.$http.get('../../../static/gateway/template.json').then(function (res) {
          console.log('请求硬件型号的数据')
        })
        this.returnedResult[templateIndex].manufactoreName[$($('.gat_hint')[templateIndex]).find('.template_tow .clickBackgroundColor').index()].isClick = false
        this.returnedResult[templateIndex].manufactoreName[manufactoreIndex].isClick = true
      },
      clickHardwareModelFn: function (templateIndex, hardwareModelIndex) {
        this.$http.get('../../../static/gateway/template.json').then(function (res) {
          console.log('请求固件版本数据')
        })
        this.returnedResult[templateIndex].hardwareModel[$($('.gat_hint')[templateIndex]).find('.model_dl .clickBackgroundColor').index()].isClick = false
        this.returnedResult[templateIndex].hardwareModel[hardwareModelIndex].isClick = true
      },
      clickfirmwareVersionFn: function (templateIndex, firmwareVersionIndex) {
      	this.returnedResult[templateIndex].firmwareVersion[$($('.gat_hint')[templateIndex]).find('.firmware .clickBackgroundColor').index()].isClick = false
        this.returnedResult[templateIndex].firmwareVersion[firmwareVersionIndex].isClick = true
      }
    }
  }
</script>

<style>
@import '../../../assets/css/gateway/Subject.css';
</style>