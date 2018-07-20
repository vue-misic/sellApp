<template>
  <div id="app">
      <v-header :seller="seller"></v-header>
      <div class="tab border-1px">
        <router-link tag="div" class="tab-item" :to="{path: '/goods'}" active-class="active">商品</router-link>
        <router-link tag="div" class="tab-item" :to="{path: '/ratings'}" active-class="active">评价</router-link>
        <router-link tag="div" class="tab-item" :to="{path: '/seller'}" active-class="active">商家</router-link>
      </div>
      <div class="content">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </div>
  </div>
</template>

<script>
  import vHeader from 'components/header/header'
  const ERR_OK = 0;
export default {
  name: 'App',
  data () {
    return {
        seller: {}
    };
  },
  components: {
    vHeader
  },
  created () {
    this.getSeller();
  },
  methods: {
    getSeller () {
      this.$http.get('/api/seller')
      .then((res) => {
        if(res.body.errno === ERR_OK) {
          this.seller = res.body.data;
          // console.log(this.seller)
        }
      })
    }
  }
}
</script>

<style lang="stylus">
@import './common/stylus/mixin.styl'
#app 
  width: 100%
  .tab
    width: 100%
    display: flex
    font-size: 14px
    border-1px(rgba(7,17,27,0.1))
    .tab-item
      flex: 1
      height: 40px
      line-height: 40px
      text-align: center
      color: rgb(77,85,93)
      &.active
          color: rgb(240,20,20)
</style>
