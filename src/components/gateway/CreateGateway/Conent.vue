<template>	
	<div class="mape">
	<div class="receptacle" ref="gateway">
		<Establish> </Establish>
	</div>
	</div>
</template>

<script>
  import Establish from './Establish'
  export default {
    name: 'app',
    components: {
      Establish
    },
    data () {
      return {
        fullWidth: document.documentElement.clientWidth,
        distanceLeft: 0
      }
    },
    mounted () {
      window.addEventListener('resize', this.handleResize)
      this.handleResize()
    },
    beforeDestroy () {
      window.removeEventListener('resize', this.handleResize)
    },
    methods: {
      handleResize (event) {
        this.fullWidth = document.documentElement.clientWidth
        this.distanceLeft = this.$el.getBoundingClientRect().left
      }
    }
  }
</script>
