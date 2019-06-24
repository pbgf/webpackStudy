let path = require('path');
let HtmlWebpackPLugin = require('html-webpack-plugin')
let MIniCssExtractPlugin = require('mini-css-extract-plugin')
let optimizeCss=require('optimize-css-assets-webpack-plugin');
let uglifyJsPlugin=require('uglifyjs-webpack-plugin');
let  merge = require('webpack-merge');
//merge插件 是用来合并你的配置文件的 插件
//你可以 把你的 开发配置 和 生产环境 公共配置 区分开来
//webpack.dev.js = dev + base   webpack.prod.js = prod +base
// const devWebpackConfig = merge(baseWebpackConfig, {
//     devServer:{
//         proxy:{
//             "/^api":"localhost//:3000"
//         }
//     }
// });
module.exports={
    // optimization:{
    //     minimizer:[
    //         new uglifyJsPlugin(),
    //         new optimizeCss()
    //     ]
    // },
    mode:'production',
    entry:'./src/index.js',
    //1）devtool:'source-map'产生单独的文件
    //2）devtool:'eval-source-map'不会产生单独的文件，会集成到生成的文件中
    //3）devtool:'cheap-module-source-map'会产生单独的文件但是不会提示到列
    //4）devtool:'cheap-module-eval-source-map'不会产生单独的文件 并且也不会提示到列
    devtool:'source-map',//增加映射文件，当代码出错时，出错文件是映射文件，而不会是打包后的文件
    output:{
        filename:'bundle.[hash].js',//打包后的文件名
        chunkFilename: 'js/[id].[chunkhash].js',//chunkfile是没有被列出在entry的文件采用的命名方案
        path:path.resolve(__dirname,'dist'),//路径必须是一个绝对路径
    },
    devServer:{
        before(app){//before可以拦截请求 并作响应 app是express生成的 
            //可以充当简易的 mock
            app.get('/user',(req,res)=>{

            })
        },
        proxy:{
            '/api':"localhost//:3000",//代理访问 这样不会存在跨域问题
            pathRewrite:{
                "^/api":""//把api重写成空
            }
        }
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
        noParse:/jquery/,//noParse 可让webpack忽略部分模块的解析 提升打包速度
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
                            '@babel/preset-env',//”presets“配置项来标识如何将ES6语法转成ES5以及如何转换React的JSX成js文件。
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