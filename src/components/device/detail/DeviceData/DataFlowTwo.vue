<template>
  <div class="dataFlowTwo">
    <div class="dataFlowTwo-t">
      <h3 class="date">{{time | formatDate}}</h3>
    </div>
    <div class="dataFlowTwo-b">
      <div class="dataFlowTwo-b-l">
        <span class="icon1">
          <img src="../../../../../static/device/img/detail/dataDetailT.png" class="icon2">
        </span>
        <div class="dataFlowTwoMain">
          <div class="dataFlowTwo-l-t">
            <p v-for="(n,index) in dataValueList" @mouseenter="showAssociatedDataTwo(index)" @mouseleave="hideAssociatedDataTwo(index)">{{n.value}}</p>
            <div class="clear"></div>
          </div>
          <div class="clear"></div>
          <span class="icon3" v-show="hideDataFlowTwo" @click="showDataFlowTwoFn">
            <img src="../../../../../static/device/img/detail/dataDetailF1.png">
          </span>
          <div class="dataFlowTwo-l-b" v-show="showDataFlowTwo">
            <div v-for="(dataDetails,index) in dataDetailList" class="dataFlowDetailTwo" @mouseenter="showDataTwo(index)" @mouseleave="hideDataTwo(index)">
              <span>{{dataDetails.name}}：</span>
              <label>{{dataDetails.value}}</label>
            </div>
            <h3 class="clear"></h3>
          </div>
          <div class="clear"></div>
          <span  class="icon4" v-show="showDataFlowTwo" @click="hideDataFlowTwoFn">
            <img src="../../../../../static/device/img/detail/dataDetailF2.png">
          </span>
        </div>
      </div>
      <div class="dataFlowTwo-b-r">
        <div class="dataFlowTwo-r-t">
          <span class="icon1">
            <img src="../../../../../static/device/img/detail/platform.png" class="icon">
          </span>
        </div>
        <h3 class="dataFlowTwo-r-b">平台</h3>
      </div>
    </div>
  </div>
</template>
<style>
  @import "../../../../assets/css/device/detail/DeviceData/DataFlowTwo.css";
</style>
<script type="text/ecmascript-6">
  import $ from 'jquery'
  import {formatDate} from '../../../../assets/js/libs/date.js'
  export default {
    data: function () {
      return {
        time: '2017/9/25 15:09:45',
        hideDataFlowTwo: true,
        showDataFlowTwo: false,
        dataValueList: [],
        dataDetailList: []
      }
    },
    methods: {
      showDataFlowTwoFn: function () {
        this.hideDataFlowTwo = false
        this.showDataFlowTwo = true
      },
      hideDataFlowTwoFn: function () {
        this.hideDataFlowTwo = true
        this.showDataFlowTwo = false
      },
      // 鼠标移动到某个数据上自身和它的相关数据改变颜色
      showAssociatedDataTwo: function (index) {
        // 用下标逐一判断当前数据所在数组里的name是否跟当前name相等，若相等，则为当前数据的相关数据
        for (let i = 0; i < this.dataValueList.length; i++) {
          if (this.dataValueList[i].name === this.dataValueList[index].name) {
            $('.dataFlowTwo-l-t p').eq(i).css({'color': '#fff', 'backgroundColor': '#f5c987'})
          }
        }
        // 循环详细数据里的值，用这些name跟当前name比较，若相等，则是上边数据的详细相关信息
        for (let j = 0; j < this.dataDetailList.length; j++) {
          if (this.dataDetailList[j].name === this.dataValueList[index].name) {
            $('.dataFlowTwo-l-b .dataFlowDetailTwo').eq(j).css({'color': '#fff', 'backgroundColor': '#f5c987'})
          }
        }
      },
      // 鼠标移出当前数据，自身和它的相关数据变回原来的颜色
      hideAssociatedDataTwo: function (index) {
        // 用下标逐一判断当前数据所在数组里的name是否跟当前name相等，若相等，则为当前数据的相关数据
        for (let i = 0; i < this.dataValueList.length; i++) {
          if (this.dataValueList[i].name === this.dataValueList[index].name) {
            $('.dataFlowTwo-l-t p').eq(i).css({'color': '#555', 'backgroundColor': '#FFF'})
          }
        }
        // 循环详细数据里的值，用这些name跟当前name比较，若相等，则是上边数据的详细相关信息
        for (let j = 0; j < this.dataDetailList.length; j++) {
          if (this.dataDetailList[j].name === this.dataValueList[index].name) {
            $('.dataFlowTwo-l-b .dataFlowDetailTwo').eq(j).css({'color': '#555', 'backgroundColor': '##f7f4f0'})
          }
        }
      },
      // 鼠标移动到下边的数据上，展示此数据相关的详细数据
      showDataTwo: function (index) {
        //  $(event.currentTarget).css({'color': '#fff', 'backgroundColor': '#96d676'})
        $('.dataFlowTwo-l-b .dataFlowDetailTwo').eq(index).css({'color': '#fff', 'backgroundColor': '#f5c987'})
        for (let i = 0; i < this.dataValueList.length; i++) {
          if (this.dataValueList[i].name === this.dataDetailList[index].name) {
            $('.dataFlowTwo-l-t p').eq(i).css({'color': '#fff', 'backgroundColor': '#f5c987'})
          }
        }
      },
      // 鼠标移出下边数据，上边相关数据和此数据都变回原来的颜色
      hideDataTwo: function (index) {
        //  $(event.currentTarget).css({'color': '#555', 'backgroundColor': '#FFF'})
        $('.dataFlowTwo-l-b .dataFlowDetailTwo').eq(index).css({'color': '#555', 'backgroundColor': '#f7f4f0'})
        for (let i = 0; i < this.dataValueList.length; i++) {
          if (this.dataValueList[i].name === this.dataDetailList[index].name) {
            $('.dataFlowTwo-l-t p').eq(i).css({'color': '#555', 'backgroundColor': '#FFF'})
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
          this.dataValueList = res.body.platform.platformDataFlow
          this.dataDetailList = res.body.platform.platformDataFlowDetail
          console.log(this.dataValueList)
        })
      })
    }
  }

</script>
