<template>
  <div class="wapper-t">
    <div class="text-align-left">
      <div class="device-detail-name">
        <label v-text="nameValue" class="nameValue" @mouseenter="showFullNameFn" @mouseleave="hideFullNameFn"></label>
        <button type="button" class="resetBtn" @click="showBtnsFn">修改</button>
        <p v-text="fullNameValue" v-show="showFullName">12345</p>
      </div>
    </div>
    <div class="hintArea" v-show="showHintArea">
      <div v-text="modifyContent" class="modifyContent">修改设备名称</div>
      <textarea v-model="message" @keyup="getMessage"></textarea>
      <p v-text="warning" class="warning"></p>
      <div class="btns">
        <button type="button" @click='wordOutFn' class="wordOut">取消</button>
        <button type="button" @click='wordInFn' class="wordIn">确认</button>
      </div>
    </div>
    <div class="infoGroup">
      <ul class="info">
        <li v-for="detailOne in detailsOne">
          <label class="itemName">{{detailOne.itemName}}：</label>
          <span class="itemValue" :class="getClass(detailOne)">{{detailOne.itemValue}}</span>
        </li>
        <li>
          <label class="itemName">位置：</label>
          <span class="itemValue locationValue" v-text="locationValue" @mouseenter="showFullLocationFn" @mouseleave="hideFullLocationFn"></span>
          <button class="reset" type="button"  @click="showBtnsOneFn">修改</button>
          <p v-text="fullLocationValue" v-show="showFullLocation"></p>
        </li>
      </ul>
      <ul class="infos">
        <li v-for="detailTwo in detailsTwo">
          <label class="itemName">{{detailTwo.itemName}}：</label>
          <span class="itemValue">{{detailTwo.itemValue}}</span>
        </li>
      </ul>
      <ul class="infoo">
        <li>
          <label class="itemName">卡号：</label>
          <span class="itemValue cardValue"  v-text="cardValue" @mouseenter="showFullCardFn" @mouseleave="hideFullCardFn"></span>
          <button class="reset" type="button"  @click="showBtnsTwoFn">修改</button>
          <p v-text="fullCardValue" v-show="showFullCard"></p>
        </li>
        <li v-for="detailThree in detailsThree">
          <label class="itemName">{{detailThree.itemName}}：</label>
          <span class="itemValue">{{detailThree.itemValue}}</span>
        </li>
      </ul>
      <div class="clear"></div>
    </div>
    <div class="deviceBtns">
      <router-link to="/device/detail/authorizaiton/overview"><button class="AccountAuthorizationBtn">账户授权</button></router-link>
      <router-link to="/device/detail/configuration/overview"><button class="CloudConfigurationBtn">云端配置</button></router-link>
      <router-link to="/device/detail/DeviceData/DataFlow"><button class="dataFlowBtn">数据流</button></router-link>
    </div>
    <div class="line"></div>
  </div>
