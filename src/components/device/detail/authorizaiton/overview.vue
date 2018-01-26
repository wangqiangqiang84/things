<template>
	<div class="background-container">
		<div class="search">
			<span class="search-box">
				<span class="search-icon" @click="searchOnclickFn"></span>
				<input class="search-conent" type="text" placeholder="搜索账户名称"/>
			</span>
		</div>
		<div class="search-users">
			<div class="search-users-nav">搜索到以下账户</div>
			<div v-if="searchResultArr.length === 0" class="prompt-information">暂无搜索到账户</div>
			<div class="search-users-container">
				<div class="search-user-content" v-for="(searchResult, key, index) in searchResultArr">
					<ul class="information">
						<li>{{searchResult.name}}</li>
						<li>{{searchResult.email}}</li>
						<li>{{searchResult.authorized}}</li>
					</ul>
					<dl class="browse" @click="addBrowseFn(key)">
						<dd>授权</dd>
						<dd>仅浏览</dd>
					</dl>
					<dl class="revisability" @click="addRevisabilityFn(key)">
						<dd>授权</dd>
						<dd>可修改</dd>
					</dl>
				</div>
			</div>
		</div>
		<div class="authorized-users">
			<div class="search-users-nav">已授权账户</div>
			<div v-if="authorizedResultArr.length === 0" class="prompt-information">暂无已授权账户</div>
			<div class="search-users-container">
				<div class="search-user-content" v-for="(authorizedResult, key, index) in authorizedResultArr">
					<ul class="information">
						<li>{{authorizedResult.name}}</li>
						<li>{{authorizedResult.email}}</li>
						<li>{{authorizedResult.authorized}}</li>
					</ul>
					<dl class="browse" @click="selectAuthorizedFn(key)">
						<dd>{{operationTextArr[key].deleteText}}</dd>
					</dl>
					<dl class="revisability" @click="reviseAuthorizedFn(key)">
						<dd>{{operationTextArr[key].authorizationText}}</dd>
					</dl>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
  name: 'authorization',
  data () {
    return {
      searchResultArr: [],
      authorizedResultArr: [],
      operationTextArr: []
    }
  },
  mounted () {
    // 默认打开授权管理页面，请求已授权的用户的数据，
    //    将已授权的用户的数据储存起来
    //    创建一个保存权限文本的数组，个数和已授权用户数组的个数保持一致
    this.$nextTick(() => {
      this.$http.get('../../../../../static/device/authorization.json').then((res) => {
        this.authorizedResultArr = res.data.authorizedResult
        this.operationTextArr = new Array(this.authorizedResultArr.length).fill({deleteText: '删除', authorizationText: '权限'})
      })
    })
  },
  methods: {
    searchOnclickFn () {
      // 点击搜索按钮时，把用户在输入框内输入的内容传递到后台进行匹配用户信息
      //    将返回的用户信息储存起来
      this.$http.get('../../../../../static/device/authorization.json').then((res) => {
        this.searchResultArr = res.data.searchResult
      })
    },
    addBrowseFn (index) {
      // 先将当前点击的用户信息的授权状态改为  ‘仅浏览’
      // 再将当前点击的用户信息压入储存授权用户的数组中
      // 将保存授权文本的数组也压入一组元素
      // 从搜索到的用户数组里删除当前点击的用户信息
      this.searchResultArr[index].authorized = '仅浏览'
      this.authorizedResultArr.push(this.searchResultArr[index])
      this.operationTextArr.push({deleteText: '删除', authorizationText: '权限'})
      this.searchResultArr.splice(index, 1)
    },
    addRevisabilityFn (index) {
      // 先将当前点击的用户信息的授权状态改为  ‘可修改’
      // 再将当前点击的用户信息压入储存授权用户的数组中
      // 将保存授权文本的数组也压入一组元素
      // 从搜索到的用户数组里删除当前点击的用户信息
      this.searchResultArr[index].authorized = '可修改'
      this.authorizedResultArr.push(this.searchResultArr[index])
      this.operationTextArr.push({deleteText: '删除', authorizationText: '权限'})
      this.searchResultArr.splice(index, 1)
    },
    selectAuthorizedFn (index) {
      // 根据用户点击的下标将用户点击的权限文本储存起来
      // 如果用户点击的是删除文本
      //    将储存授权用户的数组 相应 位置的用户信息删掉
      //    同时将储存授权信息的数组 相应 位置的授权信息删除
      // 否则，代表用户点击的是仅浏览文本
      //    将储存授权信息 相应位置 的授权信息进行替换
      //    同时，将授权用户信息的文本，修改为仅浏览
      let deleteText = this.operationTextArr[index].deleteText
      if (deleteText === '删除') {
        this.authorizedResultArr.splice(index, 1)
        this.operationTextArr.splice(index, 1)
      } else {
        this.operationTextArr.splice(index, 1, {deleteText: '删除', authorizationText: '权限'})
        this.authorizedResultArr[index].authorized = '仅浏览'
      }
    },
    reviseAuthorizedFn (index) {
      // 根据用户点击的下标将用户点击的权限文本储存起来
      // 如果用户点击的是权限文本
      //    将储存授权信息 相应位置 的授权信息进行替换
      // 否则，代表用户点击的是可修改文本
      //    将储存授权信息 相应位置 的授权信息进行替换
      //    同时，将授权用户信息的文本，修改为可修改
      let authorizationText = this.operationTextArr[index].authorizationText
      if (authorizationText === '权限') {
        this.operationTextArr.splice(index, 1,{deleteText: '仅浏览', authorizationText: '可修改'})
      } else {
        this.operationTextArr.splice(index, 1,{deleteText: '删除', authorizationText: '权限'})
        this.authorizedResultArr[index].authorized = '可修改'
      }
    }
  }
}
</script>

<style>
 @import url("../../../../assets/css/device/detail/authorization/overview.css");
</style>