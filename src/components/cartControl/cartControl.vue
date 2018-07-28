<template>
	<div class="cart-wrapper">
		<div class="cart-decrese icon-remove_circle_outline" v-show="food.count > 0" @click="cartDecrese"></div>
		<div class="cart-count" v-show="food.count > 0">{{ food.count }}</div>
		<div class="cart-add icon-add_circle" @click="addCard"></div>
	</div>
</template>

<script>
	import Vue from 'vue'
	export default {
		name: 'cart-wrapper',
		props: {
			food: {
				type: Object
			}
		},
		data () {
			return {
			}
		},
		methods: {
			addCard () {
				if(!this.food.count) {
					Vue.set(this.food, 'count', 1)
					return;
				}
				this.food.count ++;
			},
			cartDecrese () {
				if(!this.food.count) {
					return;
				}
				this.food.count --;
			}
		}
	}
</script>

<style lang="stylus">
	.cart-wrapper
		font-size: 0
		display: inline-block
		.cart-decrese,.cart-add
			display: inline-block
			font-size: 24px
			padding: 6px
			color: rgb(0,160,220)
			line-height: 24px
			vertical-align: -4px
		.cart-count
			display: inline-block
			font-size: 10px
			line-height: 24px
			color: rgb(147,153,159)
</style>