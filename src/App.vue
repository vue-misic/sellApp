<template>
  <div id="app">
      <v-header></v-header>
      <div class="tab">
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
export default {
  name: 'App',
  components: {
    vHeader
  },
  created () {
    this.getSeller()
  },
  methods: {
    getSeller () {
      this.$http.get('/api/seller')
      .then((res) => {
        console.log(res)
      })
    }
  }
}
</script>

<style lang="stylus">
#app 
  width: 100%
  .tab
    width: 100%
    display: flex
    font-size: 14px
    .tab-item
      flex: 1
      height: 40px
      line-height: 40px
      text-align: center
      color: rgb(77,85,93)
      &.active
          color: rgb(240,20,20)
</style>
