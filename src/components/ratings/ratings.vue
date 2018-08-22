<template>
	<div class="ratings" ref="rating">
		<div class="rating-content">
			<div class="overview">
				<div class="overview-left">
					<h1 class="score">{{ seller.score }}</h1>
					<p class="all">综合评价</p>
					<div class="per">高于周边商家{{ seller.rankRate }}%</div>	
				</div>
				<div class="overview-right">
					<div class="score-wrapper">
						<span class="title">服务态度:</span>
						<div class="star">
							<star :size="36" :score="seller.serviceScore"></star>
						</div>
						<span class="score">{{ seller.serviceScore }}</span>
					</div>
					<div class="score-wrapper">
						<span class="title">服务态度:</span>
						<div class="star">
							<star :size="36" :score="seller.foodScore"></star>
						</div>
						<span class="score">{{ seller.foodScore }}</span>
					</div>
					<div class="delivery-time">
						<span class="title">送达时间</span>
						<span class="time">{{ seller.deliveryTime }}</span>
					</div>
				</div>
			</div>
			<rating-select  @select-change="onSelectChange" @toggle-change="onToggle" :select-type="selectType" :only-content="onlyContent" :ratings="ratings">
			</rating-select>
			<div class="ratings-wrapper">
				<ul>
					<li 
						v-for="rating in ratings"
						:key="rating.rateTime"
						class="rating-item border-1px">
						<div class="avatar">
							<img :src="rating.avatar"  style="width: 28px;" alt="">
						</div>
						<div class="content">
							<div class="name">{{ rating.username }}</div>
							<div class="stars-wrapper">
								<star class="star" :size="24" :score="rating.score"></star>
								<span class="delivery" v-show="rating.deliveryTime"> {{ rating.deliveryTime }}分钟送达</span>
							</div>
							<div class="text"> {{ rating.text }}</div>
							<div class="recommend" v-show="rating.recommend">
								<span :class="{'icon-thumb_up': rating.rateType===0,'icon-thumb_down': rating.rateType===1}"></span>
								<span
								class="commend"
								v-for="commend in rating.recommend"
								:key="commend.index"
								>{{ commend }}</span>
							</div>
							<div class="time">{{ rating.rateTime|formatDate}}</div>
						</div>
						<!-- <div class="content">
							<div class="name">
								{{ rating.username }}
							</div>
							<div >
								<star class="star" :size="24" :score="rating.score"></star> -->
								<!-- <span class="delivery" v-show="rating.deliveryTime"> {{ rating.deliveryTime }}分钟送达</span>
							</div>-->
							<!-- <div class="text"> {{ rating.text }}</div>  -->
							<!-- <div class="recommend" v-show="rating.recommend">
								<span :class="{'icon-thumb_up': rating.rateType===0,'icon-thumb_down': rating.rateType===1}"></span>
								<span
								class="commend"
								v-for="commend in rating.recommend"
								:key="commend.index"
								>{{ commend }}</span>
							</div> -->
							<!-- <div class="time">{{ rating.rateTime|formatDate}}</div> -->
						<!--</div> -->
					</li>
				</ul>
			</div>
		</div>
			
	</div>
</template>

<script>
	const ALL = 2,
		  POSITIVE = 0,
		  NEGATIVE = 1;
	import star from '../star/star'
	import ratingSelect from '../ratingSelect/ratingSelect'
	import { formatDateValue } from '../../common/js/date.js'
	import BScroll from 'better-scroll'
	export default {
		data () {
			return {
				selectType: ALL,
				onlyContent: false,
				desc: {
					all: '全部',
					positive: '满意',
					negative: '不满意'
				},
				ratings: [],
			}
		},
		props: {
			seller: {
				type: Object,
				default () {
					return {}
				}
			}
		},
		filters: {
			formatDate (time) {
				let date = new Date(time);
				return formatDateValue(date, 'yyyy-MM-dd hh:mm:ss')
			}
		},
		components: {
			star,
			ratingSelect
		},
		created () {
			this.$http.get('/api/ratings').then
			((res) => {
				this.ratings = res.body.data;
				this.$nextTick(() => {
					this.scroll = new BScroll(this.$refs.rating,{
						click: true
					})
				})
			})
		},
		computed: {
			
		},
		methods: {
			needShow(type, text) {
				if(this.onlyContent) {
					if(text) {
						return false;
					} else {
						return true;
					}
				}
				if(this.selectType === ALL) {
					return true;
				}else {
					return this.selectType === type
				}
			},
			onSelectChange (type) {
				this.selectType = type;
				this.$nextTick(() => {
					this.scroll.refresh();
				})
			},
			onToggle () {
				this.onlyContent = !this.onlyContent;
				this.$nextTick(() => {
					this.scroll.refresh();
				})
			}
		}
	}
