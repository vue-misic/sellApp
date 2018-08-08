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

				使用express框架创建一个web应用,创建一个 Express 应用。express() 是一个由 express 模块导出的入口（top-level）函数
				var express = require('express');
				var app = express();//创建express服务实例

				//=> 如果不用路由直接使用app.get('/api/goods') == app.get('/api/sellers')

				app.get() => 服务请求方式
				app.post()

				app.listen(3000,() => {
					console.log('服务启动')
				}) => 启动一个服务并监听从 3000 端口进入的所有连接请求。他将对所有 (/) URL 或 路由 返回 “这是一个 Express 应用” 字符串
				
				Express 的主要内容有两个：
						
					路由 => (比app.get提取公共api,写法较为见简便)
						var express=require('express');
						var router=express.Router();
						app.use('/api', routers) => 提取了所有接口共有的'api'
						并且路由和get/post方法一起写了

						app.use('/api', routers)
						路由（Routing）是由一个 URI（或者叫路径）和一个特定的 HTTP 方法（GET、POST 等）组成的，涉及到应用如何响应客户端对某个网站节点的访问。
						const express = require('express');
						let router = express.Router();

						router.get('/', (req, res, nest) => {
							res.render('orders',{msg:'订单首页'})
						})

						router.get('/list',(req,res,next) => {
		    				res.send('订单列表')
						})
						module.exports = router

						每一个路由都可以有一个或者多个处理器函数，当匹配到路由时，这个或者这些函数将被执行。

					中间件


				
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
						2.另外一个border-1px是一个class
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

					重点中的重点(父元素display： flex 而且有高度,子元素为 flex: 0 0 80px  子元素不设置高度的话会自动默认为继承父元素的高度！！！！！！！！！！)

					父元素的属性(容器) => 
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
					fade-enter,fade-leave-active => opcity : 0 从无到有的意思 
					过渡的元素设置动画效果 transtion: all 0.5s

				backdrop-filter: blur(10px) => 适用于ios的背景模糊效果


		第七章： 

			(在position:absolute下，同时设定left和right或者同时设定top和bottom的话。宽度和高会被拉伸到指定位置,这就是相对body时div宽度或者高度缺省时position:absolute or fixed 情况下，浏览器对容器的尺寸解析方式。)

			上下定高,中间自适应可以滑动
				foods的视口需要先定义好 => 整个适口就那么大(又要求可以滚动，不影响下面的购物车组件)
				使用position： absolute; top,bottom将试口占据好固定好大小
				(如果只知道header,bottom的高度，不知道content/中间高度，又不能让他是自适应只能通过position,top,bottom来控制它)
			自己封装了icon通用组件
				需要传递 size和type值

			父元素 display: table ， 子元素为display： table-cell , vertical-align: middle 这样就达到垂直居中的效果了(table-cell可以等分子盒子)

			better-scroll => 插件
				实例化以后需要接收一个DOM（高度固定的视口）,第一个参数就是我们 wrapper 的 DOM 对象，第二个是一些配置参数，
				better-scroll 的初始化时机很重要，因为它在初始化的时候，会计算父元素和子元素的高度和宽度，来决定是否可以纵向和横向滚动
				因为bscroll的原理是给new window.BScroll传入的DOM对象的第一级子级加上transition动画等
				拿到ul的高度与外层的wrapper做对比，如果超过外层的高度就会触发Bscroll(所以要两层，1.父级, 2.子集)

				food-list-hook => -hook一般用于被js选择的class

				better-scroll => 类似vue实例，实例化了才可以用他的方法,需要一些配置项才可以使用他的功能 如 new vue({router})才能使用this.$router.push()方法
				它同理, 配置了probeType： 3 => 向外派发了一个实时坐标, 然后使用this.foodWrapper.on('scroll',(pos) => {
					回调函数来接受坐标 scrollY = pos.y;
				})


			props => 传递数据如果时Object,Array 需要用函数返回 => default () {
				return []// return {}
			}
			
			forEach(callBack) 方法用于调用数组的每个元素，并将元素传递给回调函数。
			***  数组每个元素都执行一次回调函数。
			array.forEach(function(currentValue, index, arr), thisValue)
			Array.forEach(function(每一项元素,index(索引),Array))
			
			filter(callBack) 方法创建一个新的数组，新数组中的元素是通过检查指定数组中符合条件的所有元素。
			*** 检测数值元素，并返回符合条件所有元素的数组。
			array.filter(function(currentValue,index,arr), thisValue)
			Array.filter((item) => {
				过滤条件
			})


			transition => 过渡动画transition组件
				<transition>
					包裹切换的元素或者组件(包含v-if/v-show)
				</transition>
				过渡分为两个阶段
						enter 										leave
															v-leave			v-leave-to			1(start)			0(end)				|					|
					0(start)		1(end)						_____________________	
				v-enter			v-enter-to
					|				|									|
					_________________
							|									过程(v-leave-active)
						过程(v-enter-active)
					
					v-enter-active,v-leave-active => 定义transition 的过渡 transition: all ,0.5
					v-enter,v-leave-active => 定义结束后的状态(如果这里直接是v-leave就直接刚开始结束了)

					理解为只是一个动态的添加一个class的过程，让某个属性值从0到1的状态，通过动态的加class来达到效果

				在进入/离开的过渡中，会有 6 个 class 切换。

			    v-enter：定义进入过渡的开始状态。在元素被插入之前生效，在元素被插入之后的下一帧移除。

			    v-enter-active：定义进入过渡生效时的状态。在整个进入过渡的阶段中应用，在元素被插入之前生效，在过渡/动画完成之后移除。这个类可以被用来定义进入过渡的过程时间，延迟和曲线函数。

			    v-enter-to: 2.1.8版及以上 定义进入过渡的结束状态。在元素被插入之后下一帧生效 (与此同时 v-enter 被移除)，在过渡/动画完成之后移除。

			    v-leave: 定义离开过渡的开始状态。在离开过渡被触发时立刻生效，下一帧被移除。

			    v-leave-active：定义离开过渡生效时的状态。在整个离开过渡的阶段中应用，在离开过渡被触发时立刻生效，在过渡/动画完成之后移除。这个类可以被用来定义离开过渡的过程时间，延迟和曲线函数。

			    v-leave-to: 2.1.8版及以上 定义离开过渡的结束状态。在离开过渡被触发之后下一帧生效 (与此同时 v-leave 被删除)，在过渡/动画完成之后移除。


			    ref 被用来给元素或子组件注册引用信息。引用信息将会注册在父组件的 $refs 对象上。如果在普通的 DOM 元素上使用，引用指向的就是 DOM 元素；如果用在子组件上，引用就指向组件实例：
			    所以可以直接访问到子组件的实例方法 this.$refs.contentWrapper.close();
			    <child-component ref="child"></child-component>

				
			第八章： => 等宽等高布局(width: 100% height: 0 padding-top: 100%) =>padding根据宽的宽度自动计算高度
				
			




	*/
</script>