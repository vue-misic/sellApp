<template>
    <div class="shop-cart">
    	<div class="content" @click="toggleList">
    		<div class="content-left">
    			<div class="logo-wrapper">
    				<div class="logo" :class="{'highlight': totalCount>0}">
    					<i class="icon-shopping_cart" :class="{'highlight': totalCount>0}"></i>
    				</div>
    				<div class="num" v-show="totalCount>0"> {{ totalCount }}</div>
    			</div>
    			<div class="price" :class="{'highlight': totalPrice>0}">￥{{ totalPrice }}元</div>
    			<div class="desc">另需配送费￥{{ deliveryPrice }}元</div>
    			
    		</div>
        	<div class="content-right" :class="payClass">
        		{{ payDesc }}
        	</div>
    	</div>
    	<div class="shopcart-list">
    		<div class="list-header">
    			<h1></h1>
    			<span class="empty"></span>
    		</div>
    		<div class="shopcart-wrapper" v-show="listshow">
    			<ul>
    				<li v-for=" item in selectFoods">
    					<span class="name">{{ item.name }}</span>
    					<span>{{ item.price * item.count}}</span>
						<cart-control :food="item"></cart-control>
    				</li>
    			</ul>
    		</div>
    	</div>
    </div>
</template>

<script>
	import cartControl from 'components/cartControl/cartControl'
    export default {
        name: 'shop-cart',
        props: {
        	deliveryPrice: {
        		type: Number,
        		default: 0
        	},
        	minPrice: {
        		type: Number,
        		default: 0
        	},
        	selectFoods: {
        		type: Array,
        		default() {
        			return []
        		}
        	}
        },
        data () {
            return {
            	flod: true
            }
        },
        components: {
        	cartControl
        },
        computed: {
        	totalPrice () {
        		let totalPrice = 0;
        		this.selectFoods.forEach((food) => {
        			totalPrice += food.price * food.count
        		})
        		return totalPrice;
        	},
        	totalCount() {
        		let count = 0;
        		this.selectFoods.forEach((food) => {
        			count += food.count;
        		})
        		return count;
        	},
        	payDesc () {
        		if(this.totalPrice === 0) {
        			return `${this.minPrice}元起送`;
        		}
        		if(this.totalPrice > 0 && this.totalPrice < this.minPrice) {
        			return '还差' + (this.minPrice - this.totalPrice) + '起送';
        		}
        		if(this.totalPrice > this.minPrice ) {
        			return '去结算';
        		}
        	},
        	payClass () {
        		if(this.totalPrice > this.minPrice) {
        			return 'enough'
        		}
        		if(this.minPrice > this.totalPrice) {
        			return 'not-enough'
        		}
        	},
        	listshow () {
        		if(!this.totalCount) {
        			this.flod = true;
        			return false;
        		}
        		let show = !this.flod
        		return show
        	}
        },
        methods: {
        	toggleList () {
        		if(!this.totalCount) {
        			return;
        		}
        		console.log('1234');
        		this.fold = !this.flod;
        		console.log('3456');
        	}
        }
    }
</script>

<style lang="stylus">
	.shop-cart
		width: 100%
		position: fixed
		left: 0
		bottom: 0
		z-index: 5
		height: 48px
		background-color: #ccc
		.content
			display: flex
			height: 54px
			.content-left
				box-sizing: border-box
				flex: 1 0 auto
				padding: 12px 12px 12px 80px
				background-color: #141d27
				.logo-wrapper
					display: inline-block
					position: absolute
					z-index: 10
					left: 18px
					bottom: 8px
					width: 56px
					height: 56px
					padding: 6px
					box-sizing: border-box
					border-radius: 50%
					background-color: #141d27
					.logo
						width: 100%
						height: 100%
						border-radius: 50%
						background-color: #2b343d
						text-align: center
						&.highlight
							background-color: rgb(0,160,220)
						.icon-shopping_cart
							font-size: 24px
							color:  #80858a
							line-height: 44px
							&.highlight
								color: #fff
					.num
						position: absolute
						top: 0
						right: 0
						width: 24px
						height: 16px
						background-color: rgb(240,20,20);
						border-radius: 16px
						line-height: 16px
						text-align: center
						font-size: 9px
						font-weight: 700
						box-shadow: 0 4px 8px 0 rgba(0,0,0,0.4)
						color: #fff
				.price
					display: inline-block
					font-size: 16px
					color: rgba(255,255,255,0.4)
					font-weight: 700
					line-height: 24px
					margin-right: 12px
					&.highlight
						color: #fff
				.desc
					display: inline-block
					padding-left: 12px
					font-size: 10px
					font-weight: 700
					line-height: 24px
					color: rgba(255,255,255,0.4) 
					border-left: 2px solid rgba(255,255,255,0.1)
			.content-right
				flex: 0 0 105px
				width: 105px
				font-size: 12px
				line-height: 54px
				text-align: center
				font-weight: 700
				color: rgba(255,255,255,0.4)
				&.enough
					background-color: #00b43c
					color: #fff
				&.not-enough
					background-color: #2b333b
			.shopcart-list
				position: absolute
				top: 0
				left: 0
				width: 100%
				height: 500px
				background-color: blue
				z-index: 50
</style>