<template>
    <div>
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
            	<div class="content-right" :class="payClass" @click.stop.prevent="pay">
            		{{ payDesc }}
            	</div>
        	</div>
            <transition name="fade">
        	    <div class="shopcart-list" v-show="listshow">
            	    <div class="list-header">
            			<h1 class="car">购物车</h1>
            			<span class="empty" @click="onRemove">清空</span>
            		</div>
            		<div class="shopcart-wrapper" ref="shopcartWrapper">
            			<ul class="new-wrapper">
            				<li v-for="item in selectFoods" :key="item.name" class="food-name">
            					<span class="name">{{ item.name }}</span>
            					<span class="food-price">{{ item.price * item.count}}</span>
                                <div class="cartcontrol-wrapper">
                                    <cart-control :food="item"></cart-control>
                                </div>
            				</li>
            			</ul>
            		</div>
        	   </div>
            </transition>   
        </div>
        <transition name="mark">
            <div class="list-mark" v-show="listshow" @click="handList"></div>
        </transition>
    </div>
</template>

<script>
	import cartControl from 'components/cartControl/cartControl'
    import Bscroll from 'better-scroll'
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
            	fold: true
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
        		if(this.totalPrice >= this.minPrice ) {
        			return '去结算';
        		}
        	},
        	payClass () {
        		if(this.totalPrice >= this.minPrice) {
        			return 'enough'
        		}
        		if(this.minPrice > this.totalPrice) {
        			return 'not-enough'
        		}
        	},
        	listshow () {
        		if(!this.totalCount) {
        			this.fold = true;
        			return false;
        		}
        		let show = !this.fold
                if(show) {
                    this.$nextTick(() => {
                        if(!this.scroll) {
                            this.scroll = new Bscroll(this.$refs.shopcartWrapper, {
                                scrollY: true,
                                click: true
                            })
                        }else {
                            this.scroll.refresh();
                        }
                        
                    })
                }
                console.log(this.$el);
        		return show
        	}
        },
        mounted () {
        },
        methods: {
        	toggleList () {
        		if(!this.totalCount) {
        			return;
        		}
        		this.fold = !this.fold;
        	},
                
            onRemove () {
                this.selectFoods.forEach((food) => {
                    food.count = 0;
                })
            },

            handList() {
                this.fold = true;
            },

            pay () {
                if(this.totalPrice < this.minPrice) {
                    return;
                }
                window.alert(`支付${this.totalPrice}元`);
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .shop-cart
        position: fixed
        bottom: 0
        left: 0
        width: 100%
        height: 54px
        z-index: 40
        background-color: #ccc;
    	.content
            display: flex
            height: 54px
            .content-left
                flex: 1
                padding: 12px 12px 12px 80px
                background-color: #141d27
                box-sizing: border-box 
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
            z-index: -1
            transform: translate3d(0,-100%,0)
            &.fade-enter-active, &.fade-leave-active
                transition: all 0.5s

            &.fade-enter, &.fade-leave-active
                transform: translate3d(0,0,0)
            .list-header
                width: 100%
                height: 40px
                background-color: #f3f5f7
                border: 1px solid rgba(7,17,27,0.1)
                .car
                    float: left
                    margin-left: 18px
                    font-size: 14px
                    color: rgb(7,17,27)
                    line-height: 40px
                .empty
                    float: right
                    font-size: 12px
                    color: rgb(0,160,220)
                    line-height: 40px
                    margin-right: 18px
            .shopcart-wrapper
                max-height: 217px
                overflow: hidden
                background-color: #fff;
                .new-wrapper
                    padding: 0 18px
                    box-sizing: border-box
                    .food-name
                        position: relative
                        width: 100%
                        height: 48px
                        padding: 12px 0
                        box-sizing: border-box
                        border-bottom: 1px solid rgba(7,17,27,0.1)
                        .name
                            line-height: 24px
                        .food-price
                            position: absolute
                            right: 90px
                            bottom: 12px
                            color: rgb(240,20,20)
                        .cartcontrol-wrapper
                            display: inline-block
                            position: absolute
                            bottom: 6px
                            right: 0px
    .list-mark
        position: fixed
        top: 0
        left: 0
        width: 100%
        height: 100%
        z-index: 30
        background-color: rgba(7,17,27,0.6)
        backdrop-filter: blur(10px)
        &.mark-enter-active, &.mark-leave-active
            transition: all 0.5s
        &.mark-enter, &.mark-leave-active
            background-color: rgba(7,17,27,0)




       
</style>