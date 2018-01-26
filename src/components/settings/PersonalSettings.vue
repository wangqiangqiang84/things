<template>
	<div class="personalSettings">
		<div class="personalSettings-head">
			<h2>
				<div class="img_list">
					
				</div>
			</h2>
		</div>
		<div class="personalSettings-body">
	        <ul class="personalSettings-nav">
	           <li @click="isShowInfoFn" :class="{showStyle: isShowInfo}">基本信息</li>
	           <li @click="isShowSafeFn" :class="{showStyle: isShowSafe}">账号安全</li>
	           <li @click="isShowBindingFn" :class="{showStyle: isShowBinding}">账号绑定</li>
	        </ul>
	        <div class="personalSettings-content">
	            <Info v-show="isShowInfo"></Info>
	            <Safe v-show="isShowSafe"></Safe>
	            <Binding v-show="isShowBinding"></Binding>
	        </div>
	    </div>
	</div>
</template>

<script type='text/ecmascript-6'>
  import Info from './Content/info.vue'
  import Safe from './Content/safe.vue'
  import Binding from './Content/binding.vue'
  import {mapGetters} from 'vuex'
  export default {
  	name: 'personalSettings',
	components: {
      Info,
      Safe,
      Binding
	},
	computed: {
	  ...mapGetters([
	    'isShowInfo',
	    'isShowSafe',
	    'isShowBinding'
	  ])
    },
    methods: {
    	getData: function(dataUrl){
    		this.dataUrl = dataUrl
    		console.log(this.dataUrl)
    	},
      isShowInfoFn () {
      	this.$store.state.settings.isShowInfo = true
      	this.$store.state.settings.isShowSafe = false
      	this.$store.state.settings.isShowBinding = false
      },
      isShowSafeFn () {
      	this.$store.state.settings.isShowSafe = true
      	this.$store.state.settings.isShowInfo = false
      	this.$store.state.settings.isShowBinding = false
      },
      isShowBindingFn () {
      	this.$store.state.settings.isShowBinding = true
      	this.$store.state.settings.isShowSafe = false
      	this.$store.state.settings.isShowInfo = false
      }
    }
  }
</script>

<style>
	@import "../../assets/css/settings/personalSettings.css";
</style>