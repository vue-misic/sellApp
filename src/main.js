// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import vueResource from 'vue-resource'

import 'common/stylus/index.styl'

Vue.use(vueResource)

Vue.config.productionTip = false

/* eslint-disable no-new  => 实例化对象不需要一个变量去接收*/
new Vue({
  	el: '#sellapp',
  	router,
  	components: { App },
  // template: '<App/>'//这个相当于是<App></App>组件放到了入口的index的DOM中,
  //用了template语法,可以换成语法糖(直接放在) index里
  //记住组件使用的三点 1.引入 2.注册components 3.挂载(也就是放到父组件中,可以使用DOM形式,也可以是父组件的template选项里)
  //或者是 render: h => h(App)语法糖 直接将 components和挂载放在一个函数里
})
