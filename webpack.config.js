let path = require('path');
let HtmlWebpackPLugin = require('html-webpack-plugin')
let MIniCssExtractPlugin = require('mini-css-extract-plugin')
let optimizeCss=require('optimize-css-assets-webpack-plugin');
let uglifyJsPlugin=require('uglifyjs-webpack-plugin');
module.exports={
    // optimization:{
    //     minimizer:[
    //         new uglifyJsPlugin(),
    //         new optimizeCss()
    //     ]
    // },
    mode:'production',
    entry:'./src/index.js',
    output:{
        filename:'bundle.[hash].js',//打包后的文件名
        path:path.resolve(__dirname,'dist'),//路径必须是一个绝对路径
    },
    plugins:[
        new HtmlWebpackPLugin({
            template:'./src/index.html',
            filename:'index.html',
            minify:{
                removeAttributeQuotes:true,
                collapseWhitespace:true,
                
            },
            hash:true
        }),
        new MIniCssExtractPlugin({
            filename:'main.css'
        })
    ],
    module:{//模块
        rules:[//规则
            //css-loader 解析 css语法  sty-loader 把css插入到head的标签中
            //loader的特点 希望单一
            //loader 的用法 字符串只用一个loader
            //多个loader需要[]
            //loader的顺序 默认是从左向右
            
            //引入第三方库的方式
            // 1) expose-loader
            // 2) providerPlugin
            // 3) 引入不打包方式
            {
                test:/(\.jpg|\.png)$/,
                use:'file-loader'
            },
            {
                test:/\.css$/,
                use:[
                    MIniCssExtractPlugin.loader,
                    "css-loader",    
                ]
            },
            {
                test:/\.less$/,use:[
                    MIniCssExtractPlugin.loader,
                    "css-loader",//css => style
                    "less-loader",//less => css
                ]},
                // {
                //     test: /\.js$/,
                //     exclude: /node_modules/,
                //     loader: "eslint-loader"
                //   },
            {
                test:/\.js$/,
                use:{
                    loader:'babel-loader',
                    options:{
                        presets:[
                            '@babel/preset-env',
                        ],
                        plugins:[
                            "@babel/plugin-transform-runtime"
                        ]
                    }
                },
                include:path.resolve(__dirname,"src"),
                exclude:/node_modules/
            }
        ]
    }
}