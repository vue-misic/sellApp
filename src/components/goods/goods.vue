<template>
	<div class="goods">
		 <div class="menu-wrapper">
		 	<ul>
		 		<li class="menu-item clearfix" v-for="good in goods" :key="good.name">
		 		<span class="text border-1px">
		 			<v-map :size=3 :class-type="map[good.type]" v-if="good.type > -1"></v-map>
		 			{{ good.name}}
		 		</span>
		 		</li>
		 	</ul>
		 </div>
		 <div class="foods-wrapper">
		 	<ul>
		 		<li v-for="item in goods" class="food-list">
		 			<h2>{{ item.name }}</h2>
		 			<ul>
		 				<li v-for="food in item.foods" class="food-item">
		 					<div>
		 						<img :src="food.icon" alt="">
		 					</div>
		 					<div>
		 						<h2>{{ food.name}}</h2>
		 						<span>{{ food.description }}</span>
		 						<div>
		 							<span>月售{{ food.sellCount}}份</span>
		 							<span>{{ food.rating }}</span>
		 						</div>
		 						<div class="price">
		 							<span>{{ food.price}}</span>
		 							<span v-show="food.oldPrice"> {{ food.oldPrice}}</span>
		 						</div>
		 					</div>
		 				</li>
		 			</ul>
		 		</li>
		 	</ul>
		 </div>
	</div>
</template>

<script>
import vMap from 'components/map/mapClass'
	export default {
		name: 'goods',
		data () {
			return {
				goods: [],
				map: ['decrease', 'discount', 'guarantee', 'invoice', 'special'],
			}
		},
		components: {
			vMap
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
			.menu-item
				display: table
				width: 100%
				box-sizing: border-box
				padding: 0 12px
				height: 54px
				align-items: center
				line-height: 14px
				/*color: rgb(240,20,20)*/
				.text
					width: 100%
					display: table-cell
					vertical-align: middle
					font-size: 12px
					border-1px(rgba(7,17,27,0.1))
					margin-right: 2px
					
		.foods-wrapper
			flex: 1
			.food-list
				width: 100%
				box-sizing: border-box
				.food-item
					display: flex
</style>