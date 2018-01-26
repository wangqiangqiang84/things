<template>
  <div class="dataFlowOne">
    <div class="dataFlowOne-t">
      <h3 class="date">{{time | formatDate}}</h3>
    </div>
    <div class="dataFlowOne-b">
      <div class="dataFlowOne-b-l">
        <div class="dataFlowOne-l-t">
          <span class="icon1">
            <img src="../../../../../static/device/img/detail/dataDetail.png" class="icon">
          </span>
        </div>
        <h3 class="dataFlowOne-l-b">设备</h3>
      </div>
      <div class="dataFlowOne-b-r">
        <span class="icon1">
          <img src="../../../../../static/device/img/detail/dataDetailO.png" class="icon2">
        </span>
        <div class="dataFlowOneMain">
          <div class="dataFlowOne-r-t">
            <p v-for="(n,index) in dataValueList" @mouseenter="showAssociatedDataOne(index)" @mouseleave="hideAssociatedDataOne(index)">{{n.value}}</p>
            <div class="clear"></div>
          </div>
          <div class="clear"></div>
          <span  class="icon3" v-show="hideDataFlowOne" @click="showDataFlowOneFn">
            <img src="../../../../../static/device/img/detail/dataDetailFo1.png">
          </span>
          <div class="dataFlowOne-r-b" v-show="showDataFlowOne">
            <div v-for="(dataDetails,index) in dataDetailList" class="dataFlowDetailOne" @mouseenter="showDataOne(index)" @mouseleave="hideDataOne(index)">
              <span>{{dataDetails.name}}：</span>
              <label>{{dataDetails.value}}</label>
            </div>
            <h3 class="clear"></h3>
          </div>
          <div class="clear"></div>
          <span class="icon4" v-show="showDataFlowOne" @click="hideDataFlowOneFn">
            <img src="../../../../../static/device/img/detail/dataDetailFo2.png" >
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
  @import "../../../../assets/css/device/detail/DeviceData/DataFlowOne.css";
</style>
<script type="text/ecmascript-6">
  import $ from 'jquery'
  import {formatDate} from '../../../../assets/js/libs/date.js'
  export default {
    data: function () {
      return {
        time: '2017/9/30 10:54:21',
        hideDataFlowOne: true,
        showDataFlowOne: false,
        dataValueList: [],
        dataDetailList: []
      }
    },
    methods: {
      showDataFlowOneFn: function () {
        this.hideDataFlowOne = false
        this.showDataFlowOne = true
      },
      hideDataFlowOneFn: function () {
        this.hideDataFlowOne = true
        this.showDataFlowOne = false
      },
      // 鼠标移动到某个数据上自身和它的相关数据改变颜色
      showAssociatedDataOne: function (index) {
        // 用下标逐一判断当前数据所在数组里的name是否跟当前name相等，若相等，则为当前数据的相关数据
        for (let i = 0; i < this.dataValueList.length; i++) {
          if (this.dataValueList[i].name === this.dataValueList[index].name) {
            $('.dataFlowOne-r-t p').eq(i).css({'color': '#fff', 'backgroundColor': '#96d676'})
          }
        }
        // 循环详细数据里的值，用这些name跟当前name比较，若相等，则是上边数据的详细相关信息
        for (let j = 0; j < this.dataDetailList.length; j++) {
          if (this.dataDetailList[j].name === this.dataValueList[index].name) {
            $('.dataFlowOne-r-b .dataFlowDetailOne').eq(j).css({'color': '#fff', 'backgroundColor': '#96d676'})
          }
        }
      },
      // 鼠标移出当前数据，自身和它的相关数据变回原来的颜色
      hideAssociatedDataOne: function (index) {
        // 用下标逐一判断当前数据所在数组里的name是否跟当前name相等，若相等，则为当前数据的相关数据
        for (let i = 0; i < this.dataValueList.length; i++) {
          if (this.dataValueList[i].name === this.dataValueList[index].name) {
            $('.dataFlowOne-r-t p').eq(i).css({'color': '#555', 'backgroundColor': '#FFF'})
          }
        }
        // 循环详细数据里的值，用这些name跟当前name比较，若相等，则是上边数据的详细相关信息
        for (let j = 0; j < this.dataDetailList.length; j++) {
          if (this.dataDetailList[j].name === this.dataValueList[index].name) {
            $('.dataFlowOne-r-b .dataFlowDetailOne').eq(j).css({'color': '#555', 'backgroundColor': '#f2f7f0'})
          }
        }
      },
      // 鼠标移动到下边的数据上，展示此数据相关的详细数据
      showDataOne: function (index) {
      //  $(event.currentTarget).css({'color': '#fff', 'backgroundColor': '#96d676'})
        $('.dataFlowOne-r-b .dataFlowDetailOne').eq(index).css({'color': '#fff', 'backgroundColor': '#96d676'})
        for (let i = 0; i < this.dataValueList.length; i++) {
          if (this.dataValueList[i].name === this.dataDetailList[index].name) {
            $('.dataFlowOne-r-t p').eq(i).css({'color': '#fff', 'backgroundColor': '#96d676'})
          }
        }
      },
      // 鼠标移出下边数据，上边相关数据和此数据都变回原来的颜色
      hideDataOne: function (index) {
        //  $(event.currentTarget).css({'color': '#555', 'backgroundColor': '#FFF'})
        $('.dataFlowOne-r-b .dataFlowDetailOne').eq(index).css({'color': '#555', 'backgroundColor': '#f2f7f0'})
        for (let i = 0; i < this.dataValueList.length; i++) {
          if (this.dataValueList[i].name === this.dataDetailList[index].name) {
            $('.dataFlowOne-r-t p').eq(i).css({'color': '#555', 'backgroundColor': '#FFF'})
          }
        }
      }
    },
    filters: {
      formatDate (time) {
        let date = new Date(time)
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
      }
    },
    mounted: function () {
      this.$nextTick(function () {
        this.$http.get('../../../../static/device/dataFlowDetails.json').then(function (res) {
          this.dataValueList = res.body.device.deviceDataFlow
          this.dataDetailList = res.body.device.deviceDataFlowDetail
        })
      })
    }
}
</script>
