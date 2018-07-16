'use strict'//es5的严格模式  
//express是node.js的框架
/*
  假设Y是路径，X是文件名或目录名，当 Nodejs 遇到 require(Y+X) 时，按照下面的顺序处理：
　　1、如果 X 是核心模块（例如：require("http")）
　　a.返回该模块
　　b.不再继续执行
　　2、如果Y是以“./”、“/”或“../”开头
　　a.把X当成文件，从指定路径开始，依次查找下面文件：X、X.js、X.json、X.node，只要其中一个存在，就返回该文件，
    不再继续执行
　　b.把X当成目录，从指定路径开始，依次查找下面文件：X/package.json(main字段)、
      X/index.js、X/index.json、X/index.node，只要其中一个存在，就返回该文件，不再继续执行
　　3.如果 X 不是核心模块，也没有以“./”、“/”或“../”开头，则Nodejs会从当前模块的父目录开始，
      尝试从它的 /node_module 目录里加载模块，如果还是没有找到，则移动到再上一层父目录，直到文件系统的根目录
　　4.抛出“not found”
*/
const utils = require('./utils')//工具方法
const webpack = require('webpack')
const config = require('../config')//配置文件
const merge = require('webpack-merge')//合并配置文件用的
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')//webpack配置文件
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')//webpack操作html的插件
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')

var proxyMiddleware = require('http-proxy-middleware')

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

//mock数据配置
// const express = require('express');
// var apiServer = express();
// var bodyParser = require('body-parser')//返回json数据
// apiServer.use(bodyParser.urlencoded({ extended: true }))
// apiServer.use(bodyParser.json())
// var apiRouter = express.Router()
// var fs = require('fs')
// apiRouter.route('/:apiName')
// .all(function (req, res) {
//   fs.readFile('./data.json', 'utf8', function (err, data) {
//     if (err) throw err
//     var data = JSON.parse(data)
//     if (data[req.params.apiName]) {
//       res.json(data[req.params.apiName])//获取端口路径 api name 
//     }
//     else {
//       res.send('no such api name')
//     }
    
//   })
// })

// apiServer.use('/api', apiRouter);//设置api根目录
// apiServer.listen('8081', function (err) {
//   if (err) {
//     console.log(err)
//     return
//   }
//   console.log('Listening at http://localhost:' + ('8081') + '\n')
// })



//另一种配置 实例一个请求对象
const express = require('express')
var app = express()
//定义请求的数据
const appData = require('../data.json')
const seller = appData.seller
const goods = appData.goods
const ratings = appData.ratings

//定义请求的路径
const apiRouter = express.Router()

apiRouter.get('/seller', function (req, res) {
  res.json({
    errno: 0,
    data: seller
  })
})

apiRouter.get('/goods', function (req, res) {
  res.json({
    errno: 0,
    data: goods
  })
})

apiRouter.get('/ratings', function (req, res) {
  res.json({
    errno: 0,
    data: ratings
  })
})

//实例对象路由去匹配设置的路径
// app.use('/api', apiRouter)





//webpack配置
const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
    before(app) {

      app.get('/api/hellow', function(req, res){
        res.send('hello world');
      });
        app.get('/api/seller', function (req, res) {
        res.json({
          errno: 0,
          data: seller
        })
      })

      app.get('/api/goods', function (req, res) {
        res.json({
          errno: 0,
          data: goods
        })
      })

      app.get('/api/ratings', function (req, res) {
        res.json({
          errno: 0,
          data: ratings
        })
      })
    },
    
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
      ],
    },
    hot: true,
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll,
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    new webpack.HotModuleReplacementPlugin(),//
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
