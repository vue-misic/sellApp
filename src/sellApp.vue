<template>
	<div class="base">
		
	</div>
</template>

<script>
	/**
		* vue核心是数据驱动和组件化 借鉴了Ag的指令和react的组件化

		* build和config目录是webpack配置目录
		* node_modules目录是项目依赖,需要的依赖直接在.vue单文件组件中引入
		  for example  import a from 'better-scroll'
		* src是存放代码
		* static存放第三方静态资源的文件
		.babelrc => es5编译(es6转化为es5)
		.editorconfig => 编辑器配置
		.gitignore => git忽略的目录
		index.html => 入口html文件 main.js挂载的el就是index里的div(app是index的根组件)
		package.json => 已安装的依赖名称 scripts里配置脚本 如 npm run dev
		main.js => 入口js文件 el选项为注入到index的出口文件,vue的实例对象 index为顶级，所有文件最终都归为index的后代
			所以vue的api各个组件可以直接访问这个根实例对象 for example this.$emit/this.$ref

			自己的理解mian.js
				/ template: '<App/>'//这个相当于是<App></App>组件放到了入口的index的DOM中,
  				//用了template语法,可以换成语法糖(直接放在) index里
  				//记住组件使用的三点 1.引入 2.注册components 3.挂载(也就是放到父组件中,可以使用DOM形式,也可以是父组件的template选项里)

  				//或者是 render: h => h(App)语法糖 直接将 components和挂载放在一个函数里

		exoprt dafault 后面加的是要导出的对象 for example  export default {}
		那么要引入这个对象的话就是找到这个export的文件夹,然后 import B from '../app' 用B去接受引用这个对象


		webpack编译的剖析
			在pack.json里scripts脚本分析 npm run dev => dev映射的值是 webpack-dev-server
			实质运行的是 build目录下的 webpack.dev.conf.js文件
		webpack打包的编译



		组件的的原则是就近维护原则(可能这个组件需要用到一些image或者其他)方便代码维护

		第四章： mock数据配置
			express启动服务监听获取数据

				创建一个 Express 应用。express() 是一个由 express 模块导出的入口（top-level）函数
				var express = require('express');
				var app = express();
				
				//实例对象的请求服务 => 
				必须配置在devServer中才能生效 .get('/api/')也可以用路由配置
				app.get('/api/seller', function(req, res){
				  res.send('hello world');//这个是express应用返回的数据
				});
				app.listen(3000);//用于查看是否正确

		第五章：组件拆分
				1.安装使用stylus-loader前必须安装stylus
				npm install stylus --save
				npm install stylus-loader --save

				router-link 点击改变，映射的router-view进行刷新可以用 keep-live进行缓存
					keep-alive
						router-view

				2.1px像素问题 物理像素是设备像素的2倍(iphone6 => 1px => 2px)
					解决方法：伪类(定位到底部) + 缩放(用一个class去缩放这个伪类的Y轴)
						需要添加的div后面设置伪类:after定义这条线然后进行缩放看着像1px => 伪类content不要漏写
						1.mixin中定义一个函数 border-1px($color) => 公用的属性样式集合(函数属性集合)，谁引用谁就有定义的属性
							stylus引入函数需要@import + 路径 语法
						2.进行伪类缩放 属性 定义需要缩放的标签添加某个属性就可以了
							c3的媒体查询属性     @media 媒体类型and （媒体特性）{你的样式}

							@media screen and (min-width:1200px){} 

 							@media screen and (min-width: 960px) and (max-width: 1199px) {  }

						3.定义一个index的stylus 放在mian.js里全局去引入，就可以全局通用了

						main.js引入的vue,js,style都会成为是全局的 => 引入的css 不需要变量来接收，因为不需要挂载 import '../style/..style'

						记住引入某个文件，在css中用css的语法 @import 在js中引入用的是import

		第六章：header头部
				1.如果某个组件的数组数据是依靠父组件传递出来的,DOM里用到需要加 v-if这个数组数据的判断，存在才可以渲染

	*/
</script>