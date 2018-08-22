<template>
	<div class="seller" ref="seller">
		<div class="seller-wrapper">
			<div class="overview">
				<div class="title">{{ seller.name }}</div>
				<div class="star">
					<star :size="36" :score="seller.score"></star>
					<span class="text">({{ seller.ratingCount }})</span>
					<span class="text">月售{{ seller.sellCount }}单</span>
				</div>
				<ul class="remark">
					<li class="block">
						<h1 class="main">起送价</h1>
						<div class="coutent">
							<span class="stress">
								{{ seller.minPrice }}
							</span>元
						</div>
					</li>
					<li class="block">
						<h1 class="main">商家配送</h1>
						<div class="coutent">
							<span class="stress">
								{{ seller.deliveryPrice }}
							</span>元
						</div>
					</li>
					<li class="block">
						<h1 class="main">平均配送时间</h1>
						<div class="coutent">
							<span class="stress">
								{{ seller.deliveryTime }}
							</span>分钟
						</div>
					</li>
				</ul>
				<div class="favorite"  @click="favorite = !favorite">
					<span class="icon-favorite" :class="{'active': favorite}"></span>
					<span class="text">{{ favoriteText }}</span>
				</div>
			</div>
			<div class="content-wrapper">
				<h1 class="title">公告与活动</h1>
				<p class="bulletin">{{ seller.bulletin }}</p>
				<ul>
					<li class="support"
					v-for="support in seller.supports"
					:key="support.description"
					>
						<map-class :size=2 :class-type="map[support.type]"></map-class>
						<span class="text">{{ support.description }}</span>
					</li>
				</ul>
				<div class="pics">
					<h1 class="title">商家实景</h1>
					<div class="pics-wrapper" ref="picsWrapper">
						<ul class="pic-list" ref="picList">
							<li 
							class="pic-item"
							v-for="pic in seller.pics"
							:key="pic.index"
							>
								<img :src="pic" alt="" style="width: 120px; height: 90px;">
							</li>
						</ul>
					</div>
				</div>
				<div class="info">
					<h1 class="title">商家信息</h1>
					<ul>
						<li
						class="info-item"
						v-for="info in seller.infos"
						:key="info.index"
						>
							{{ info }}
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import star from 'components/star/star'
	import mapClass from 'components/map/mapClass'
	import BScroll from 'better-scroll'
	
	export default {
		components: {
			star,
			mapClass
		},
		data () {
			return {
				map: ['decrease', 'discount', 'guarantee', 'invoice', 'special'],
				size: 48,
				favorite: false,
				
			}
		},

		props: {
			seller: {
				type: Object,
				default() {
					return {}
				}
			}
		},
		watch: {
			'seller' () {
				this._initPicScroll();
			}
		},
		computed: {
			favoriteText () {
				return this.favorite ? '收藏' : '未收藏'
			}
		},
		mounted () {
			this.$nextTick(() => {
				this.scroll = new BScroll(this.$refs.seller,{
	                click: true
				})
				this._initPicScroll();
			})
            
		},
		methods: {
			_initPicScroll () {
				if(this.seller.pics) {
					let picWid = 120,
					margin = 6,
					listWid = (picWid + margin) * (this.seller.pics.length) - 6;
					this.$refs.picList.style.width = listWid + 'px';
					this.$nextTick(() => {
						this.picScroll = new BScroll(this.$refs.picsWrapper, {
							scrollX: true,
							eventPassthrough: 'vertical'
						})
					})
				}
			}
		}
	}
</script>

<style lang="stylus" rel="stylesheet" scoped>
	.seller
		position: absolute
		top: 174px;
		bottom: 0
		right: 0
		left: 0
		overflow: hidden
		width: 100%
		.seller-wrapper
			width: 100%
			box-sizing: border-box
			padding: 0 18px
			.overview
				width: 100%
				box-sizing: border-box
				padding: 18px 0
				border-bottom: 1px solid rgba(7,17,27,0.1)
				.title
					font-size: 14px
					color: rgb(7,17,27)
					line-height: 14px
				.star
					margin-top: 8px
					display: inline-block
					vertical-align: -3px
					.text
						display: inline-block
						font-size: 10px
						color: rgb(77,85,93)
						line-height: 18px
						margin-left: 8px
				.remark
					display: flex
					padding-top: 18px
					.block
						flex: 1
						text-align: center
						border-right: 1px solid rgba(7,17,27,0.1)
						&:last-child
							border: 0
						.main
							font-size: 10px
							color: rgb(147,153,159)
							line-height: 10px
						.coutent
							margin-top: 4px
							font-szie: 10px
							.stress
								font-size: 24px
								font-weight: 200
								color: rgb(7,17,27)
								line-height: 24px
				.favorite
					position: absolute
					top: 18px
					right: 11px
					width: 50px
					text-align: center
					.icon-favorite
						display: block
						font-size: 24px
						line-height: 24px
						color: #d4d6d9
						margin-bottom: 4px
						&.active
							color: rgb(240,20,20)
					.text
						font-size: 10px
						color: rgb(77,85,93)
						line-height: 10px
			.content-wrapper
				padding-top: 18px
				.bulletin
					margin-top: 8px
					padding: 0 12px
					font-size: 12px
					line-height: 24px
					color: rgb(240,20,20)
					border-bottom: 1px solid rgba(7,17,27,0.1)

				.support
					padding: 16px 12px
					border-bottom: 1px solid rgba(7,17,27,0.1)
					&:last-child
						border: 0
					.text
						line-height: 16px
						font-weight: 200
						font-size: 12px
						color: rgb(7,17,27)
						vertical-align: top
				.pics
					width: 100%
					padding: 18px 0
					.title
						margin-bottom: 12px
					.pics-wrapper
						width: 100%
						overflow: hidden
						white-space: nowrap
						.pic-list
							.pic-item
								width: 120px
								height: 90px
								display: inline-block;
								margin-right: 6px
				.info
					width: 100%
					padding-top: 18px
					.title
						width: 100%
						padding-bottom: 12px
						border-bottom: 1px solid rgba(7,17,27,0.1)
					.info-item
						width: 100%
						box-sizing: border-box
						padding: 18px 12px
						font-size: 12px
						line-height: 16px
						font-weight: 200
						color: rgb(7,17,27)
						border-bottom: 1px solid rgba(7,17,27,0.1)
						&:last-child
							border: 0;





		
</style>