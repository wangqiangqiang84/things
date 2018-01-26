<template>
	<div class="dataDetails">
		<div class="dataDetails-top">
			<span>数据详情</span>
		</div>
		<div class="dataDetails-content">
			<div class="dataDetails-content-device">
				<span class="dataDetails-content-date">{{time | formatDate}}</span>
				<div class="dataDetails-content-device-detail">
					<div class="dataDetails-content-device-detail-l">
						<span class="img1">
							<div class="divs">
							    <img src="../../../../static/data/img/dataDetialDeviceicon.png"/>
						    </div>
						</span>
                        <p>设备</p>
					</div>
					<div class="dataDetails-content-device-detail-r">
						<span class="img2">
                        	<img src="../../../../static/data/img/dataDetailDialogicon1.png"/>
                        </span>
                        <div class="dataDetails-content-device-detail-r-c">
                        	<div class="deviceDataDetail-top">
                        		<ul>
                        			<li v-for="(n,index) in deviceValueList" class="deviceDataInfo" @mouseenter="showDeviceDataDetail(index)" @mouseleave="hideDeviceDataDetail(index)">{{n.value}}</li>
                        		</ul>
                        	</div>
                        	<div class="deviceDataDetail-bot">
                        		<ul>
                        			<li v-for="(n,index) in deviceValueDetail"  @mouseenter="showDeviceDataDetailBot(index)" @mouseleave="hideDeviceDataDetailBot(index)">
                        				<span>{{ n.name }}：</span>
                        				<p>{{n.value }}</p>
                        			</li>
                        		</ul>
                        	</div>
                        </div>
					</div>
				</div>
			</div>
			<div class="dataDetails-content-forum">
				<span class="dataDetails-content-date">{{time | formatDate}}</span>
				<div class="dataDetails-content-forum-detail">
					<div class="dataDetails-content-forum-detail-l">
						<span class="img2">
                        	<img src="../../../../static/data/img/dataDetailDialogicon2.png"/>
                        </span>
                        <div class="dataDetails-content-forum-detail-l-c">
                        	<div class="forumDataDetail-top">
                            <ul>
                        		  <li v-for="(n,index) in forumValueList" @mouseenter="showForumDataDetail(index)" @mouseleave="hideForumDataDetail(index)">{{n.value}}</li>
                            </ul>
                          </div>
                        	<div class="forumDataDetail-bot">
                        		<ul>
                        			<li v-for="(n,index) in forumValueDetail" @mouseenter="showForumDataDetailBot(index)" @mouseleave="hideForumDataDetailBot(index)">
                        				<span>{{n.name}}：</span>
                        				<p>{{n.value}}</p>
                        			</li>
                        		</ul>
                        	</div>
                        </div>
					</div>
					<div class="dataDetails-content-forum-detail-r">
						<span class="img1">
							<div class="divs">
							    <img src="../../../../static/data/img/dataDetailForumicon.png"/>
						    </div>
						</span>
                        <p>平台</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script type='text/ecmascript-6'>
  import $ from 'jquery'
  import {formatDate} from '../../../assets/js/libs/date.js'
  export default {
    data () {
      return {
        time: '2017-09-27 10:44:23',
        deviceValueList: [],
        deviceValueDetail: [],
        forumValueList: [],
        forumValueDetail: []
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
        this.$http.get('../../../../static/data/DataDetails.json').then(function (res) {
          this.deviceValueList = res.body.device.deviceValue
          this.deviceValueDetail = res.body.device.deviceValueDetail
          this.forumValueList = res.body.forum.forumValue
          this.forumValueDetail = res.body.forum.forumValueDetail
        })
      })
    },
    methods: {
      // 设备部分
      showDeviceDataDetail (index) {
        // 用下标判断哪个数据与当前数据的name相等
        for (let i = 0; i < this.deviceValueList.length; i++) {
          if (this.deviceValueList[i].name === this.deviceValueList[index].name) {
            $('.deviceDataDetail-top ul li').eq(i).css({'color': '#fff', 'backgroundColor': '#96d676'})
          }
        }
        for (let j = 0; j < this.deviceValueDetail.length; j++) {
          if (this.deviceValueDetail[j].name === this.deviceValueList[index].name) {
            $('.deviceDataDetail-bot ul li').eq(j).css({'color': '#fff', 'backgroundColor': '#96d676'})
          }
        }
      },
      hideDeviceDataDetail (index) {
        for (let i = 0; i < this.deviceValueList.length; i++) {
          if (this.deviceValueList[i].name === this.deviceValueList[index].name) {
            $('.deviceDataDetail-top ul li').eq(i).css({'color': '#555', 'backgroundColor': '#FFF'})
          }
        }
        for (let j = 0; j < this.deviceValueDetail.length; j++) {
          if (this.deviceValueDetail[j].name === this.deviceValueList[index].name) {
            $('.deviceDataDetail-bot ul li').eq(j).css({'color': '#555', 'backgroundColor': '#f2f7f0'})
          }
        }
      },
      //鼠标移动到下边的数据上，展示此数据相关的详细数据
      showDeviceDataDetailBot (index) {
      //  $(event.currentTarget).css({'color': '#fff', 'backgroundColor': '#96d676'})
        $('.deviceDataDetail-bot ul li').eq(index).css({'color': '#fff', 'backgroundColor': '#96d676'})
        for(let i = 0; i < this.deviceValueList.length; i++){
           if(this.deviceValueList[i].name === this.deviceValueDetail[index].name){
             $('.deviceDataDetail-top ul li').eq(i).css({'color': '#fff', 'backgroundColor': '#96d676'})
           }
        }
      },
      //鼠标移出下边数据，上边相关数据和此数据都变回原来的颜色
      hideDeviceDataDetailBot (index) {
        //  $(event.currentTarget).css({'color': '#555', 'backgroundColor': '#FFF'})
        $('.deviceDataDetail-bot ul li').eq(index).css({'color': '#555', 'backgroundColor': '#f2f7f0'})
        for(let i = 0; i < this.deviceValueList.length; i++){
          if(this.deviceValueList[i].name === this.deviceValueDetail[index].name){
            $('.deviceDataDetail-top ul li').eq(i).css({'color': '#555', 'backgroundColor': '#FFF'})
          }
        }
      },
      // 平台部分
      showForumDataDetail (index) {
      // 用下标判断哪个数据与当前数据的name相等
        for (let i = 0; i < this.forumValueList.length; i++) {
          if (this.forumValueList[i].name === this.forumValueList[index].name) {
            $('.forumDataDetail-top ul li').eq(i).css({'color': '#fff', 'backgroundColor': '#f5c987'})
          }
        }
        for (let j = 0; j < this.forumValueDetail.length; j++) {
          if (this.forumValueDetail[j].name === this.forumValueList[index].name) {
            $('.forumDataDetail-bot ul li').eq(j).css({'color': '#fff', 'backgroundColor': '#f5c987'})
          }
        }
      },
      hideForumDataDetail (index) {
        for (let i = 0; i < this.forumValueList.length; i++) {
          if (this.forumValueList[i].name === this.forumValueList[index].name) {
            $('.forumDataDetail-top ul li').eq(i).css({'color': '#555', 'backgroundColor': '#FFFFFF'})
          }
        }
        for (let j = 0; j < this.forumValueDetail.length; j++) {
          if (this.forumValueDetail[j].name === this.forumValueList[index].name) {
            $('.forumDataDetail-bot ul li').eq(j).css({'color': '#555', 'backgroundColor': '#f7f4f0'})
          }
        }
      },
      //鼠标移动到下边的数据上，展示此数据相关的详细数据
      showForumDataDetailBot (index) {
      //  $(event.currentTarget).css({'color': '#fff', 'backgroundColor': '#96d676'})
        $('.forumDataDetail-bot ul li').eq(index).css({'color': '#fff', 'backgroundColor': '#f5c987'})
        for(let i = 0; i < this.forumValueList.length; i++){
           if(this.forumValueList[i].name === this.forumValueDetail[index].name){
             $('.forumDataDetail-top ul li').eq(i).css({'color': '#fff', 'backgroundColor': '#f5c987'})
           }
        }
      },
      //鼠标移出下边数据，上边相关数据和此数据都变回原来的颜色
      hideForumDataDetailBot (index) {
        //  $(event.currentTarget).css({'color': '#555', 'backgroundColor': '#FFF'})
        $('.forumDataDetail-bot ul li').eq(index).css({'color': '#555', 'backgroundColor': '#f7f4f0'})
        for(let i = 0; i < this.forumValueList.length; i++){
          if(this.forumValueList[i].name === this.forumValueDetail[index].name){
            $('.forumDataDetail-top ul li').eq(i).css({'color': '#555', 'backgroundColor': '#FFF'})
          }
        }
      },
    }
}

</script>

<style>
    @import "../../../assets/css/data/DataDetails.css";
</style>
