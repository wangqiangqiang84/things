<template>
	<div class="register">
		<div class="accountTemplate-center">
			<ul>
				<li>
					<div id="h1">
				        来注册你的与非云
			        </div>
				</li>
				<li>
					<label><span>账</span><p>户：</p></label>
					<input @blur="userNameOnblurFn()" type="text" placeholder="请输入手机号或邮箱" v-model="newUsername" onKeypress="javascript:if(event.keyCode == 32)event.returnValue = false;"/>
					<div class="codeOut" v-if="!unbind" @mouseenter="HighlightCode" @mouseleave="cancelHighlightCode" ref="Highlight">
						<span v-show="show" class="count">{{count}}s</span>
						<span class="obtainCode" @click="obtainCode" v-text="showCodeText"></span>
					</div>
					<div class="codeOut" v-else>
						<span v-show="show" class="count">{{count}}s</span>
						<span class="obtainCode" @click="obtainCode" v-text="showCodeText"></span>
					</div>
				</li>
				<li>
					<label><span>密</span><p>码：</p></label>
					<input @blur="passwordOnblurFn()" type="password" placeholder="请输入密码" v-model="newPassword" onKeypress="javascript:if(event.keyCode == 32)event.returnValue = false;"/>
					<div id="registerCode">
            <input type="text" ref="input" v-for="n in codeList" @keyup="moveFocus($event)" onKeypress="javascript:if(event.keyCode == 32)event.returnValue = false;" maxlength="1"/>
          </div>
				</li>
				<li>
					<button type="button" class="registerIcon" @click="registerBtn">注册</button>
				</li>
			</ul>
			<div class="accountTemplate-center-bottom">
			    <p v-show="showTishi">{{tishi}}</p>
			    <b><button type="button" @click="clickResettingFn">重置</button><button type="button" @click="clickLoginFn">登录</button></b>
		    </div>
		</div>
	</div>
