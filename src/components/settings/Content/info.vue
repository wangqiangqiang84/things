<template>
  <div class="info">
		<div class="info-content">
			<ul>
        <li>
          <label>换头像</label>
          <div class="lineBox">
            <input class="file_input" type="file" name="header_img" accept="image/gif,image/jpeg,image/png,image/jpg" multiple id="avc">
            <div class="upload_box">
              从本地上传一张头像
            </div>
          </div>
        </li>
        <li>
          <label>用户名</label>
          <div class="lineBox">
            <input type="text" @blur="userNameOnblurFn()" v-model="newUsername" onKeypress="javascript:if(event.keyCode == 32)event.returnValue = false;"/>
            <span v-show="showTishi">{{tishi}}</span>
          </div>
        </li>
      </ul>
      <div class="finishForm" id="finishInfoForm">
        <button type="button" @click="submit">保存</button>
        <button type="button" @click="cancelChangeUsername">取消</button>
      </div>
		</div>
	</div>
</template>

<script>
import $ from 'jquery'
export default {
  name: 'Info',
  data () {
    return {
      showTishi: true,
      tishi: '',
      newUsername: ''
    }
  },
  // 定义事件
  methods: {
    // 用户名验证
    userNameOnblurFn () {
      // 如果用户输入的内容是由1~16位数字英文字母组成的，则不提示
      //    如果用户输入的内容为空或者输入有误
      //       那么进行提示
      if (!this.newUsername) {
        this.tishi = '用户名不能为空'
      } else if (!(new RegExp(/^[\u4e00-\u9fa5-0-9a-zA-Z]{1,15}$/)).test(this.newUsername)) {
        this.tishi = '用户名长度不超过16位'
      } else {
        this.tishi = ''
      }
    },
    // 点击图片删除该图片并清除相对的input
//    deleteImg(e){
//      let target=e.target;
//      let inputID='';       //需要清除value的input
//      if(target.nodeName=='IMG'){
//        target.src='';
//        inputID=target.id.replace('img_','');    //获得需要清除value的input
//        $('input#'+inputID).val("");
//      }
//    },
    // 提交信息到后台
    submit () {
      $('#addTextForm').ajaxSubmit({
        url: this.$root.api + '/Index/staff_accident/add',
        type: 'post',
        data: {
          'total_price': this.price,
          'descript': this.descript
        },
        success: (data) => {
          if (data.code == 0) {
            console.log('提交成功')
            $('#addTextForm input').val('')
            $('div#img-wrapper img').attr('src','')
          } else {
            alert('提交失败');
          }
        }
      })
      if (!this.newUsername) {
        this.tishi = '用户名不能为空'
      } else if (!this.tishi) {
        this.$store.state.settings.isShowSafe = true
        this.$store.state.settings.isShowInfo = false
        this.$store.state.settings.isShowBinding = false
      }
    },
    cancelChangeUsername () {
      this.newUsername = ''
      this.tishi = ''
    }
  },
  // 页面加载后执行
  mounted () {
    let file_input = document.getElementsByClassName('file_input')[0]
    file_input.addEventListener('change', function () {
      let obj = this
      let obj_name = this.files[0].name
      let img_length = obj.files.length
      for (let i = 0; i < img_length; i++) {
        if (!(/image\/\w+/).test(obj.files[i].type)) {
          alert('上传的图片格式错误，请上传图片')
          return false
        }
        let reader = new FileReader()
        console.log(reader)
//          reader.error = function(e) {
//            alert("读取异常")
//          }
        reader.onload = function (e) {
          let img_html = '<img src="' + e.target.result + '"/>'
          let div_html = document.createElement('div')
          let p_html = document.createElement('p')
          if (document.getElementsByClassName('img_list')[0].children.length < 1) {
            div_html.innerHTML = img_html
            div_html.appendChild(p_html)
//            p_html.innerHTML=obj_name;
            div_html.className = 'img-div'
            document.getElementsByClassName('img_list')[0].appendChild(div_html)
          } else {
            alert('最多上传1张图片')
          }
        }
        reader.onloadstart = function () {
          console.log('开始读取' + obj_name)
        }
        reader.onprogress = function (e) {
          if (e.lengthComputable) {
            console.log('正在读取文件')
          }
        }
        reader.readAsDataURL(obj.files[i])
      }
    })
  }
}
</script>

<style>
</style>
