<template>
	<div class="ratings">
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
		</div>
			
	</div>
</template>

<script>
	import star from '../star/star'
	export default {
		props: {
			seller: {
				type: Object,
				default () {
					return {}
				}
			}
		},
		components: {
			star
		}
	}
</script>

<style lang="stylus" rel="stylesheet">
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
</style>