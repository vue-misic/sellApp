<template>
    <div class="class-map" :class="sizeType">
        <span class="icon" :class="classType"></span>
    </div>
</template>

<script>
    export default {
       name: 'class-map',
       map: ['decrease', 'discount', 'guarantee', 'invoice', 'special'],
       props: {
           'classType': String,
           'size': Number
       },
       computed: {
            sizeType () {
                return 'size' + this.size 
            }
       },
       created () {
        // console.log(this.classType)
       }
    };
</script>

<style lang="stylus">
    @import '../../common/stylus/mixin.styl'
    .class-map 
        display: inline-block
        &.size1
            .icon
                display: inline-block
                width: 22px
                height: 22px
                vertical-align: top
                margin: 0 6px 0 12px
                background-size: 22px 22px
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
        &.size2
            .icon
                display: inline-block
                width: 16px
                height: 16px
                vertical-align: top
                background-size: 16px 16px
                background-repeat: no-repeat
                background-position: center
                &.decrease
                    bg-image('decrease_2')
                &.discount
                    bg-image('discount_2')
                &.guarantee
                    bg-image('guarantee_2')
                &.invoice
                    bg-image('invoice_2')
                &.special
                    bg-image('special_2')
        &.size3
            .icon
                display: inline-block
                width: 12px
                height: 12px
                vertical-align: top
                background-size: 12px 12px
                background-repeat: no-repeat
                background-position: center
                &.decrease
                    bg-image('decrease_3')
                &.discount
                    bg-image('discount_3')
                &.guarantee
                    bg-image('guarantee_3')
                &.invoice
                    bg-image('invoice_3')
                &.special
                    bg-image('special_3')
            
    
</style>