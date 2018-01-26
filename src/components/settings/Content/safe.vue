<template>
	<div class="safe">
		<div class="safe-content">
			<ul>
		       	<li>
			       	<label>原密码</label>
		       		<div class="lineBox">
		       			<input @blur="passwordOnblurFn()" type="password" v-model="password" onKeypress="javascript:if(event.keyCode == 32)event.returnValue = false;" />
		       			<span v-show="showTishi1">{{ tishi1 }}</span>
		       		</div>
		       	</li>
		       	<li>
		       		<label>新密码</label>
		       		<div class="lineBox">
		       			<input @blur="newPasswordOnblurFn()" type="password" v-model="newPassword" onKeypress="javascript:if(event.keyCode == 32)event.returnValue = false;"/>
		       			<span v-show="showTishi2">{{ tishi2 }}</span>
		       		</div>
		       	</li>
		       	<li>
		       		<label>新密码</label>
		       		<div class="lineBox">
		       			<input @blur="newsPasswordOnblurFn()" type="password" v-model="newPasswords" onKeypress="javascript:if(event.keyCode == 32)event.returnValue = false;"/>
		       			<span v-show="showTishi3">{{ tishi3 }}</span>
		       		</div>
		       	</li>
		   </ul>
		   <div class="finishForm" id="finishSafeForm">
		        <button type="button" @click="save">保存</button>
		        <button type="button" @click="cancel">取消</button>
		   </div>
		</div>
	</div>
</template>

<script>
export default {
  name: 'Safe',
  data () {
    return {
      showTishi1: true,
      showTishi2: true,
      showTishi3: true,
      tishi1: '',
      tishi2: '',
      tishi3: '',
      password: '',
      newPassword: '',
      newPasswords: ''
    }
  },
  methods: {
    passwordOnblurFn () {
      // 如果用户输入的内容不是6~12位的字符
      //    那么提示密码有问题
      if (!this.password) {
        this.tishi1 = '密码不能为空'
      } else if (!(new RegExp(/^[0-9a-zA-Z\W_]{6,12}$/)).test(this.password)) {
        this.tishi1 = '请输入6~12位由任意数字，字母,特殊字符组成的密码'
      } else {
        this.tishi1 = ''
      }
    },
    newPasswordOnblurFn () {
      // 如果用户输入的内容不是6~12位的字符,且与原密码相同
      //    那么提示密码有问题
      if (!this.newPassword) {
        this.tishi2 = '重置密码不能为空'
      } else if ((!(new RegExp(/^[0-9a-zA-Z\W_]{6,12}$/)).test(this.newPassword)) || (this.newPassword === this.password)) {
        this.tishi2 = '请输入6~12位由任意数字，字母,特殊字符组成的新密码'
      } else {
        this.tishi2 = ''
      }
    },
    newsPasswordOnblurFn () {
      // 如果用户输入的内容不是6~12位的字符，且与新密码不同
      //    那么提示密码有问题
      if (!this.newPasswords) {
        this.tishi3 = '重置密码不能为空'
      } else if ((!(new RegExp(/^[0-9a-zA-Z\W_]{6,12}$/)).test(this.newPasswords)) || (this.newPasswords !== this.newPassword)) {
        this.tishi3 = '请再次输入6~12位新密码'
      } else {
        this.tishi3 = ''
      }
    },
    save () {
      // 如果用户输入的内容有一项为空，则对应项提示
      //    如果输入正确提示不为空，则跳转到下一项，清空输入框
//      if (!this.password) {
//        this.tishi1 = '密码不能为空'
//      } else if (!this.newPassword) {
//        this.tishi2 = '请输入6~12位新密码'
//      } else if (!this.newPasswords) {
//        this.tishi3 = '请再次输入6~12位新密码'
//      } else if (this.password === '' || this.newPassword === '' || this.newPasswords === '') {
//        this.tishi1 = '请输入需要修改的密码'
//      } else if (!this.tishi1) {
//        this.$store.state.settings.isShowBinding = true
//        this.$store.state.settings.isShowSafe = false
//        this.$store.state.settings.isShowInfo = false
//        this.password = ''
//        this.newPassword = ''
//        this.newPasswords = ''
//        this.tishi1 = ''
//        this.tishi2 = ''
//        this.tishi3 = ''
//      }
      let token = sessionStorage.getItem('res')
      token = 'Bearer ' + token
      let currentPassword = sessionStorage.getItem('password')
      let newPassword = this.newPassword
      let url = '/api/auth/changePassword?currentPassword=' + currentPassword + '&newPassword=' + newPassword
      this.$http.post(proxyUrl + url, {headers: {'Content-Type': 'application/json', 'X-Authorization': token}}).then(response => {
        console.log(response)
      }, response => {
        console.log(response.body)
      })
    },
    cancel () {
      // 如果用户取消输入，则清空输入框以及提示信息
      this.password = ''
      this.newPassword = ''
      this.newPasswords = ''
      this.tishi1 = ''
      this.tishi2 = ''
      this.tishi3 = ''
    }
  }
}
</script>

<style>
</style>
