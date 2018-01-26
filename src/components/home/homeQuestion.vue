<template>
	<div class="homeQuestion-body" ref="homeQuestion" :style="{width: fullWidth + 'px', top: '-' + distanceTop + 'px', left: '-' + distanceLeft + 'px'}">
		<div class="homeQuestion-head">
			<div class="homeQuestion-head-a">
				<input type="text" placeholder="请输入您遇到的问题" onKeypress="javascript:if(event.keyCode == 32)event.returnValue = false;" />
				<p class="showsearch2">搜索</p>
				<p class="return" onClick="javascript :history.back(-1)">返回</p>
			</div>
		</div>
		<div class="homeQuestion-content">
			<div class="homeQuestion-list">
				<ul>
					<li v-for="(n,index) in questionList">
						<div class="list-head">
							<h3>用户搜索的问题比如安装什么？</h3>
							<b class="icon-down" v-show="!currentIndex.includes(index)" @click="isShowListDetailFn(index)">
	    						<span>查看详情</span>
	    					    <i class="fa fa-chevron-down"></i>
	    					</b>
						</div>
						<div class="list-main" v-show="currentIndex.includes(index)">
							<p>狼堪称团队作战的典范，它们群居生活， 共同寻找猎物，共同面对危险，共同享受丰美的食物。 狼之所以比其他动物强大，是因为它们更团结。 团队想要强大，救要加强团队合作，增强团队凝聚。 华为就拒绝单打独斗，主张团队作战，要求员工以交流来协调， 在重视自己，相信自己的同时，配合同事，相互包容，相信同事。 华为的“狼狈组织计划”团队精神中，员工们分工协作， 做自己擅长的事情，快速解决，和搭档保持和谐的基调； 在战略机会点上，实施饱和攻击，员工们主动献计献策， 上下级传达汇报协调，团队高效运作。
							</p>
							<div class="imgBox">
								<span></span>
								<span></span>
								<span></span>
							</div>
						</div>
						<div class="list-icon" v-show="currentIndex.includes(index)">
							<b class="icon-up" @click="isHideListDetailFn(index)">
	    						<span>收起</span>
	    					    <i class="fa fa-chevron-up"></i>
	    					</b>
						</div>
					</li>
				</ul>
			</div>
		</div>
		<div v-show="distanceScrollTop !== 0" class="homeQuestionScrollTop" @click="homeQuestionScrollTopFn">
			Top
		</div>
	</div>
</template>

<script>
	import $ from 'jquery'
	export default {
		name: 'homeQuestion',
		data() {
			return {
				fullWidth: document.documentElement.clientWidth,
				distanceLeft: 0,
				questionList: new Array(3),
				currentIndex: [],
				distanceScrollTop: 0
			}
		},
		mounted() {
			window.addEventListener('scroll', this.isShowScrollTopFn)
			window.addEventListener('resize', this.handleResize)
			this.distanceChangeFn(this.$el)
			console.log(document.documentElement.clientHeight)
			$(function() {
				$('.homeQuestion-head img').attr('src', '../../../static/home/img/search_3.png')
			})
		},
		computed: {
			distanceTop() {
				return this.$store.state.device.distanceTop
			}
		},
		methods: {
			handleResize(event) {
				this.fullWidth = document.documentElement.clientWidth
				this.distanceChangeFn(this.$refs.homeQuestion)
			},
			distanceChangeFn(homeQuestion) {
				this.distanceLeft = homeQuestion.parentNode.getBoundingClientRect().left
			},
			isShowListDetailFn: function(index) {
				let variable = this.currentIndex.includes(index)
				if(!variable) {
					this.currentIndex.push(index)
				}
			},
			isHideListDetailFn: function(index) {
				let variable = this.currentIndex.findIndex((n) => n === index)
				this.currentIndex.splice(variable, 1)
			},
			homeQuestionScrollTopFn() {
				// 火狐和ie触发html的动画
				// chrome触发body的动画
				$('html').animate({
					scrollTop: 0
				}, 500)
				$('body').animate({
					scrollTop: 0
				}, 500)
			},
			isShowScrollTopFn() {
				this.distanceScrollTop = $(document).scrollTop()
			}
		}
	}
</script>

<style>
	@import "../../assets/css/home/homeQuestion.css";
</style>