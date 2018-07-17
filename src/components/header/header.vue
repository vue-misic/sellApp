<template>
	<div class="heade">
		 <div class="content-wrapper">
            <div class="avatar">
                <img :src="seller.avatar" width="64" alt="">
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
                    <span class="icon"></span>
                    <span class="text">{{ seller.supports[0].description }}</span>
                </div>
            </div>     
         </div>
         <div class="buletin-wrapper"></div>
	</div>
</template>

<script>
	export default {
        name: 'heade',
        data () {
            return {

            }
        },
        props: {
            seller: [String, Object]
        }
    }
</script>

<style lang="stylus">
.heade
    color: #fff
    background-color #000
    .content-wrapper
        padding: 24px 12px 18px 24px
    .avatar
        display: inline-block
    .content
        display: inline-block
</style>