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
					keep-live
						router-view
	*/
</script>