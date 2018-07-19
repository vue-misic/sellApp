<template>
	<div class="heade">
		 <div class="content-wrapper">
            <div class="avatar">
                <img :src="seller.avatar" width="64" alt="" class="img1">
            </div>
            <div class="content">
                <div class="title">
                    <span class="brand"></span>
                    <span class="name">{{ seller.name }}</span>
                </div>
                <div class="description">
                    {{ seller.description }}/{{ seller.deliveryTime }}分钟送达
                </div>
                <div class="support" v-if="seller.supports">
                    <span class="icon" :class="isMap(seller.supports[0].type)"></span>
                    <span class="text">{{ seller.supports[0].description }}</span>
                </div>
            </div>
            <div class="support-count" v-if="seller.supports" @click="showDetail">
                <span class="count">{{ seller.supports.length }}个</span>
                <i class="icon-keyboard_arrow_right"></i>
            </div>     
         </div>
         <div class="bulletin-wrapper" @click="showDetail">
             <span class="bulletin-title"></span>
             <span class="bulletin-text">{{ seller.bulletin }}</span>
             <i class="icon-keyboard_arrow_right"></i>
         </div>
         <div class="background">
             <img :src="seller.avatar" width="100%" height="100%" alt="" class="">
         </div>
         <div class="detail" v-show="detailShow" transition="fade">
             <!-- <div class="detail-wrapper clearfix">
             </div> -->
             <div class="detail-wrapper clearfix">
                 <div class="detail-main">
                     <div class="name">{{ seller.name }}</div>
                     <div class="star-wrapper">
                        <v-star :size="size" :score="seller.score"></v-star> 
                     </div>
                     <div class="title">
                         <div class="line"></div>
                         <div class="text">优惠信息</div>
                         <div class="line"></div>  
                     </div>
                     <ul class="supports" v-if="seller.supports">
                         <li v-for="support in seller.supports" :key="support.type" class="support-list">
                             <span class="icon" :class="map[support.type]"></span>
                             <!-- <map-class :classtype="support.type"></map-class> -->
                             <span class="text">{{ support.description }}</span>
                         </li>
                     </ul>

                     <div class="title">
                         <div class="line"></div>
                         <div class="text">商家公告</div>
                         <div class="line"></div>  
                     </div>
                     <p class="bulltin-text">
                         {{ seller.bulletin }}
                     </p> 
                 </div>
             </div>
             <div class="fotter" @click="closeDetail">
                 <i class="icon-close"></i>
             </div>
         </div>
	</div>
</template>

<script>
    import vStar from 'components/star/star' 
    import mapClass from 'components/map/mapClass' 
	export default {
        name: 'heade',
        data () {
            return {
                map: ['decrease', 'discount', 'guarantee', 'invoice', 'special'],
                detailShow: false,
                size: 48,
            }
        },
        props: {
            seller: [String, Object]
        },
        components: {
            vStar,
            mapClass
        },
        computed: {
            //计算属性返回的是一个值不是某个函数 isMap是一个值，不能再DOM用 isMap() 只能用isMap
            //所以不能用到传参，直接处理data数据
            // isMap () {
            //     return this.map[index]
            // }
        },
        created () {
            this.isMap()
        },
        methods: {
            isMap (index) {
                console.log(this.map[index]);
                return this.map[index];
            },
            showDetail () {
                this.detailShow = true;
            },
            closeDetail () {
                this.detailShow = false
            }
        }
    }
</script>

<style lang="stylus">
    @import '../../common/stylus/mixin.styl'
