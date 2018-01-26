<template>
	<div class="cardContent">
		<ul class="main-fill">
			<li v-for="(isTop, index) in isTops" class="main-information">
			  <router-link to="/gateway/GatewayDeta/GatewayDetail">
				<p class="isLft-siz">{{isTop.name}}</p>
				<div class="main-ip">
					<div class="main-ipBox">
							<span>IP:</span>
							<b>{{isTop.IP}}</b>
						<div class="margin-port">
							<span>网关端口：</span>
							<b>{{isTop.port}}</b>
						</div>
				   </div>
				</div>
					<div class="equipment">
						<img :src="isTop.src" />
					</div>
				 <div class="onlineupdown">
					<div class="onlineupdown_box">
						<div>
							<span>{{isTop.gatewayStatus}}</span>
							<b>{{isTop.operation}}</b>
						</div>
						<div >
							<span>当前在线：</span>
							<b>{{isTop.countOfOnline}}</b>
						</div>
						<div>
							<span>已注册数：</span>
							<b>{{isTop.countOfRegisted}}</b>
						</div>
					</div>
				 </div>	
				<div class="footer " :class="isTop.footers">
					{{isTop.gatewayID}}
				</div>
			  </router-link>
			</li>
			<li v-for="(isTopn, index) in isTopNew" class="main-information" @click="testFn">
				<div class="equipmentn">
			  		<img :src="isTopn.src" />
			  	</div>
				<div class="footers" :class="isTopn.footers">
					{{isTopn.gateway}}
				</div>
			</li>
		</ul>
	</div>
</template>
<script>
  export default {
    name: 'cardContent',
    data () {
      return {
        isTops: [],
        isTopNew: []
      }
    },
    mounted: function () {
//  动态加载json数据地址
      this.$nextTick(function () {
        this.$http.get('../../../static/gateway/ContentFill.json').then((res) => {
          this.isTops = res.data.isTops
          this.isTopNew = res.data.isTopNew
        })
      })
    },
    methods: {
//  点击跳转上一页
      testFn: function () {
        this.$router.push({path: '/gateway/CreateGateway/Conent'})
      }
    }
  }
</script>

<style>
@import '../../assets/css/gateway/ContentFill.css';

</style>