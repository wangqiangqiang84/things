<template>
  <div class="configurationContainer">
    <div class="configurationTop">
        <span>云端配置</span>
    </div>
    <div class="configurationCenter">
      <div>
        <p class="upload">上传本地配置</p>
        <p class="cancel">撤销上传</p>
      </div>
      <div>
        <p class="download">下载云端配置</p>
        <span class="cancel">撤销下载</span>
        <span class="import">导入</span>
      </div>
    </div>
    <div class="configurationBot" ref="configurationBot" @mousewheel="ScrollWheel($event)" @DOMMouseScroll="ScrollWheelFire($event)" @selectstart="selectStart">
      <div class="configurationBotMain" ref="configurationBotMain">
        并建立理论把事实与现象联系起来；技术的任务则是把科学的成果应用到实际问题中去。科学主要是和未知的领域打交道，
        其进展，尤其是重大的突破，是难以预料的；技术是在相对成熟的领域内工作，可以做比较准确的规划。例如事件：火把纸
        烧成灰，原因结果关系：因为氧化燃烧反应，所以纸变成灰，前提条件：纸、火、空气，触发条件：火点燃纸。原因是变化
        的本质原理，如果把原因说成表面现象“因为火点燃纸，所以纸烧成灰。那么原因就和触发条件一样了，为了区分原因和触
        发条件，把原因说成本质原理，而把触发条件说成表面现象。例如事件：要合成特定的生物分子，正负基团之间的相互吸引
        是化学反应发生的原因，适当的温度和pH值以及所需的酶是化学反应发生的前提条件，把各种反应物放在一起是化学反应发
        生的触发条件，合成特定的生物分子是化学反应的目的。6.因果关系简单是说，因果关系的逻辑就是：因为A，所以B，或者
        说如果出现现象A，必然就会出现现象B（充分关系）。这是一种引起和被引起的关系，而且是原因A在前，结果B在后。（1）
        一切先后关系不一定就是因果关系，例如：起床先穿衣服，然后穿裤子，或者说先涮牙后洗脸，这都不是因果关系。（2）
        并不是一切必然联系都是引起和被引起的关系，只有有了引起和被引起关系的必然联系，才是属于因果联系。政治学是专门
        以政治为研究对象的一门社会科学，研究政治行为的理论和考察权力的获得与行使。政府、政党、集团或个人在国家事务方
        面的活动以及治理国家施行的措施。不同时代对于政治的定义不同。 不少西方语言中的「政治」一词（法语politique、德
        语Politik、英语politics），都来自希腊语πολι，这个词可以考证出的最早文字记载是在《荷马史诗》中，最初的含
        义是城堡或卫城。古希腊的雅典人将修建在山顶的卫城称为“阿克罗波里”，简称为“波里”，城邦制形成后，“波里”就
        成为了具有政治意义的城邦的代名词，后同土地、人民及其政治生活结合在一起而被赋予“邦”或“国”的意义。后又衍生
        出政治、政治制度、政治家等词。因此，“政治”一词一开始就是指城邦中的城邦公民参与统治、管理、参与、斗争等各种
        公共生活行为的总和。中国先秦诸子也使用过“政治”一词。《尚书·毕命》有“道洽政治，泽润生民”；《周礼·地官·
        遂人》有“掌其政治禁令”。在更多的情况下是将“政”与“治”分开使用。“政”主要指国家的权力、制度、秩序和法令；
        “治”则主要指管理人民和教化人民，也指实现安定的状态等。社会上习惯于把科学和技术连在一起，统称为“科技”。实
        际二者既有密切联系，又有重要区别。科学解决理论问题，技术解决实际问题。科学要解决的问题，是发现自然界中确凿的
        事实与现象之间的关系，并建立理论把事实与现象联系起来；技术的任务则是把科学的成果应用到实际问题中去。 科学主要
        是和未知的领域打交道，其进展，尤其是重大的突破，是难以预料的；技术是在相对成熟的领域内工作，可以做比较准确的
        规划。社会上习惯于把科学和技术连在一起，统称为“科技”。实际二者既有密切联系，又有重要区别。科学解决理论问题，
        技术解决实际问题。科学要解决的问题，是发现自然界中确凿的事实与现象之间的关系，
      </div>
      <div class="thumb" ref="thumb" @click="ScrollNow($event)">
        <div class="slider"  ref="slider" @mousedown="ScrollMove" :style="{top: distanceTop+ 'px'}"></div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import $ from 'jquery'
  import {mapGetters, mapState} from 'vuex'
  export default{
    name: 'configuration',
    data () {
      return {
    //    showSlider: false,
        distanceTop: 0,
        scrolling: false,
        timeOut: ''
    }
    },
    mounted () {
      document.addEventListener('mouseUp', this.mouseUp)
      document.addEventListener('mouseMove', this.mouseMove)
    },
    methods: {
      // 防止内容被默认选中
     selectStart: function () {
       return false
     },
      // 按下鼠标时可以滚动
     ScrollMove: function () {
       this.scrolling = true
     },
     mouseMove: function (event) {
       if( this.Scrolling === false) return;ScroNow(event)
     },
     mouseUp: function () {
       this.scrolling = false
     },
     ScrollNow: function (event) {
       event=event?event:(window.event?window.event:null);
       console.log(event.clientY)
       let Y=event.clientY-this.$refs.slider.getBoundingClientRect().top-this.$refs.slider.clientHeight/2;
     //  console.log(Y)
       let H=this.$refs.configurationBotMain.clientHeight-this.$refs.slider.clientHeight;
       console.log(H)
       let SH=Y/H*(this.$refs.configurationBot.scrollHeight-this.$refs.configurationBotMain.clientHeight);
       console.log(this.$refs.configurationBot.scrollHeight)
       if (Y<0) {
         Y=0
       }
       if (Y>H) {
          Y=H
       }
       this.distanceTop = Y;
       this.$refs.configurationBotMain.scrollTop=SH;
      },
      // 谷歌、IE 滚动条交互
     ScrollWheel: function (event) {
       $('.slider').css('display', 'block')
       let Y=this.$refs.configurationBotMain.scrollTop;
       let H=this.$refs.configurationBotMain.scrollHeight-this.$refs.configurationBotMain.clientHeight;
       if (event.wheelDelta >=120){
          Y=Y-80
        } else {
         Y=Y+80
       }
       if(Y<0) {
         Y=0
       }
       if(Y>H){
         Y=H
       }
       this.$refs.configurationBotMain.scrollTop=Y
       let SH=Y/H*(this.$refs.thumb.clientHeight-this.$refs.slider.clientHeight)
       console.log(SH)
       if(SH<0) {
         SH = 0
       }
       this.distanceTop = SH
       if (this.distanceTop = SH) {
         this.timeOut = setTimeout(()=>{
           $('.slider').fadeOut()
         },2000)
       }
     },
      // 火狐滚动条交互
      ScrollWheelFire: function (event) {
        $('.slider').css('display', 'block')
        let Y=this.$refs.configurationBotMain.scrollTop;
        let H=this.$refs.configurationBotMain.scrollHeight-this.$refs.configurationBotMain.clientHeight;
        if (event.detail <=0){
          Y=Y-80
        } else {
          Y=Y+80
        }
        if(Y<0) {
          Y=0
        }
        if(Y>H){
          Y=H
        }
        this.$refs.configurationBotMain.scrollTop=Y
        let SH=Y/H*(this.$refs.thumb.clientHeight-this.$refs.slider.clientHeight)
        if(SH<0) {
          SH = 0
        }
        this.distanceTop = SH
        if (this.distanceTop = SH) {
          this.timeOut = setTimeout(()=>{
            $('.slider').fadeOut()
          },2000)
        }
      }
    }
  }
</script>
<style>
  @import "../../../../assets/css/device/detail/configuration/overview.css";

</style>
