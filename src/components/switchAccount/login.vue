<template>
	<div class="login">
		<div class="accountTemplate-center">
			<ul>
				<li>
					<div id="h1">
				           登录到你的与非云
			        </div>
				</li>
				<li>
					<label><span>账</span><p>户：</p></label>
					<input type="text" placeholder="请输入用户名" @blur="userNameOnblurFn()" v-model="username" onKeypress="javascript:if(event.keyCode == 32)event.returnValue = false;"/>
					<b>还可以从这里登录</b>
				</li>
				<li>
					<label><span>密</span><p>码：</p></label>
					<input type="password" placeholder="请输入密码" @blur="passwordOnblurFn()" v-model="password" onKeypress="javascript:if(event.keyCode == 32)event.returnValue = false;"/>
					<div id="loginIcon">
						<i><img src="../../../static/switchAccount/img/qq.png"/></i>
					    <i><img src="../../../static/switchAccount/img/wechat.png"/></i>
					    <i><img src="../../../static/switchAccount/img/sina.png"/></i>
					</div>
				</li>
				<li>
					<div class="box" @click="showBoxStyle">
						<span v-show="clickShowBoxStyle"></span>
					</div>
					<label>记住我的密码</label>
					<button type="button" @click="loginBtn">登录</button>
				</li>
			</ul>
			<div class="accountTemplate-center-bottom">
			    <p v-show="showTishi">{{tishi}}</p>
			    <b><button type="button" @click="clickResettingFn">忘记密码</button><button type="button" @click="clickRegisterFn">注册</button><button type="button" @click="clickAdminFn">管理员</button></b>
		    </div>
		</div>
	</div>
</template>

<script>
import $ from 'jquery'
export default {
  name: 'login',
  data () {
    return {
      showTishi: true,
      tishi: '',
      username: '',
      password: '',
      clickShowBoxStyle: false
    }
  },
  methods: {
    userNameOnblurFn () {
      // 如果没有@符号,代表输入的账户为手机号
      //    如果用户输入的内容不是11位的数字
      //       那么进行提示
      if (!this.username) {
        this.tishi = '请输入手机号或邮箱号'
      } else if (!(new RegExp(/^\w+@\w+\.(com|net|cn|com\.cn)$/)).test(this.username)) {
        if (!(new RegExp(/^[0-9]{11}$/)).test(this.username)) {
          this.tishi = '请输入正确的手机号或邮箱号'
        }
      }
    },
    passwordOnblurFn () {
      // 如果用户输入的内容不是6~12位的字符,那么提示密码有问题
      if (!this.newPassword) {
        this.tishi = '请输入密码'
      } else if (!(new RegExp(/^[0-9a-zA-Z\W_]{6,12}$/)).test(this.newPassword)) {
        this.tishi = '请输入6~12位由任意数字，字母,特殊字符组成的密码';
      } else {
        this.tishi = ''
      }
    },
    loginBtn () {
      if (!this.username) {
        this.tishi = '用户名不能为空'
      } else if (!this.password) {
        this.tishi = '请输入密码'
      } else if (this.username === '' || this.password === '') {
        this.tishi = '请完善信息'
      } 
      let username = this.username
      let password = this.password
      this.$store.state.username = this.username
      this.$store.state.password = this.password
      sessionStorage.setItem('username', this.username)
      sessionStorage.setItem('password', this.password)
      // POST /someUrl
      this.$http.post('/api/auth/login', {username: username, password: password,source: 'nand'}).then(response => {
      // get status
      // get body data
        if (response.status === 200 && response.body.token) {
          sessionStorage.setItem('res', response.body.token)
          var token = response.body.token
          token = 'Bearer ' + token
          // GET /someUrl?foo=bar
          this.$http.get('/api/auth/user', {headers: {'X-Authorization': token}}).then(response => {
            sessionStorage.setItem('userId', response.body.id.id)
            sessionStorage.setItem('customerId', response.body.customerId.id)
            this.$router.push({'path': '/device/overview'})
          }, response => {
            // error callback
          })
        }
      }, response => {
      // error callback
        if(response.status === 401) {
          this.tishi = response.body.message
        }
      })
    },
    clickRegisterFn () {
      // 跳转之后清空所有数据
      this.$store.state.account.isShowLogin = false
      this.$store.state.account.isShowResetting = false
      this.$store.state.account.isShowRegister = true
      this.username = ''
      this.password = ''
    },
    clickResettingFn () {
      // 跳转之后清空所有数据
      this.$store.state.account.isShowLogin = false
      this.$store.state.account.isShowRegister = false
      this.$store.state.account.isShowResetting = true
      this.username = ''
      this.password = ''
    },
    clickAdminFn () {
      // 跳转之后清空所有数据
      this.$store.state.account.isShowLogin = false
      this.$store.state.account.isShowRegister = false
      this.$store.state.account.isShowResetting = true
      this.username = ''
      this.password = ''
      window.open('/admin.html');
    },
    showBoxStyle () {
      this.clickShowBoxStyle = !this.clickShowBoxStyle
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
    })
  }
}
</script>
<style>
  @import "../../assets/css/switchAccount/login.css";
</style>
