<template>
  <header id="nav-header">
    <div class="row">
      <div id="logo" class="col-xs-12 col-sm-12 col-md-12 col-lg-12"> <span></span> </div>
      <div id="user-icon" class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
        <div class="">
          <img src="../../static/img/user.png"/>
        </div>
      </div>
      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
        <span id="username">{{username}}</span>
      </div>
    </div>
  </header>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
  name: 'navigation-header',
  computed: {
    ...mapGetters([
      'username'
    ])
  },
  mounted () {
    this.$store.state.username = sessionStorage.getItem('username')
  }
}
</script>
