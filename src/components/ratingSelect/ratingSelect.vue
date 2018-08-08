<template>
    <div class="rating-select">
        <div class="rating-type">
            <span class="block positive" :class="{active:selectType===2}" @click="select(2, $event)">
                {{ desc.all }}<span class="count">{{ ratings.length }}</span></span>
            <span class="block positive"  :class="{active:selectType===0}" @click="select(0, $event)">
                {{ desc.positive }}<span class="count">{{ positive.length }}</span></span>
            <span class="block negative"  :class="{active:selectType===1}" @click="select(1, $event)">
                {{ desc.negative }}<span class="count">{{ negative.length}}</span></span>
        </div>            
        <div class="rating-switch" :class="{on: onlyContent}">
            <span class="icon-check_circle" @click="toggleChange"></span>
            <span class="text">只看有内容的评价</span>
        </div>
    </div>
</template>

<script>
    const POSITIVE = 0,
          NEGATIVE = 1,
          ALL      = 2;
    
export default {
    name: 'rating-select',
    props: {
        ratings: {
            type: Array,
            default() {
                return [];
            }
        },
        selectType: {
            type: Number,
            default: ALL
        },
        onlyContent: {
            type: Boolean,
            default: false
        },
        desc: {
            type: Object,
            default() {
                return {
                    positive: '满意',
                    negative: '不满意',
                    all: '全部'
                }
            }
        }
    },
    computed: {
        positive () {
            return this.ratings.filter((item) => {
                return item.rateType == POSITIVE;
            })
        },
        negative () {
            return this.ratings.filter((item) => {
                return item.rateType == NEGATIVE;
            })
        }
    },
    methods: {
        select (type,event) {
            // this.selectType = type;
            // console.log(event);
            this.$emit('select-change', type);
        },
        toggleChange () {
            this.$emit('toggle-change');
        }
    }
}
</script>

<style lang="stylus" scoped>
    @import '../../common/stylus/mixin.styl'
    .rating-select
        .rating-type
            padding: 18px 0
            margin: 0 18px
            border-1px(rgba(7,17,27,0.1))
            font-size: 0
            .block
                display: inline-block
                padding: 8px 12px
                margin-right: 8px
                border-radius: 2px
                background-color: rgba(0, 160, 220, 0.2)
                font-size: 12px
                line-height: 16px
                color: rgb(77, 85, 93)
                &.active
                    background-color: rgb(0, 160, 220)
                    color: #fff
                &.negative
                    background-color: rgba(77, 85, 93, 0.2)
                    &.active
                        background-color: rgb(77, 85, 93)
                .count
                    font-size: 8px
                    margin-left: 2px
        .rating-switch
            width: 100%
            box-sizing: border-box
            padding: 12px 18px
            border-bottom: 1px solid rgba(7, 17, 27, 0.1)
            color: rgb(147, 153, 159)
            &.on
                .icon-check_circle
                    color: #008c15
            .icon-check_circle
                display: inline-block
                vertical-align: top
                font-size: 24px
                line-height 24px
            .text
                display: inline-block
                font-size: 12px
                line-height 24px



</style>