</template>
<script>
import $ from 'jquery'
export default {
  name: 'register',
  data () {
    return {
      showTishi: true,
      tishi: '',
      newUsername: '',
      newPassword: '',
      code: '',
      codeList: new Array(6),
      show: false,
      count: '',
      timer: null,
      showCodeText: '获取验证码',
      unbind: false
    }
  },
  methods: {
    userNameOnblurFn () {
      // 如果没有@符号,代表输入的账户为手机号
      //    如果用户输入的内容不是11位的数字
      //       那么进行提示
      if (!this.newUsername) {
        this.tishi = '请输入手机号或邮箱号'
      } else if (!(new RegExp(/^\w+@\w+\.(com|net|cn|com\.cn)$/)).test(this.newUsername)) {
        if (!(new RegExp(/^[0-9]{11}$/)).test(this.newUsername)) {
          this.tishi = '请输入正确的手机号或邮箱号'
        }
      }
    },
    passwordOnblurFn () {
      // 如果用户输入的内容不是6~12位的字符
      //    那么提示密码有问题
      if (!this.newPassword){
        this.tishi = '请输入密码'
      } else if (!(new RegExp(/^[0-9a-zA-Z\W_]{6,12}$/)).test(this.newPassword)) {
        this.tishi = '请输入6~12位由任意数字，字母,特殊字符组成的密码'
      } else {
        this.tishi = ''
      }
    },
    obtainCode () {
      if (!this.newUsername) {
        this.tishi = '请输入账号'
      } else if (!(new RegExp(/^\w+@\w+\.(com|net|cn|com\.cn)$/)).test(this.newUsername)) {
        if (!(new RegExp(/^[0-9]{11}$/)).test(this.newUsername)) {
          this.tishi = '请输入正确的手机号或邮箱号'
        }
      } else {
        this.unbind = true 
        const TIME_COUNT = 60
        this.showCodeText = '后重新获取'
        if (!this.timer) {
          this.count = TIME_COUNT
          this.show = true
          this.$refs.Highlight.style.backgroundColor = 'rgba(255,255,255,0.2)'
          this.timer = setInterval(() => {
            if (this.count > 1 && this.count <= TIME_COUNT) {
              this.count--
            } else {
              this.show = false
              clearInterval(this.timer)
              this.timer = null
              this.showCodeText = '获取验证码'
              this.unbind = false
              let email = sessionStorage.getItem('newUsername')
              this.$http.post('/api/noauth/resendCode', {email: email}).then(response => {
              // get status
              // get body data
                //  console.log("ok")
                if(response.status === 200) {
                  console.log(response.body.message)
                }
              }, response => {
              // error callback
                if(response.status === 401) {
                  this.tishi = response.body.message
                }
              })
            }
          }, 1000)
          let email = this.newUsername
          this.$store.state.newUsername = this.newUsername
          sessionStorage.setItem('newUsername', this.newUsername)
          this.$http.post('/api/noauth/getVerificationCode', {email: email}).then(response => {
          // get status
          // get body data
            //  console.log("ok")
            if(response.status === 200) {
              console.log(response.body.message)
            }
          }, response => {
          // error callback
            if(response.status === 401) {
              this.tishi = response.body.message
            }
          })
        }
      }         
    },
    moveFocus (ev) {
      $(ev.currentTarget).next().focus()
      let value = $(ev.currentTarget).val()
      this.code += value + ''
      console.log($(ev.currentTarget).val())
      console.log(this.code)
      if (!(new RegExp(/^[0-9]{6}$/)).test(this.code)) {
        this.tishi = '请输入正确的验证码'
      } else if (this.count < 0 ){
        this.tishi = '验证码超时，请重新发送'
      } else {
        this.tishi = ''
      }
      let code = this.code
      let email = sessionStorage.getItem('newUsername')
      this.$http.post('/api/noauth/verifyCode', {email: email, code: code}).then(response => {
         console.log(response.body)
        if(response.status === 200) {
         
        } 
      }, response => {
      // error callback
        if(response.status === 401) {
          this.tishi = response.body.message
        }
      })
    },
    registerBtn () {
      // 如果用户名为空，对用户进行提示
      if (!this.newUsername) {
        this.tishi = '用户名不能为空'
      } else if (!this.newPassword) {
        this.tishi = '请输入密码'
      } else if (!this.code) {
        this.tishi = '请输入验证码'
      } else if (this.newUsername === '' || this.newPassword === '' || this.code === '') {
        this.tishi = '请完善信息'
      } 
      let newUsername = sessionStorage.getItem('newUsername')
      let newPassword = this.newPassword
      this.$http.post('/api/noauth/registerUser', {email: newUsername, password: newPassword}).then(response => {
         if(response.status === 200) {
          this.tishi = response.body.message
          // this.username = this.newUsername
          this.$store.state.account.isShowRegister = false
          this.$store.state.account.isShowResetting = false
          this.$store.state.account.isShowLogin = true
        }
      },response => {
        // error callback
        if(response.status === 401) {
          this.tishi = response.body.message
        }
      })
    },
    clickResettingFn () {
      this.$store.state.account.isShowLogin = false
      this.$store.state.account.isShowRegister = false
      this.$store.state.account.isShowResetting = true
      this.newUsername = ''
      this.newPassword = ''
      this.code = ''
      this.count = ''
    },
    clickLoginFn () {
      this.$store.state.account.isShowRegister = false
      this.$store.state.account.isShowResetting = false
      this.$store.state.account.isShowLogin = true
      this.newUsername = ''
      this.newPassword = ''
      this.code = ''
      this.count = ''
    },
    HighlightCode () {
      this.$refs.Highlight.style.backgroundColor = 'rgba(255,255,255,0.3)'
    },
    cancelHighlightCode () {
      this.$refs.Highlight.style.backgroundColor = 'rgba(255,255,255,0.2)'
    }
  },
  mounted () {
    $(function () {
      $('.accountTemplate-center input').focus(function () {
        $(this).css('borderBottomColor', '2px solid rgba(255,255,255,0.68)')
      })
      $('.accountTemplate-center input').blur(function () {
        $(this).css('borderBottomColor', '2px solid rgba(255,255,255,0.3)')
      })
      $('#registerCode input').focus(function () {
        $(this).css('backgroundColor', 'rgba(255,255,255,0.5)')
      })
      $('#registerCode input').blur(function () {
        $(this).css('backgroundColor', 'rgba(255,255,255,0.2)')
      })
    })
  }
}
</script>
<style>
  @import "../../assets/css/switchAccount/register.css";
</style>
