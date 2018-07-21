<template>
	<div class="cart-wrapper">
		<div class="cart-decrese icon-remove_circle_outline" v-show="count > 0"></div>
		<div class="cart-count"></div>
		<div class="cart-add icon-add_circle"></div>
	</div>
</template>

<script>
	export default {
		name: 'cart-wrapper',
		props: {
			food: {
				type: Object
			}
		},
		data () {
			return {
				count: 0
			}
		}
	}
</script>

<style lang="stylus">
	.cart-wrapper
		font-size: 0
		.cart-decrese,.cart-add
			display: inline-block
			font-size: 24px
			padding: 6px
			color: rgb(0,160,220)
			line-height: 24px
		.cart-count
			display: inline-block
			font-size: 10px
			line-height: 24px
			color: rgb(147,153,159)
</style>