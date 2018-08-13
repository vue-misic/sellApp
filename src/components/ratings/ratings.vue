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

				</div>
			</div>
		</div>
			
	</div>
</template>

<script>
	export default {
		props: {
			seller: {
				type: Object,
				default () {
					return {}
				}
			}
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
			padding: 18px  24px 18px 0px
			box-sizing: border-box
			width: 100%
			.overview
				display: flex
				padding-bottom: 18px
				border-bottom: 1px solid rgba(7,17,27,0.1)
				.overview-left
					text-align: center
					flex: 0 0 137px
					.score
						font-size: 24px
						color: rgb(255,153,0)
						line-height 28px
					.all
						font-size: 12px
						line-height 12px
						color: rgb(7,17,27)
					.per
						font-size: 10px
						line-height 10px
						color: rgba(7,17,27,0.2)

				.overview-right
					flex: 1
</style>