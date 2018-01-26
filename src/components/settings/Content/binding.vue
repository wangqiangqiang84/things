<template>
	<div class="binding">
		<div class="binding-content">
			<div class="telContent">
				<ul>
			       	<li>
				       	<label>你的手机号</label>
			       		<div class="lineBox">
			       			<input type="tel" @blur="telOnblurFn()" v-model="telUsername" onKeypress="javascript:if(event.keyCode == 32)event.returnValue = false;"/>
			       		    <span v-show="showTelTishi1">{{TelTishi1}}</span>
			       		</div>
			       		<button type="button" class="telBtn" v-show="isShowTelBtn" @click="bindTelFn">绑定手机</button>
			       	</li>
			       	<li v-show="isShowTelCode">
			       		<label>手机验证码</label>
			       		<div class="lineBox">
			       			<input @blur="telCodeOnblurFn()" type="text" v-model="telCode" onKeypress="javascript:if(event.keyCode == 32)event.returnValue = false;"  />
			       			<span v-show="showTelTishi2">{{TelTishi2}}</span>
			       		</div>
			       	</li>
			       	<li v-show="isShowLoginpas">
			       		<label>登录密码</label>
			       		<div class="lineBox">
			       			<input @blur="passwordOnblurFn()" type="password" v-model="password" onKeypress="javascript:if(event.keyCode == 32)event.returnValue = false;" />
			       			<span v-show="showTelTishi3">{{TelTishi3}}</span>
			       		</div>
			       	</li>
			   </ul>
			   <div class="finishForm" id="finishBindingForm" v-show="isShowTelBtns">
			        <button type="button" @click="isHideTelTextPreserve">保存</button>
			        <button type="button" @click="isHideTelTextCancel">取消</button>
			   </div>
			</div>
			<div class="emailContent">
				<ul>
			       	<li>
				       	<label>你的邮箱号</label>
			       		<div class="lineBox">
			       			<input type="email" @blur="emailOnblurFn()" v-model="emailUsername" onKeypress="javascript:if(event.keyCode == 32)event.returnValue = false;"/>
			       		    <span v-show="showEmailTishi1">{{EmailTishi1}}</span>
			       		</div>
			       		<button type="button" class="emailBtn" v-show="isShowEmailBtn" @click="bindEmailFn">绑定邮箱</button>
			       	</li>
			       	<li v-show="isShowEmailCode">
			       		<label>邮箱验证码</label>
			       		<div class="lineBox">
			       			<input type="text" @blur="emailCodeOnblurFn()" v-model="emailCode" onKeypress="javascript:if(event.keyCode == 32)event.returnValue = false;"  />
			       			<span v-show="showEmailTishi2">{{EmailTishi2}}</span>
			       		</div>
			       	</li>
			   </ul>
			   <div class="finishForm" id="finishBindingForm" v-show="isShowEmailBtns">
			        <button type="button" @click="isHideEmailTextPreserve">保存</button>
			        <button type="button" @click="isHideEmailTextCancel">取消</button>
			   </div>
			</div>
			<div class="thirdPartyLogin">
				<span class="qqLogin"><i class="fa fa-qq"></i></span>
				<span class="weixinLogin"><i class="fa fa-weixin"></i></span>
			</div>
		</div>
	</div>
</template>

