<template>
  <div class="situation-top">
    <div class="ron">
    	<!--创建网关内容量-->
      <div class="row-left">
        <div v-for="(isLft, index) in isLfts" class="createCapacity">
          <p :class="isLft.color">{{isLft.figure}}</p>
          <p :class="isLft.names">{{isLft.name}}</p>
  	    </div>
  	  </div>
  	  <div class="row-right">
  	  <!--运行状态-->
        <div v-for="(isRight, index) in isRights" class="state">
          <p :class="isRight.color">{{isRight.figure}}</p>    
          <div class="isRigh_Function">         
          	<div class="isRightDiv">
          		<img :src="isRight.src"/>
          	</div>
          	<p :class="isRight.names">{{isRight.name}} </p> 
          </div>
        </div>
  	  </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      isLfts: [],
      isRights: []
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      this.$http.get('../../../static/gateway/SituationTop.json').then((res) => {
        this.isLfts = res.data.isLfts
        this.isRights = res.data.isRights
      })
    })
  }
}
</script>
<style>
@import '../../assets/css/gateway/SituationTop.css';
</style>