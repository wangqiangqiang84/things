<template>
  <header class="device-header-nav">
  	<div class="state-container">
	    <ul v-for="(ul, index) in uls">
	      <li :class="ul.name"><span>{{ul.count}}</span></li>
	      <li>{{deviceStatusNameObj[ul.name]}}</li>
	    </ul>
  	</div>
  	<div class="search-container">
  		<div class="search-img" @click="toggleSearchContentFn">
  			<span></span>
  		</div>
  		<div class="search-content">
  			<div class="search-content-editor">
  				<span class="editor-container">
  					<span class="editor-icon" @click="searchOnclickFn"></span>
  					<input class="editor-box" type="text" v-model="editorCurrentValue" @focus="editorOnfoucsFn" @blur="editorOnblurFn" @keypress="editorOnkeypressFn"/>
  				</span>
  			</div>
  			<div class="search-content-exhibition">
  				<span class="search-branch" v-for="(currentValue, index) in editorCurrentValueArr">
  					<span class="search-branch-content">{{currentValue}}</span>
  					<i class="search-branch-icon" @click="searchBranchDeleteFn(index)"></i>
  				</span>
  			</div>
  		</div>
  	</div>
  </header>
</template>

<script>
  import $ from 'jquery'
  export default {
    name: 'device-header-nav',
    data () {
      return {
        uls: [],
        deviceStatusNameObj: {
          deviceOnline: '在线设备数量',
          deviceOutline: '离线设备数量',
          deviceError: '故障设备数量',
          deviceNotRegister: '未授权设备数量'
        },
        editorCurrentValue: '搜索  设备编码 / 网关 / 状态 / 卡号 / 厂商 搜索条件之间请用空格隔开',
        editorCurrentValueArr: []
      }
    },
    mounted () {
      this.$nextTick(() => {
        this.$http.get('../../../static/device/tableDataDevice.json').then((res) => {
          this.uls = res.data.deviceStatius
        })
      })
    },
    methods: {
      toggleSearchContentFn () {
        // 点击搜索按钮搜索内容框出现，搜索框的高度为其父元素的高度
        // 如果，搜索框的宽度为0
        //    将搜索框的宽度动画设置为状态容器的宽度，在动画执行完之后将搜索按钮的背景图片替换为点击状态，调整背景图片的大小
        // 否则，搜索框处于点开状态，
        //    将搜索框的宽度动态设置为0，在动画执行完之后将搜索按钮的背景图片切换为默认的图片,调整背景图片的大小
        $('.search-content').css('height', $('.device-header-nav').css('height'))
        if ($('.search-content').css('width') === '0px') {
          $('.search-content').animate({width: $('.state-container').css('width')}, 200, function () {
            $('.search-img span').css({
              'background': '#fff url(../../../../static/device/img/overviewPage/searchClick.png) no-repeat',
              'background-size': '100% 100%'
            })
          })
        } else {
          $('.search-content').animate({width: '0px'}, 200, function () {
            $('.search-img span').css({
              'background': '#fff url(../../../../static/device/img/overviewPage/searchDefault.png) no-repeat',
              'background-size': '100% 100%'
            })
          })
        }
      },
      editorOnfoucsFn () {
        if (this.editorCurrentValue === '搜索  设备编码 / 网关 / 状态 / 卡号 / 厂商 搜索条件之间请用空格隔开') {
          this.editorCurrentValue = ''
        }
      },
      editorOnblurFn () {
        if (this.editorCurrentValue.trim() === '') {
          this.editorCurrentValue = '搜索  设备编码 / 网关 / 状态 / 卡号 / 厂商 搜索条件之间请用空格隔开'
        }
      },
      searchOnclickFn () {
        // 如果输入框的内容不是默认值
        //    那么将输入框内的值先去掉首尾的空格然后按照字符之间的空格进行分割，且不管中间有多少空格，最后保存到数组里
        // 否则，
        //    表格的数据进行重置，恢复默认数据
        // 排序状态也进行重置
        if (this.editorCurrentValue !== '搜索  设备编码 / 网关 / 状态 / 卡号 / 厂商 搜索条件之间请用空格隔开') {
          this.editorCurrentValueArr = this.editorCurrentValue.trim().split(/\s+/g)
          // 通过用户的输入内容作为筛选条件向后台进行请求数据，保存到状态变量中，这里模拟没有匹配项的情况
          this.$store.state.device.allDeviceInformation = []
        } else {
          this.$http.get('../../../static/device/tableDataDevice.json').then((res) => {
            this.$store.state.device.allDeviceInformation = res.data.result
          })
        }
        this.$store.state.device.isResetSortDevice = !this.$store.state.device.isResetSortDevice
      },
      searchBranchDeleteFn (index) {
        // 通过点击的搜索分支下标来删除数组中相应位置的元素
        // 将删除过的数组用空格进行拼接，同步到输入框内
        // 如果将搜索分支全部删除完了，
        //    那么将搜索框恢复默认值
        this.editorCurrentValueArr.splice(index, 1)
        this.editorCurrentValue = this.editorCurrentValueArr.join(' ')
        if (this.editorCurrentValue.trim().length === 0) {
          this.editorCurrentValue = '搜索  设备编码 / 网关 / 状态 / 卡号 / 厂商 搜索条件之间请用空格隔开'
        }
      },
      editorOnkeypressFn (e) {
        // 如果用户点击了回车
        //    输入框失去焦点
        //    注意： 在ie浏览器下会出现空白的搜索分支，为了统一效果
        //    如果用户没有输入或用户输入的都是空格
        //       编辑框的内容为默认值
        //    调用搜索按钮点击之后的方法
        if (e.keyCode === 13) {
          this.$el.querySelector('.editor-box').blur()
          if (this.editorCurrentValue.trim() === '') {
            this.editorCurrentValue = '搜索  设备编码 / 网关 / 状态 / 卡号 / 厂商 搜索条件之间请用空格隔开'
          }
          this.searchOnclickFn()
        }
      }
    }
  }
</script>

<style>
  @import '../../assets/css/device/headerNav.css'
</style>
