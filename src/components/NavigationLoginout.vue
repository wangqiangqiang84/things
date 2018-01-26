<template>
  <ul class="nav-system" id="nav-system">
    <li>
      <router-link to="/switchAccount/Overview">
        <i class="fa fa-repeat" aria-hidden="true"></i>
        <span> 切换账号</span>
      </router-link>
    </li>
    <li>
      <router-link to="/home/Overview">
        <i class="fa fa-power-off" aria-hidden="true"></i>
        <span> 退出登陆</span>
      </router-link>
    </li>
  </ul>
</template>
<script>
  export default {
    name: 'navigation-loginout'
  }
</script>
