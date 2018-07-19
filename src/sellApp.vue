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
		main.js => 入口js文件 el选项为注入到index的出口文件,vue的实例对象 index为顶级，所有配置文件最终都归为index的后代, 公用一个vue实例
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

						main.js引入的vue,js,style都会成为是全局的 => 引入的css 不需要变量来接收，因为不需要挂载 import '../style/..styl'

						记住引入某个文件，在css中用css的语法 @import 在js中引入用的是import

		第六章：header头部
				1.如果某个组件的数组数据是依靠父组件传递出来的,DOM里用到需要加 v-if这个数组数据的判断，存在才可以渲染
				2.stylus的函数，必须用@import引入使用
				3.非函数可以引入，然后加class就可以了

			注意： 计算属性返回的是一个值不是某个函数 isMap是一个值，不能再DOM用 isMap() 只能用isMap
					所以不能用到传参，直接处理data里的数据
				
				vertical-align的使用 => 只有display: inline-block生效  前面是图片后面是文字 height与line-height 一致，设置vertical-align: top 就可以保持对齐
				如果都是文本 设置vertical-align: 2px 设置具体数值来达到效果

				设置整个头部背景模糊的效果
					设置一个标签(包裹img)设置绝对定位,position:absolute; z-index: -1; filter: blur(10px) width: 100% height: 100%

				设置position: fixed;无论标签结构在哪里 width: 100% height:100%都是相对body的

				css sticky fotter => 如果页面内容不够长的时候，页脚块粘贴在视窗底部；如果内容足够长时，页脚块会被内容向下推送。
				.detail-wraper 设置min-height： 100%  padding-bottom： $height (为了不会被文字覆盖掉X按钮)
				=> 加clearfix 清除浮动，我也不知道为什么，不加话会出现纵向滚动条
				.fotter 设置margin-top: -$height
				
				
				评星 => 1.不同的页面用到的星大小不一样(t通过传size里决定)
						2.有全星有半星或者没有星,添加不同的class类，来显示不同的背景，记住补齐五个星，在计算属性里返回

				flex => flex 布局

					父元素的属性(项目) => 
						首先 display: flex必须要有
						flex-direction：属性决定主轴的方向（即项目的排列方向）
							flex-direction: row | row-reverse | column | column-reverse;
						flex-wrap： 项目都排在一条线（又称"轴线"）上。flex-wrap属性定义，如果一条轴线排不下，如何换行
							flex-wrap: nowrap | wrap | wrap-reverse;
							nowrap（默认）：不换行。wrap：换行，第一行在上方。wrap-reverse：换行，第一行在下方。
						flex-flow： 属性是flex-direction属性和flex-wrap属性的简写形式，默认值为row nowrap。
						justify-content：属性定义了项目在主轴上的对齐方式。
							justify-content: flex-start | flex-end | center | space-between | space-around;
					     	flex-start（默认值）：左对齐
					        flex-end：右对齐
					        center： 居中
					        space-between：两端对齐，项目之间的间隔都相等。
					        space-around：每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍。
					    align-items：属性定义项目在交叉轴上如何对齐。
					    	 align-items: flex-start | flex-end | center | baseline | stretch;
						        flex-start：交叉轴的起点对齐。
						        flex-end：交叉轴的终点对齐。
						        center：交叉轴的中点对齐。
						        baseline: 项目的第一行文字的基线对齐。
						        stretch（默认值）：如果项目未设置高度或设为auto，将占满整个容器的高度。

					子元素的属性(项目) =>
						order: 0,1,2 => 数值越小，排列越靠前，默认为0
						flex-grow: 0,1 => 自适应剩余空间
						flex-shrink： 1，=> 属性定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小
						flex-basis: 350px 属性定义了在分配多余空间之前，项目占据的主轴空间（main size）

						flex 是上面三个的集合 => 0 1 auto   快捷间[auto(1,1,auto),none(0,0,auto)]

				transition:过度
					标签加 transition="fade" 加transition的class
					css加 fade-transition => 最后要的那个状态  opcity: 1 (主要用来过渡使用) background: rgba(7,17,27,0.8)
					fade-enter,fade-leave => opcity : 0 从无到有的意思 
					过渡的元素设置动画效果 transtion: all 0.5s

				backdrop-filter: blur(10px) => 适用于ios的背景模糊效果


		第七章： 
			上下定高,中间自适应可以滑动
				foods的视口需要先定义好 => 整个适口就那么大(又要求可以滚动，不影响下面的购物车组件)
				使用position： absolute; top,bottom将试口占据好固定好大小
				(如果只知道header,bottom的高度，不知道content/中间高度，又不能让他是自适应只能通过position,top,bottom来控制它)
			自己封装了icon通用组件
				需要传递 size和type值

			父元素 display: table ， 子元素为display： table-cell , vertical-align: middle 这样就达到垂直居中的效果了(table-cell可以等分子盒子)


	*/
</script>