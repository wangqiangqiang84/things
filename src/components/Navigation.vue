<template>
  <aside id="left-panel">
    <navigation-header></navigation-header>
    <nav>
      <ul>
        <li v-for="(route, key, index) in routes" :class="{active: route.isActive}">
          <router-link :to="route.path">
            <i :class='computedClass(route)'></i>
            <span  class="font-space" @click="getName(route)">{{ route.name }}</span>
          </router-link>
        </li>
      </ul>
    </nav>
    <navigation-loginout></navigation-loginout>
  </aside>
</template>
<script>
  import NavigationHeader from './NavigationHeader'
  import NavigationLoginout from './NavigationLoginout.vue'
  import $ from 'jquery'
  export default {
    components: {
      NavigationLoginout,
      NavigationHeader
    },
    name: 'navigation',
    props: ['routes'],
    mounted () {
      if ($('nav span:contains(' + this.$route.meta.godfather + ')').parents('li').html() !== undefined) {
        let index = $('nav span:contains(' + this.$route.meta.godfather + ')').parents('li').index()
        this.routes[index].isActive = true
      }
    },
    methods: {
      computedClass: function (route) {
        return route.icon + ' ' + route.color
      },
      getName: function (route) {
        if (route.name === '数据管理') {
          console.log(133)
          let token = sessionStorage.getItem('res')
          token = 'Bearer ' + token
          let deviceId = '58c6ec70-d632-11e7-9b1e-5d2ab15a187d'
          sessionStorage.setItem('deviceName', 'Test Device A1')
          let url = '/api/plugins/telemetry/DEVICE/' + deviceId + '/keys/timeseries'
          this.$http.get(url, {headers: {'X-Authorization': token}}).then(response => {
            console.log(response)
            // 如果设备没有相关属性，值均为空
            if (response.body.length === 0) {
              sessionStorage.setItem('dateTime', '无数据')
              sessionStorage.setItem('dataType', '无数据')
              sessionStorage.setItem('dateTimeValue', '无数据')
              sessionStorage.setItem('dataTypeValue', '无数据')
              console.log('此设备没有相关数据')
            } else {
              // 如果设备有相关属性，将属性保存并且获取值
              sessionStorage.setItem('dateTime', (response.body)[0])
              sessionStorage.setItem('dataType', (response.body)[1])
              let dateTime = sessionStorage.getItem('dateTime')
              let dataType = sessionStorage.getItem('dataType')
              let array = new Array(2)
              array[0] = dateTime
              array[1] = dataType
              let url2 = '/api/plugins/telemetry/DEVICE/' + deviceId + '/values/timeseries?keys=' + array
              this.$http.get(url2, {headers: {'X-Authorization': token}}).then(response => {
                console.log(response.body)
                sessionStorage.setItem('dateTimeValue', response.body.localDateTime[0].value)
                sessionStorage.setItem('dataTypeValue', response.body.rainfall[0].value)
              }, response => {
                console.log(response.status)
              })
            }
          }, response => {
            console.log(response.status)
          })
        }
      }
    }
  }
</script>
