<template>
	<div class="conent">
    <situation-top></situation-top>
		<content-fill></content-fill>
	</div>
</template>
  
<script>
	import SituationTop from './SituationTop.vue'
	import ContentFill from './ContentFill.vue'
	export default {
	  name: 'conent',
	  components: {
	    SituationTop,
	    ContentFill
	  }
	}
</script>

<style>
</style>