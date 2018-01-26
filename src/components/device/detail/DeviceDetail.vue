<template>
  <div class="device-detail">
    <div class="mask" ref="mask"></div>
    <DeviceDataDetail></DeviceDataDetail>
    <div class="total">
      <div class="text-align-left totalName">
        <span class="totalInfo">统计信息</span>
        <div class="title">
          <ol>
            <li>合计</li>
            <li>：</li>
            <li>{{sum}}</li>
            <li @click="select"><span class="selectType">筛选统计种类</span><img id="icon" src="../../../../static/device/img/detail/coilS.png"></li>
          </ol>
        </div>
      </div>
      <div class="types" v-show="show">
        <types></types>
      </div>
      <div>
        <!--<div class="a"></div>-->
        <chart @getFromChild="showDataSum"></chart>
      </div>
    </div>
  </div>
</template>
<script>
  import $ from 'jquery'
  import {mapGetters, mapState} from 'vuex'
  import Chart from './Chart.vue'
  import Types from './Types.vue'
  import DeviceDataDetail from './DeviceDataDetail.vue'
  export default {
    components: {
      Chart,
      Types,
      DeviceDataDetail
    },
    name: 'device-detail',
    data: function () {
      return {
        show: false,
        valueList: {},
        sum: 1271
      }
    },
    methods: {
      showDataSum: function (sum) {
        this.sum = sum
      },
      select: function () {
        if (this.show) {
          this.show = false
          $('#icon').attr('src', '../../../../static/device/img/detail/coilS.png')
        } else {
          this.show = true
          $('#icon').attr('src', '../../../../static/device/img/detail/uncoilS.png')
        }
      }
    }
  }
</script>
<style>
  @import "../../../assets/css/device/detail/DeviceDetail.css";
</style>
