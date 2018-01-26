<template>
		<div class="mape">
		<div class="hellogat">
			<div class="conent">
				<div class="gateway_information">
					<p>基本信息</p>
					<div class="get_designation">
						<div class="get_designationBox">
							<div class="get_title">
								<p>网关名称:</p><input type="text" id="gatNmae" placeholder="请输入您的网关名称" maxlength="32"   onpaste="return false" oncontextmenu="return false;" onKeypress="javascript:if(event.keyCode == 32)event.returnValue = false;"/>
								  <span></span>
							</div>
							<div class="gateway_ip">
								<p class="get_ip">
									<span>网关</span>IP:
								</p>
								<div class="get_ggp">
									<div v-for="(get, index) in gets" class="get_content1">
										<p class="gateway_number1">
											{{get.IP}}
										</p>
										<p class="gateway_huabe">
											{{get.name}}
										</p>
									</div>
								</div>
							</div>
							<div class="get_title">
								<p>网关端口:</p><input type="text" id="gatPort" placeholder="可用范围10000~20000" maxlength="5"  onpaste="return false" oncontextmenu="return false;" onKeypress="javascript:if(event.keyCode == 32)event.returnValue = false;"/>
								  <span></span>
							</div>
							<div class="get_deal">
								<p class="get_deal_p">
									传输协议:
								</p>
								<div v-for="(tcp, index) in tcps" class="agree">
									<div class="agree_tcp">
										<p>{{tcp.transportType}}</p>
									</div>
									<div class="agree_tcp">
										<p>{{tcp.transportTypes}}</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<Subject></Subject>
		<div class="reminder" >
			<span ></span>
		</div>
	  <div class="template_btn">
			<button class="btnn" @click="hideCreateGatewayFn">取消创建</button>
			<button class="creation" type="button" >确认创建</button>
	</div>
  </div>
</template>

