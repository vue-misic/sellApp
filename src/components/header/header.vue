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
         <div class="detail" v-show="detailShow">
             <!-- <div class="detail-wrapper clearfix">
             </div> -->
             <div class="detail-wrapper clearfix">
                 <div class="detail-main">
                     <div class="name">{{ seller.name }}</div>
                     <div class="star-wrapper">
                        <v-star :size="size" :score="score"></v-star> 
                     </div> 
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
	export default {
        name: 'heade',
        data () {
            return {
                map: ['decrease', 'discount', 'guarantee', 'invoice', 'special'],
                detailShow: true,
                size: 48,
                score: 4.5
            }
        },
        props: {
            seller: [String, Object]
        },
        components: {
            vStar
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
        background-color: rgba(7,17,27,0.8)
        z-index: 100
        overflow: auto
    .detail-wrapper
        width: 100%
        display: inline-block
        min-height: 100%
        .detail-main
            width: 100%
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