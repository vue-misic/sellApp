<template>
    <div class="class-map">
        <span class="icon" :class="isMap"></span>
    </div>
</template>

<script>
    export default {
       name: 'class-map',
       map: ['decrease', 'discount', 'guarantee', 'invoice', 'special'],
       props: {
        classtype: [Number]
       },
       computed: {
        isMap () {
            return this.map[classtype]
        }
       }
    };
</script>

<style lang="stylus">
    @import '../../common/stylus/mixin.styl'
    .class-map 
        display: inline-block
        .icon
            display: inline-block
            width: 22px
            height: 22px
            vertical-align: top
            margin: 0 6px 0 12px
            bgackground-size: 22px 22px
            background-repeat: no-repeat
            background-position: center
         /*   &.decrease
                bg-image('decrease_1')
            &.discount
                bg-image('discount_1')
            &.guarantee
                bg-image('guarantee_1')
            &.invoice
                bg-image('invoice_1')
            &.special
                bg-image('special_1')*/
    
</style>