</template>
<script>
  import $ from 'jquery'
  export default {
    name: 'device-detail-name',
    data: function () {
      return {
        showFullName: false,
        fullNameValue: '',
        message: '',
        nameValue: '西安水位站',
        detailsOne: [],
        detailsTwo: [],
        detailsThree: [],
        locationValue: '协同大厦二路南段',
        cardValue: 13997654534,
        showHintArea: false,
        modifyContent: '',
        warning: '',
        showFullLocation: false,
        fullLocationValue: '',
        showFullCard: false,
        fullCardValue: ''
      }
    },
    mounted: function () {
      //  得到json数据
      this.$nextTick(function () {
        this.$http.get('../../../static/device/details.json').then(function (res) {
          this.detailsOne = res.body.detailsOne
          this.detailsTwo = res.body.detailsTwo
          this.detailsThree = res.body.detailsThree
        })
      })
    },
    methods: {
      getClass: function (detailOne) {
        if (detailOne.itemValue === '在线') {
          return 'itemValue greens'
        } else if (detailOne.itemValue === '不在线') {
          return 'itemValue reds'
        } else {
          return 'itemValue default'
        }
      },
      // 修改设备名称
      showBtnsFn: function () {
        this.message = ''
        this.showHintArea = true
        this.warning = ''
        this.modifyContent = '修改设备名称'
        $('.hintArea textarea').focus()
        $('.device-detail .mask').css('display', 'block')
        $('html').css('overflow', 'hidden')
      },
      // 修改设备位置
      showBtnsOneFn: function () {
        this.message = ''
        this.showHintArea = true
        this.warning = ''
        this.modifyContent = '修改设备位置'
        $('.hintArea textarea').focus()
        $('.device-detail .mask').css('display', 'block')
        $('html').css('overflow', 'hidden')
      },
      // 修改卡号
      showBtnsTwoFn: function () {
        this.message = ''
        this.showHintArea = true
        this.warning = ''
        this.modifyContent = '修改卡号'
        $('.hintArea textarea').focus()
        $('.device-detail .mask').css('display', 'block')
        $('html').css('overflow', 'hidden')
      },
      // 判断文本框里的值是否正确：提示输入规则，将文本框里的值修改正确后，提示规则消失。
      getMessage: function () {
        if (this.modifyContent === '修改设备位置'){
          if ((new RegExp(/^[\u4e00-\u9fa5_a-zA-Z0-9]{1,64}$/).test(this.message))){
            this.warning = ''
          }
        }
        if (this.modifyContent === '修改设备名称'){
          if ((new RegExp(/^[\u4e00-\u9fa5_a-zA-Z0-9]{1,32}$/).test(this.message))){
            this.warning = ''
          }
        }
        if (this.modifyContent === '修改卡号'){
          if ((new RegExp(/^[0-9]{1,16}$/).test(this.message))){
            this.warning = ''
          }
        }
      },
      // 确认修改： 如果文本框的值正确，则修改成功。否则，则提示规则。
      wordInFn: function (event) {
        if (this.modifyContent === '修改设备位置'){
          if (!(new RegExp(/^[\u4e00-\u9fa5_a-zA-Z0-9]{1,64}$/).test(this.message)) || this.message === ''){
            this.warning = '1~64个字符，可使用数字、英文和中文'
          } else{
            this.locationValue = this.message
            this.showHintArea = false
            $('.device-detail .mask').css('display', 'none')
            $('html').css('overflow', '')
          }
        } else if (this.modifyContent === '修改设备名称') {
          if (!(new RegExp(/^[\u4e00-\u9fa5_a-zA-Z0-9]{1,32}$/).test(this.message)) || this.message === '') {
            this.warning = '1~32个字符，可使用数字、英文和中文'
          } else {
            this.nameValue = this.message
            this.showHintArea = false
            $('.device-detail .mask').css('display', 'none')
            $('html').css('overflow', '')
          }
        } else if (this.modifyContent === '修改卡号') {
          if (!(new RegExp(/^[0-9]{1,16}$/).test(this.message)) || this.message === ''){
            this.warning = '1~16个字符，只可使用数字'
          } else {
            this.cardValue = this.message
            this.showHintArea = false
            $('.device-detail .mask').css('display', 'none')
            $('html').css('overflow', '')
          }
        }
      },
      wordOutFn: function () {
        $(this).parents('.mask').css('display', 'block')
        this.showHintArea = false
        $('.device-detail .mask').css('display', 'none')
        $('html').css('overflow', '')
      },
      // 鼠标移动到名称上显示完整的名称信息
      showFullNameFn: function () {
        if (this.nameValue.length > 5) {
          this.showFullName = true
          this.fullNameValue = this.nameValue
        } else {
          this.showFullName = false
        }
      },
      hideFullNameFn: function () {
        this.showFullName = false
      },
      // 鼠标移动到位置上显示完整的名称信息
      showFullLocationFn: function () {
        if (this.locationValue.length > 8) {
          this.showFullLocation = true
          this.fullLocationValue = this.locationValue
        } else {
          this.showFullLocation = false
        }
      },
      hideFullLocationFn: function () {
        this.showFullLocation = false
      },
      // 鼠标移动到卡号上显示完整的卡号信息
      showFullCardFn: function () {
//        this.showFullCard = true
//        this.fullCardValue = this.cardValue
        if (this.cardValue.length > 9) {
          this.showFullCard = true
          this.fullCardValue = this.cardValue
        } else {
          this.showFullCard = false
        }
      },
      hideFullCardFn: function () {
        this.showFullCard = false
      }
    }
  }
</script>
<style>
  @import "../../../assets/css/device/detail/DeviceDataDetail.css";
</style>
