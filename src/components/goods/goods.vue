<template>
	<div class="goods">
		<div class="menu-wrapper" ref="menuWrapper">
		 	<ul>
		 		<li class="menu-item clearfix" v-for="(good, index) in goods" :key="good.name" :class="{current: currentIndex == index}" @click="onIndex(index, $event)">
		 		<span class="text border-1px">
		 			<v-map :size=3 :class-type="map[good.type]" v-if="good.type > -1"></v-map>
		 			{{ good.name}}
		 		</span>
		 		</li>
		 	</ul>
		</div>
		 
		<div class="foods-wrapper" ref="foodWrapper">
		 	<ul>
		 		<p class="drop-down" v-if="dropDown">松手刷新数据...</p>
		 		<li v-for="item in goods" class="food-list food-list-hook">
		 			<h1 class="title">{{ item.name }}</h1>
		 			<ul class="food-wrapper">
		 				<li v-for="food in item.foods" class="food-item border-1px">
		 					<div class="icon">
		 						<img width="57" height="57" :src="food.icon" alt="">
		 					</div>
		 					<div class="text">
		 						<h2 class="name">{{ food.name}}</h2>
		 						<p class="desc">{{ food.description }}</p>
		 						<div class="extra">
		 							<span class="sell-count">月售{{ food.sellCount}}份</span>
		 							<span>好评率{{ food.rating }}%</span>
		 						</div>
		 						<div class="price">
		 							<span class="now">￥{{ food.price}}</span>
		 							<span v-show="food.oldPrice" class="old"> {{ food.oldPrice}}</span>
		 						</div>
		 						<div class="cart-control">
		 							<cart-control :food="food"></cart-control>
		 						</div>
		 					</div>
		 				</li>
		 			</ul>
		 		</li>
		 	</ul>
		</div>

		<shop-cart :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice" :select-foods="selectFoods"></shop-cart>
	</div>
</template>

<script>
	import BScroll from 'better-scroll'
	import vMap from 'components/map/mapClass'
	import shopCart from 'components/shopCart/shopCart'
	import cartControl from 'components/cartControl/cartControl'
	export default {
		name: 'goods',
		props: {
			seller: {
				type: Object
			}
		},
		data () {
			return {
				goods: [],
				map: ['decrease', 'discount', 'guarantee', 'invoice', 'special'],
				dropDown: false,
				scrollY: 0,
				heightArr: []
			}
		},
		components: {
			vMap,
			shopCart,
			cartControl
		},
		created () {
			this.$http.get('api/goods')
			.then((res) => {
				if(!res.body.errno) {
					this.goods = res.body.data
					this.$nextTick(() => {
						this._initScroll();
						this._initHeight();
					})
				}
				
			}, (err) => {
				console.log(err);
			})
		},
		mounted () {
			
		},
		computed: {
			currentIndex () {
				//跳出了循环i
				for(let i = 0; i < this.heightArr.length; i++) {
					let height = this.heightArr[i],
						height1 = this.heightArr[i + 1];
						console.log(i,height,height1,this.scrollY);
					if(!height1 || (this.scrollY >= height && this.scrollY < height1) ) {
						return i;
					}
				}
				return 0;
			},
			selectFoods () {
				let foods = [];
				this.goods.forEach((good) => {
					good.foods.forEach((food) => {
						if(food.count) {
							foods.push(food);
						}
					})
				})
				return foods;
			}
		},
		methods: {
			_initScroll () {
				this.menuWrapper = new BScroll(this.$refs.menuWrapper,{
					scrollY: true, // 因为scrollY默认为true，其实可以省略
					click: true

				});
				
				

				this.foodWrapper = new BScroll(this.$refs.foodWrapper,{
					scrollbar :{
						fade: true,//// fade 默认为 true，滚动条淡入淡出

					},
					click: true,
					probeType: 3,//我们可以使用probeType选项，当此选项设置为 3 时，会在整个滚动过程中实时派发 scroll 事件。从而获取滚动过程中的位置。
					pullDownRefresh: {
					  	threshold: 50, // 当下拉到超过顶部 50px 时，触发 pullingDown 事件
					  	stop: 20 // 刷新数据的过程中，回弹停留在距离顶部还有 20px 的位置
					}
				});
				//用这个实例对象取监听实时滚动的时候将位置给暴露出来
				this.foodWrapper.on('scroll', (pos) => {
					//pos.y是一个小数(有正负之分)
					this.scrollY = Math.abs(Math.round(pos.y));
					if(pos.y > 50) {
						this.dropDown = true;
						console.log('加载数据')
					}else {
						this.dropDown = false;
					}
					// console.log(this.scrollY);
                })
			},
			_initHeight () {
				let height = 0,
					// arrHeight = [],
					foodList;
				foodList = this.$refs.foodWrapper.getElementsByClassName('food-list-hook');
				// console.log(foodList);
				this.heightArr.push(height) 
				for(let i = 0; i < foodList.length; i++) {
					height += foodList[i].clientHeight;
					this.heightArr.push(height);
				}
				// console.log(this.heightArr);
			},
			onIndex(index, event) {
				let foodList = this.$refs.foodWrapper.getElementsByClassName('food-list-hook');
				let el = foodList[index];
				this.foodWrapper.scrollToElement(el, 300)
			}
		}
	}
</script>

<style lang="stylus" rel="stylesheet">
	@import '../../common/stylus/mixin.styl'
	.goods
		width: 100%
		position: absolute
		top: 174px
		bottom: 46px
		overflow: hidden
		display: flex
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
				&.current{
					position: relative
					background-color: #fff
					margin-top: -2px
					border: 0
				}
				.text
					width: 100%
					display: table-cell
					vertical-align: middle
					font-size: 12px
					border-1px(rgba(7,17,27,0.1))
					margin-right: 2px		
		.foods-wrapper
			flex: 1
			.drop-down
				text-align: center
			.food-list
				width: 100%
				.title
					padding-left: 14px
					box-sizing: border-box
					border-left: 2px solid #d9dde1;
					height: 26px
					line-height: 26px
					color: rgb(147,153,159)
					font-size: 12px
					background-color: #f3f5f7;
				.food-item
						display: flex
						padding: 18px 18px
						border-1px(rgba(7,17,27,0.1))
						&:last-child
							border: 0
						.icon
							flex: 0 0 57px
							margin-right: 10px
						.text
							.name
								font-size: 14px
								color: rgb(7,17,27)
								line-height: 14px
							.desc
								font-size: 10px
								color: rgb(147,153,159)
								line-height: 10px
								margin: 8px 0px
							.extra
								font-size: 10px
								color: rgb(147,153,159)
								line-height: 10px
								.sell-count
									margin-right: 8px
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
							.cart-control
								position: absolute
								bottom: 12px
								right: 12px

</style>