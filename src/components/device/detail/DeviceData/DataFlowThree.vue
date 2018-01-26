<template>
  <div class="dataFlowThree">
    <div class="dataFlowThree-t">
      <h3 class="date">{{time | formatDate}}</h3>
    </div>
    <div class="dataFlowThree-b">
      <div class="dataFlowThree-b-l">
        <div class="dataFlowThree-l-t">
          <span class="icon1">
              <img src="../../../../../static/device/img/detail/dataDetail.png" class="icon">
          </span>
        </div>
        <h3 class="dataFlowThree-l-b">设备</h3>
      </div>
      <div class="dataFlowThree-b-r">
        <span class="icon1">
          <img src="../../../../../static/device/img/detail/dataDetailTh.png" class="icon2">
        </span>
        <div class="dataFlowThreeMain">
          <div class="dataFlowThree-r-t">
            <p v-for="dataError in erroneousData">{{dataError}}</p>
          </div>
          <div class="dataFlowThree-r-b"><span>错误数据无法识别</span></div>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
  @import "../../../../assets/css/device/detail/DeviceData/DataFlowThree.css";
</style>
<script type="text/ecmascript-6">
  import {formatDate} from '../../../../assets/js/libs/date.js'
  export default {
    data: function () {
      return {
        time: '2017/9/15 20:34:45',
        erroneousData: ['@', 34, '%5', '^c', 67, 'er', 'f#', '8*', 12, 34]
      }
    },
    filters: {
      formatDate (time) {
        let date = new Date(time)
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
      }
    }
  }

</script>