<script>
import $ from 'jquery'
import Subject from './Subject'
export default {
  components: {
    Subject
  },
  data () {
    return {
      defaul: false,
      currentIndex: 0,
      gets: [],
      tcps: []
    }
  },
  methods: {
//  点击取消跳转网关主页
    hideCreateGatewayFn () {
      this.$router.push({path: '/gateway/overview'})
    }
  },
  mounted: function () {
//  当get_ggp中的get_content1被点击时候当前this动态添加selected样式，点击下一个相邻兄弟时移除当前样式。
    $('.get_ggp').on('click', '.get_content1', function () {
      $(this).addClass('selected')
             .siblings()
             .removeClass('selected')
    })
//  当get_designation中的agree>div被点击时候当前this动态添加selected样式，点击下一个相邻兄弟时移除当前样式。
    $('.get_designation').on('click', '.agree>div', function () {
      $(this).addClass('selected')
             .siblings()
             .removeClass('selected')
    })
     //点击确认按钮执行函数，调用自定义验证函数进行判断
    function bind(func1, func2) {
       let func = null
				return function() {
					(!func ? (func = func2, func1) : func).apply(this, arguments)
				}
     }
    $('.creation').click(bind(() => {
			  if (!uname || !uport) {
          gatNmaeCheck()
          getPortCkeck()
          btnClick()
        }
			}, () => {
				window.location.href = 'http://localhost:8081/gateway/overview'
			}))


//  网关名称验证+


    let uname, uport            //  声明变量

//  网关名称验证自定义函数
    function gatNmaeCheck () {
//    动态添加提示图标
      let $unameI = $('#gatNmae').siblings('span')
//    判断正则条件表达式
      let reg = new RegExp("^[A-Za-z0-9\u4e00-\u9fa5]+$")
//    获取输入框里面的值
      let username = document.getElementById("gatNmae").value.trim()
//    判断输入框中的值
      if (!reg.test(username)) {
        $unameI.show().attr('class', 'span_err')
//      提示文本
        $unameI.show().text('1~32个字符，可使用数字、英文和中文')
      } else {
//      $unameEm.hide().attr('class', 'icon_erro')
        $unameI.hide().attr('class', 'span_read')
        $unameI.hide().text()
      }
	//  失去焦点对输入框进行判断
	    $('#gatNmae').blur(function () {
	//  	声明变量保存提示信息
	      let $unameI = $('#gatNmae').siblings('span')
	//    声明正则表达式
	      let reg = new RegExp("^[A-Za-z0-9\u4e00-\u9fa5]+$")
	//    获得输入框中的值
	      let username = document.getElementById("gatNmae").value.trim()
	//    判断输入框中的内容,如果为空不做任何提示
	     if ($('#gatNmae').val()!='') {
	//   	获取手动输入input框中的内容,一次按照条件进行判断做出提示
	     	  if (!reg.test(username)) {  //  错误提示信息
		        $unameI.show().attr('class', 'span_err')
	//	        提示文本
		        $unameI.show().text('1~32个字符，可使用数字、英文和中文')
		      } else {  //  正确提示信息
		        $unameI.hide().attr('class', 'span_read')
		        $unameI.hide().text()
		      }
	      } else if(!reg.test(username)) {
	        $unameI.hide().text()
	      }
	    })
    }






//  网关端口验证自定义函数
    function getPortCkeck () {
//    动态添加提示图标
      let $uportEm = $('#gatPort').siblings('em')
      let $uportI = $('#gatPort').siblings('span')
//    判断正则条件表达式
      let rng = new RegExp("^[0-9]\{5\}$")
//    获取输入框里面的值
      let usernumber = document.getElementById("gatPort").value.trim()
//    判断输入框中的内容,如果为空不做任何提示
      if (!rng.test(usernumber)) {
        $uportI.show().attr('class', 'span_err')
//      提示文本
        $uportI.show().text('5个字符，只可使用数字')
      } else {
        $uportEm.hide().attr('class', 'icon_erro')
        $uportI.hide().attr('class', 'span_read')
        $uportI.hide().text()
      }
	//  失去焦点对输入框进行判断
	    $('#gatPort').blur(function () {
	//  	声明变量保存提示信息
	      let $unameI = $('#gatPort').siblings('span')
	//    声明正则表达式
	      let rng = new RegExp("^[0-9]\{5\}$")
	//    获得输入框中的值
	      let usernumber = document.getElementById("gatPort").value.trim()
	//    判断输入框中的内容,如果为空不做任何提示
	     if ($('#gatPort').val()!='') {
	//   	获取手动输入input框中的内容,一次按照条件进行判断做出提示
	     	  if (!rng.test(usernumber)) {  //  错误提示信息
		        $unameI.show().attr('class', 'span_err')
	//	        提示文本
		        $unameI.show().text('5个字符，只可使用数字')
		      } else {  //  正确提示信息
		        $unameI.hide().attr('class', 'span_read')
		        $unameI.hide().text()
		      }
	      } else if (!rng.test(usernumber)) {
//	        如果默认都为空这届跳出来默认选择
	        $unameI.hide().text()
	      }
	    })
    }
    function btnClick () {
//    声明变量默认都为fals不可点击
      let get_ggp, agree, gat_template= 'false'
//    获取指定元素下标及值
      $('.gateway_ip .get_ggp .get_content1').each(function (index, element) {
//      声明变量将需要动态加的元素class属性保存在变量中
        let className = $(element).attr('class')
//      如果变量被选中动态加载样式属性
        if (className.includes('selected')) {
//        当前选中为true
          get_ggp = true
        	return
        }
      })

      $('.agree div').each(function (index, element) {
        let className = $(element).attr('class')
        if (className.includes('selected')) {
          agree = true
        	return
        }
      })

      $('.gat_template .gat_hint').each(function (index, element) {
        let className = $(element).attr('class')
        if (className.includes('gat_hintCorlor')) {
          gat_template = true
        	return
        }
      })
//    当元素被选中的的时候提示信息隐藏
      $('.gateway_ip .get_ggp .get_content1, .agree div, .gat_template .gat_hint').click(function () {
        $('.reminder span').html('')
      })
      if (get_ggp, agree, gat_template) {
//    如果都没有被点击
	      if ((get_ggp, agree, gat_template) == true) {
//	          如果都被点击选中 默认为 ==true
//        设提示心中的内容为空
//          所有属性等于false
//            退出return
	        $('.reminder span').html('')
	                           .css('visibility','')
	                           get_ggp = false
	                           agree = false
	                           gat_template = false
	                           return
	      }

	      if ((get_ggp, agree) == true) {
	        $('.reminder span').html('请选择网关模板')
	                           .css('visibility','visible')
	                           get_ggp = false
	                           agree = false
	                           gat_template = false
	                           return
	      }
	      if ((get_ggp) == true) {
	        $('.reminder span').html('请选择网关协议和网关模板')
	                           .css('visibility','visible')
	                           get_ggp = false
	                           agree = false
	                           gat_template = false
	                           return
	      }
//    退出，提示警告信息
	      $('.reminder span').html('请选择网关IP，网关协议和网关模板')
                         .css('visibility','visible')
      }
//    直接返回提示警告信息
      $('.reminder span').html('请选择网关IP，网关协议和网关模板')
                         .css('visibility','visible')
    }

//  动态加载json数据地址
    this.$nextTick(function () {
      this.$http.get('../../../static/gateway/template.json').then(function (res) {
        this.gets = res.data.getsArr
        this.tcps = res.data.tcpsArr
      })
    })
  }
}
</script>

<style>
@import '../../../assets/css/gateway/Establish.css';

</style>
