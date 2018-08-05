<template>
	<transition name="move">		
		<div class="food" v-show="showFlag" ref="foodConent">
			<div class="food-content">
				<div class="image-header">
					<img :src="food.image" alt="" class="img" >
					<div class="back" @click="close">
						<i class="icon-arrow_lift"></i>
					</div>
				</div>
				<div class="contenter">
					<h1 class="title">{{ food.name }}</h1>
					<div class="detail">
						<span>月售{{ food.sellCount}}份</span>
						<span>好评率{{ food.rating }}%</span>
					</div>
					<div class="price">
						<span class="now">￥{{ food.price}}</span>
						<span v-show="food.oldPrice" class="old"> {{ food.oldPrice}}</span>
					</div>
					<div class="cartcontrol-wrapper" v-show="cartShow">
						<cart-control :food="food"></cart-control>
					</div>
					<div class="buy" v-show="!food.count || food.count===0" @click="addFirst">
						加入购物车
					</div>
				</div>
				<div class="description">
					<h1 class="title">商品详情</h1>
					<p class="info">{{ food.info }}</p>
				</div>
				<div class="rating">
					<div class="title">商品评价</div>
					<div class="rating-wrapper">
						<rating-select :desc="desc" :select-type="selectType" :only-content="onlyContent" :ratings="food.ratings"></rating-select>
					</div>
				</div>

			</div>
		</div>
	</transition>
</template>

<script>
	import Bscroll from 'better-scroll'
	import Vue from 'vue'
	import cartControl from 'components/cartControl/cartControl'
	import ratingSelect from 'components/ratingSelect/ratingSelect'
	const ALL = 2,
		  POSITIVE = 0,
		  NEGATIVE = 1;

	export default {
		name: 'food',
		data () {
			return {
				showFlag: false,
				cartShow: false,
				desc: {
					all: '全部',
					positive: '满意',
					negative: '不满意'
				},
				selectType: ALL,
				onlyContent: true
			}
		},
		props: {
			food: {
				type: Object
			}
		},
		components: {
			cartControl,
			ratingSelect
		},
		methods: {
			show () {
				this.showFlag = true;
				//初始化
				this.selectType = ALL;
				this.onlyContent = true;
				this.$nextTick(() => {
					if(!this.scroll) {
						this.scroll = new Bscroll(this.$refs.foodConent,{
							click: true
						});
					} else {
						this.scroll.refresh();
					}
					
				})
			},
			close () {
				this.showFlag = false;
			},
			addFirst () {
				this.cartShow = true;
				if(!this.food.count) {
					Vue.set(this.food, 'count', 1);
				}
			}
		}
	}
</script>

<style lang="stylus" scoped>
	.food 
		position: fixed
		top: 0
		bottom: 48px
		left: 0
		right: 0
		z-index: 30
		background-color: #f3f5f7
		&.move-enter-active, &.move-leave-active
			transition: all 0.5s
		&.move-enter
			opacity: 0
			transform: translateX(100%)
		&.move-leave-active
			opacity: 0
			transform: translateY(100%)
		.image-header
			position: relative
			width: 100%
			height: 0
			padding-top: 100%
			.img
				position: absolute
				top: 0
				left: 0
				width: 100%
				height: 100%
			.back
				position: absolute
				top: 10px
				left: 10px
				.icon-arrow_lift
					font-size: 14px
					color: #fff
		.contenter
			position: relative
			background #fff
			width: 100%
			box-sizing: border-box
			padding: 18px 18px
			.title
				font-size: 14px
				font-weight: 700
				color: rgb(7,17,27)
				line-height: 14px
			.detail
				margin-top: 8px
				font-size: 10px
				color: rgb(147,153,159)
				margin-bottom: 18px
			.price
				font-size: 14px
				font-weight: 700
				line-height: 24px
				.now
					color: rgb(240,20,20)
				.old
					font-size: 10px
					text-decoration: line-through
					color: rgb(143,153,159)
			.cartcontrol-wrapper
				position: absolute
				bottom: 12px
				right: 12px	
			.buy
				position: absolute
				right: 18px
				bottom: 18px
				padding: 6px 12px
				color: #fff
				background-color: rgb(0,160,220)
				border-radius: 12px
				font-size: 10px
				line-height: 12px
				z-index: 10
		.description
			margin-top: 16px
			margin-bottom: 16px
			background-color: #fff
			box-sizing : border-box
			width: 100%
			padding: 18px
			.title
				font-weight: 700
				font-size: 14px
				margin-bottom: 6px
				color: rgb(7,17,27)
			.info
				font-size: 12px
				color: rgb(77,85,93)
		.rating
			width: 100%
			background-color #fff
			box-sizing: border-box
			padding-top: 18px
			.title
				margin-left: 18px
				font-weight: 700
				font-size: 14px
				margin-bottom: 6px
				color: rgb(7,17,27)



</style>