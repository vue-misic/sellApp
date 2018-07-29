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
					<div class="cartcontrol-wrapper">
						<cart-control :food="food"></cart-control>
					</div>
					<div class="buy" v-show="food.count || food.count ===0 " @click="addFirst">
						加入购物车
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
	import Bscroll from 'better-scroll'
	import cartControl from 'components/cartControl/cartControl'
	export default {
		name: 'food',
		data () {
			return {
				showFlag: false
			}
		},
		props: {
			food: {
				type: Object
			}
		},
		components: {
			cartControl
		},
		methods: {
			show () {
				this.showFlag = true;
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
		background-color: #fff;
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
		.cartcontrol-wrappe
			position: absolute
			bottom: 12px
			right: 18px
			z-index: 10
		.buy
			position: absolute
			right: 18px
			bottom: 18px
			padding: 6px 12px
			color: #fff
			background-color: rgb(0,160,220)
			border-raduis: 12px
			font-size: 10px
			line-height: 12px
</style>