</script>

<style lang="stylus" rel="stylesheet" scoped>
	@import '../../common/stylus/mixin.styl'
	.ratings
		position: absolute
		top: 174px
		bottom: 0
		left: 0
		width: 100%
		overflow: hidden
		.rating-content
			padding: 18px  0px 18px 0px
			box-sizing: border-box
			width: 100%
			.overview
				display: flex
				padding-bottom: 18px
				border-bottom: 1px solid rgba(7,17,27,0.1)
				.overview-left
					text-align: center
					flex: 0 0 137px
					border-right: 1px solid rgba(7,17,27,0.2)
					@media only screen and (max-width: 320px)
						flex: 0 0 120px
						width: 120px
					.score
						font-size: 24px
						color: rgb(255,153,0)
						line-height 28px
					.all
						font-size: 12px
						line-height 12px
						margin: 6px 0 8px 0
						color: rgb(7,17,27)
					.per
						font-size: 10px
						line-height 10px
						color: rgba(7,17,27,0.2)

				.overview-right
					flex: 1
					box-sizing: border-box
					padding: 6px 0 6px 24px
					@media screen and (max-width: 320px) 
						padding-left: 6px

					
					.score-wrapper
						margin-bottom: 8px
						font-size: 12px
						.star
							display: inline-block
							vertical-align: top
							margin: 0 12px
							@media screen and (max-width: 320px) 
								margin: 0px 0px
						.title
							display: inline-block
							vertical-align: top
							line-height: 18px
							color: rgb(7,17,27)
						.score
							display: inline-block
							vertical-align: top
							line-height: 18px
							color: rgb(255,253,0)
					
					.delivery-time
						font-size: 12px
						line-height: 18px
						.title
							color: rgb(7,17,27)
						.time
							color: rgb(147,153,159)
							margin-left: 12px
			.ratings-wrapper
				box-sizing: border-box
				padding: 0px 18px
				.rating-item
					position: relative
					width: 100%
					box-sizing: border-box
					padding: 18px 0
					border-1px(rgba(7,17,27,0.1))
					display: table
					.avatar
						display: table-cell
						width: 28px
						img 
							border-radius: 50%
					.content
						position: relative
						margin-left: 12px
						.name
							font-size: 10px
							line-height: 12px
							color: rgb(7,17,27)
							margin-bottom: 4px
						.stars-wrapper
							
							.delivery
								font-size: 10px
								font-weight: 200
								color: rgb(147,153,159)
								line-height: 12px
						.text
							font-size: 12px
							line-height: 18px
							color: rgb(7,17,27)
							margin: 6px 0 8px 0
						.recommend
							.icon-thumb_up
								line-height: 24px
								color: rgb(0,160,220)
							.icon-thumb_down
								line-height: 24px
								color: rgb(147,153,159)
							.commend
								display: inline-block
								padding: 0 6px
								border: 1px solid rgba(7,17,27,0.1)
								border-radius: 2px
								margin-left: 8px
								font-size: 9px
								color: rgb(147,153,159)
								line-height: 16px
								vertical-align: 1px
						.time
							position: absolute
							top: 18px
							right: 0
							font-size: 10px
							font-weight: 200
							color: rgb(147,153,159)
							line-height: 12px

						
						

</style>