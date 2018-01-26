<template>
	<div class="widget-bodoy">
    <header-nav></header-nav>
    <main-table></main-table>
  </div>
</template>
<script>
  import HeaderNav from './HeaderNav'
  import MainTable from './MainTable'
  export default {
    name: 'device',
    components: {
      HeaderNav, MainTable
    }
  }
</script>
<style>
</style>
