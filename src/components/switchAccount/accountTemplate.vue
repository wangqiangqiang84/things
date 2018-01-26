<script src="../../router/gateway.js"></script>
<template>
	<div class="accountTemplate-body" ref="accountTemplate" :style="{width: fullWidth + 'px', top: '-' + distanceTop + 'px', left: '-' + distanceLeft + 'px'}">
	    <div class="accountTemplate-content">
	    	<div class="accountTemplate-top">
	    		<div class="accountTemplate-top-l">
	    			<p>1.0</p>
	    			<span></span>
	    		</div>
	    		<div class="accountTemplate-top-c">
	    			<div class="accountTemplate-top-c1">
	    				<span></span>
	                    <ul>
	                    	<li><p class="hh">欢迎</p></li>
	                    	<li><p class="hh">来到</p></li>
	                    	<li><p class="hh">与非云设备管理平台</p></li>
	                    </ul>
	    			</div>
                    <button type="button" onClick="javascript :history.back(-1)">返回上级</button>
	    		</div>
	    		<div class="accountTemplate-top-r">

	    		</div>
	    	</div>
            <login v-show="isShowLogin"></login>
            <register v-show="isShowRegister"></register>
            <resetting v-show="isShowResetting"></resetting>
	        <div class="accountTemplate-bottom">
	        	<i>西/安/山/脉/科/技/发/展/有/限/公/司</i>
	        	<span>西安山脉科技发展有限公司</span>
	        </div>
	    </div>
	</div>
</template>

<script type='text/ecmascript-6'>
// import $ from 'jquery'
import login from './login.vue'
import register from './register.vue'
import resetting from './resetting.vue'
import {mapGetters} from 'vuex'
export default {
  components: {
    login,
    register,
    resetting
  },
  data () {
    return {
      fullWidth: document.documentElement.clientWidth,
//    fullHeight: document.documentElement.clientHeight,
      distanceLeft: 0
    }
  },
  mounted () {
    window.addEventListener('resize', this.handleResize)
    this.distanceChangeFn(this.$el)
    console.log(document.documentElement.clientHeight)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.handleResize)
  },
  computed: {
    distanceTop () {
      return this.$store.state.device.distanceTop
    },
    ...mapGetters([
      'isShowLogin',
      'isShowRegister',
      'isShowResetting'
    ])
  },
  methods: {
    handleResize (event) {
      this.fullWidth = document.documentElement.clientWidth
//    this.fullHeight = document.documentElement.clientHeight
      this.distanceChangeFn(this.$refs.accountTemplate)
    },
    distanceChangeFn (accountTemplate) {
      this.distanceLeft = accountTemplate.parentNode.getBoundingClientRect().left
    }
  }
}
</script>

<style>
  @import "../../assets/css/switchAccount/accountTemplate.css";
</style>