<script>
export default {
  name: 'Binding',
  data () {
    return {
      isShowTelBtn: true,
      isShowTelCode: false,
      isShowLoginpas: false,
      isShowTelBtns: false,
      isShowEmailBtn: true,
      isShowEmailCode: false,
      isShowEmailBtns: false,
      showTelTishi1: true,
      showTelTishi2: true,
      showTelTishi3: true,
      TelTishi1: '',
      TelTishi2: '',
      TelTishi3: '',
      telUsername: '',
      telCode: '',
      password: '',
      showEmailTishi1: true,
      showEmailTishi2: true,
      EmailTishi1: '',
      EmailTishi2: '',
      emailUsername: '',
      emailCode: ''
    }
  },
  methods: {
    bindTelFn () {
      this.isShowTelBtn = !this.isShowTelBtn
      this.isShowTelCode = !this.isShowTelCode
      this.isShowLoginpas = !this.isShowLoginpas
      this.isShowTelBtns = !this.isShowTelBtns
    },
    bindEmailFn () {
      this.isShowEmailBtn = !this.isShowEmailBtn
      this.isShowEmailCode = !this.isShowEmailCode
      this.isShowEmailBtns = !this.isShowEmailBtns
    },
    telOnblurFn () {
      // 如果用户输入的内容不是11位手机号
      //    那么提示手机号输入有误
      if (!this.telUsername) {
        this.TelTishi1 = '手机号码不能为空'
      } else if (!(new RegExp(/^1[35784][0-9]{9}$/)).test(this.telUsername)) {
        this.TelTishi1 = '请输入11位手机号码'
      } else {
        this.TelTishi1 = ''
      }
    },
    telCodeOnblurFn () {
      // 如果用户输入的内容不是6位短信验证码
      //    那么提示验证码有误
      if (!this.telCode) {
        this.TelTishi2 = '验证码不能为空'
      } else if (!(new RegExp(/^[0-9]{6}$/)).test(this.telCode)) {
        this.TelTishi2 = '请输入6位短信验证码'
      } else {
        this.TelTishi2 = ''
      }
    },
    passwordOnblurFn () {
      // 如果用户输入的内容不是6~12位的字符
      //    那么提示密码有问题
      if (!this.password) {
        this.TelTishi3 = '密码不能为空'
      } else if (!(new RegExp(/^[0-9a-zA-Z\W_]{6,12}$/)).test(this.password)) {
        this.TelTishi3 = '请输入6~12位由任意数字，字母,特殊字符组成的密码'
      } else {
        this.TelTishi3 = ''
      }
    },
    isHideTelTextPreserve () {
      // 点击确定按钮隐藏当前项
      this.isShowTelBtn = true
      this.isShowTelCode = false
      this.isShowLoginpas = false
      this.isShowTelBtns = false
      // 如果用户输入的内容有一项为空，则对应项提示
      // 如果输入正确提示不为空，则跳转到下一项，清空输入框
      if (!this.telUsername) {
        this.TelTishi1 = '请输入11位手机号码'
      } else if (!this.telCode) {
        this.TelTishi2 = '请输入6位短信验证码'
      } else if (!this.password) {
        this.TelTishi3 = '请输入6~12位原始密码'
      } else if (this.password === '' || this.newPassword === '' || this.newPasswords === '') {
        this.TelTishi1 = '手机号，验证码，密码不能为空'
      }
    },
    isHideTelTextCancel () {
      // 如果用户取消输入，则清空输入框以及提示信息，且隐藏当前项
      this.isShowTelBtn = true
      this.isShowTelCode = false
      this.isShowLoginpas = false
      this.isShowTelBtns = false
      this.telUsername = ''
      this.telCode = ''
      this.password = ''
      this.TelTishi1 = ''
      this.TelTishi2 = ''
      this.TelTishi3 = ''
    },
    emailOnblurFn () {
      // 如果用户输入的内容不是邮箱号
      //    那么提示邮箱号输入有误
      if (!this.emailUsername) {
        this.EmailTishi1 = '邮箱号不能为空'
      } else if (!(new RegExp(/^\w+@\w+\.(com|net|cn|com\.cn)$/)).test(this.emailUsername)) {
        this.EmailTishi1 = '请输入正确的邮箱号'
      } else {
        this.EmailTishi1 = ''
      }
    },
    emailCodeOnblurFn () {
      // 如果用户输入的内容不是6位邮箱验证码
      //    那么提示验证码有误
      if (!this.emailCode) {
        this.EmailTishi2 = '邮箱号不能为空'
      } else if (!(new RegExp(/^[0-9]{6}$/)).test(this.emailCode)) {
        this.EmailTishi2 = '请输入6位邮箱验证码'
      } else {
        this.EmailTishi2 = ''
      }
    },
    isHideEmailTextPreserve () {
      // 点击确定按钮隐藏当前项
      this.isShowEmailBtn = true
      this.isShowEmailCode = false
      this.isShowEmailBtns = false
      // 如果用户输入的内容有一项为空，则对应项提示
      // 如果输入正确提示不为空，则跳转到下一项，清空输入框
      if (!this.emailUsername) {
        this.EmailTishi1 = '请输入邮箱号'
      } else if (!this.emailCode) {
        this.EmailTishi2 = '请输入6位邮箱验证码'
      } else if (this.emailUsername === '' || this.emailCode === '') {
        this.EmailTishi1 = '邮箱号，验证码不能为空'
      }
    },
    isHideEmailTextCancel () {
      // 如果用户取消输入，则清空输入框以及提示信息，且隐藏当前项
      this.isShowEmailBtn = true
      this.isShowEmailCode = false
      this.isShowEmailBtns = false
      this.emailUsername = ''
      this.emailCode = ''
      this.EmailTishi1 = ''
      this.EmailTishi2 = ''
    }
  }
}
</script>

<style>
</style>
