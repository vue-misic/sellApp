<template>
	<div class="goods">
		 <div class="menu-wrapper">
		 	<ul>
		 		<li class="good-wrapper clearfix" v-for="good in goods" :key="good.name">{{ good.name}}</li>
		 	</ul>
		 </div>
		 <div class="foods-wrapper"></div>
	</div>
</template>

<script>
	export default {
		name: 'goods',
		data () {
			return {
				goods: []
			}
		},
		created () {
			this.$http.get('api/goods')
			.then((res) => {
				if(!res.body.errno) {
					this.goods = res.body.data
					console.log(this.goods);
				}
				
			}, (err) => {
				console.log(err);
			})
		}
	}
</script>

<style lang="stylus" rel="stylesheet">
	@import '../../common/stylus/mixin.styl'
	.goods
		width: 100%
		display: flex
		position: absolute
		top: 174px
		bottom: 46px
		overflow: hidden
		justify-content: left
		.menu-wrapper
			flex: 0 1 80px
			width: 80px
			background-color: #f3f5f7;
			.good-wrapper
				width: 100%
				box-sizing: border-box
				padding: 0 12px
				height: 54px
				line-height: 14px
				text-align: center
				font-size: 12px
				/*color: rgb(240,20,20)*/
				border-1px(rgba(7,17,27,0.1))

		.foods-wrapper
			flex: 1 0 auto
</style>