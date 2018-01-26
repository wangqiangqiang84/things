<template>
	<div class="telemetryResults">
    <div class="telemetryResults_body">
    	<div class="telemetryResults_conent">
    		<ul>
    			<li v-for="(n,index) in gateTypeName">
    			  <div class="gateTypeName">
    			  	<p>{{n.gateTypeName}}</p>
	    				<div class="telemetryInformation"@click="telemetryInformation(index)">
	    					<span class="telemetryMessage">设备名称备注信息</span><span class="telemetrySpan" v-show="!currentIndex.includes(index)"> <img src="../../../../../static/gateway/img/rigeht.png"/></span><span class="telemetrySpans" v-show="currentIndex.includes(index)"><img src="../../../../../static/gateway/img/bottom.png"/></span>
	    				</div>
    			  </div>
    				<div class="telemetry-listMain" v-show="currentIndex.includes(index)">
    					<ul>
    						<li v-for="(n,index) in gateInformation">
    							<span class="gateOne" >{{n.gateInformation}}</span>
    							<span class="gateTow" :class="n.color">{{n.information}}<span :class="n.telemetryError">{{n.error}}</span></span>
    						</li>
    					</ul>
    				</div>
    			</li>
    		</ul>
    	</div>
    </div>  
  </div>
</template>

<script>
  export default {
    data () {
      return {
        gateTypeName: [],
        gateInformation: [],
        currentIndex: [0]
      }
    },
    mounted () {
      this.$nextTick(function () {
        this.$http.get('../../../../static/gateway/telemetryResults.json').then(function (res) {
          this.gateTypeName = res.data.result
          this.gateInformation = res.data.results
        })
      })
    },
    methods: {
      telemetryInformation (index) {
        let variable = this.currentIndex.findIndex((n) => n === index)
        if (variable === -1) {
          this.currentIndex.push(index)
        } else {
          this.currentIndex.splice(variable, 1)
        }
      }
    }
  }
</script>

<style>
  @import '../../../../assets/css/gateway/TelemetryResults/TelemetryResults.css';
</style>