.heade
    position: relative
    color: #fff
    overflow: hidden
    background-color: rgba(7,17,27,0.5)
    .content-wrapper
        padding: 24px 12px 18px 24px
        font-size: 0
        position: relative
        .avatar
            display: inline-block
            vertical-align: top
            img1
                border-radius: 2px
        .content
            display: inline-block
            margin-left: 16px
            font-size: 14px
            .title
                margin-bottom: 8px
                .brand
                    display: inline-block
                    vertical-align: top
                    width: 30px
                    height: 18px
                    bg-image('brand')
                    background-size: 30px 18px
                    background-repeat: no-repeat
                    background-position: center
                .name
                    margin-left: 6px
                    font-size: 16px
                    line-height: 18px
                    font-weight: blod
            .description
                font-size: 12px
                color: rgb(255,255,255)
                line-height: 12px
                margin-top: 8px
                margin-bottom: 10px
            .support
                .icon
                    display: inline-block
                    width: 12px
                    height: 12px
                    margin-right: 4px
                    background-size: 12px 12px
                    background-repeat: no-repeat
                    &.decrease
                        bg-image('decrease_1')
                    &.discount
                        bg-image('discount_1')
                .text
                    vertical-align: top
                    line-height: 12px
                    font-size: 10px
        .support-count
            padding: 0px 8px
            position: absolute
            right: 12px
            bottom: 14px
            height: 24px
            line-height: 24px
            border-radius: 14px
            color: rgb(255,255,255)
            font-weight: 200
            background-color: rgba(0,0,0,0.2);
            .count
                font-size: 10px
                vertical-align: 2px
            .icon-keyboard_arrow_right
                margin-left: 2px
                font-size: 10px
                line-height: 24px
    .bulletin-wrapper
        position: relative
        width: 100%
        box-sizing: border-box
        width: 100%
        padding: 0 12px
        height: 28px
        line-height: 28px
        white-space: nowrap
        overflow: hidden
        text-overflow: ellipsis
        background-color: rgba(7,17,27,0.2);
        .bulletin-title
            display: inline-block
            width: 22px
            height: 12px
            background-size: 22px 12px
            background-repeat: no-repeat
            bg-image('bulletin')
            vertical-align: -2px
        .bulletin-text
            margin-left: 4pxx   
            line-height: 12px
            color: #fff
            font-size: 10px
        .icon-keyboard_arrow_right
            position: absolute
            font-size: 10px
            top: 10px
            right: 12px    
    .background
        position: absolute
        top: 0
        left: 0
        z-index: -1
        width: 100%
        height: 100%
        filter: blur(10px)
    .detail
        position: fixed
        top: 0
        left: 0
        right: 0
        bottom: 0
        width: 100%
        height: 100%
        transition: all 2s
        background-color: rgba(7,17,27,0.8)
        z-index: 100
        overflow: auto
        backdrop-filter: blur(10px)/* 适用与ios*/
        &.fade-transtion
            opacity: 1
            background-color: rgba(7,17,27,0.8)
        &.fade-enter,&.fade-leave
            opacity: 0
            background-color: rgba(7,17,27,0)
    .detail-wrapper
        width: 100%
        display: inline-block
        min-height: 100%
        .detail-main
            width: 100%
            box-sizing: border-box
            padding: 0 36px
            margin-top: 64px
            padding-bottom: 64px
            .name
                font-size: 16px
                line-height: 16px
                font-weight: 700
                text-align: center
                width: 100%
            .star-wrapper
                margin: 16px 0 28px 0
                text-align: center
            .title
                display: flex
                .line
                    flex: 1
                    border-bottom: 1px solid rgba(255,255,255,0.2)
                    position: relative
                    top: -8px
                    left: 0px
                .text
                    margin: 0 12px
                    font-weight: 700
            .supports
                margin-top: 24px
                margin-bottom: 28px
                .support-list
                    margin-bottom: 12px
                    &:last-child
                        margin-bottom: 0
                    .icon
                        display: inline-block
                        width: 22px
                        height: 22px
                        vertical-align: top
                        margin: 0 6px 0 12px
                        bgackground-size: 22px 22px
                        background-repeat: no-repeat
                        background-position: center
                        &.decrease
                            bg-image('decrease_1')
                        &.discount
                            bg-image('discount_1')
                        &.guarantee
                            bg-image('guarantee_1')
                        &.invoice
                            bg-image('invoice_1')
                        &.special
                            bg-image('special_1')
                    .text
                        display: inline-block
                        line-height: 22px;
                        font-size: 12px
            .bulltin-text
                margin-top: 24px
                width: 100%
                padding: 0 12px
                box-sizing: border-box
                font-size: 12px
                line-height: 24px
        /*box-sizing: border-box
        padding-bottom: 64px*/
    .fotter
        /*position: relative*/
        position: relative
        width: 32px
        height: 32px
        font-size: 32px
        clear: both
        margin: -64px auto 0 auto
</style>