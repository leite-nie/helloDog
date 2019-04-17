var path = require('path');
var webpack = require('webpack');

var ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');

function resolve (dir) {
    return path.resolve(__dirname, dir)
}
/*
extract-text-webpack-plugin插件，
有了它就可以将你的样式提取到单独的css文件里，
妈妈再也不用担心样式会被打包到js文件里了。
 */
var ExtractTextPlugin = require('extract-text-webpack-plugin');
/*
html-webpack-plugin插件，重中之重，webpack中生成HTML的插件，
具体可以去这里查看https://www.npmjs.com/package/html-webpack-plugin
 */

var HtmlWebpackPlugin = require('html-webpack-plugin');
var uglify = require('uglifyjs-webpack-plugin');

var dev_config = {
    DEBUG: true,
    devtool: 'eval-source-map',
    publicPath: '/mobile/',
}
var pro_test_config = {
    DEBUG: true,
    devtool: 'false',
    publicPath: '/mobile/',
}
var app_test_config = {
    DEBUG: true,
    devtool: 'false',
    publicPath: '../',
}

var pro_config = {
    DEBUG: false,
    devtool: 'false',
    publicPath: 'http://image.zhenghehd.com/mobile/',
}

var app_config = {
    DEBUG: false,
    devtool: 'false',
    publicPath: '../',
}
// 开发环境
var config = pro_config;
// 发布到 H5 测试
// var config = pro_test_config;
// 发布到 app 测试

//var config = dev_config;

// var config = app_test_config;


var webpackConfig = {
    devtool: config.devtool,
    //devtool: 'source-map',
    entry: { //配置入口文件，有几个写几个
        begin : './src/js/wallet/begin.js',
        index : './src/js/index/index.js',
        detail : './src/js/index/detail.js',
        saleIng : './src/js/index/saleIng.js',
        rest : './src/js/index/rest.js',
        breed : './src/js/index/breed.js',
        mating : './src/js/index/mating.js',
        winning : './src/js/index/winning.js',
        acquire : './src/js/index/acquire.js',
        award : './src/js/award/award.js',
        history : './src/js/award/history.js',
        awardExplain : './src/js/award/awardExplain.js',
        myDog : './src/js/myDog/myDog.js',
        myself : './src/js/myself/myself.js',
        earnings : './src/js/myself/earnings.js',
        extract : './src/js/myself/extract.js',
        translist : './src/js/myself/translist.js',
        notice : './src/js/myself/notice.js',
        playing : './src/js/myself/playing.js',
        question : './src/js/myself/question.js',
        setting : './src/js/myself/setting.js',
        feedback : './src/js/myself/feedback.js',
        invite : './src/js/myself/invite.js',
        transfer : './src/js/myself/transfer.js',
        ogclist : './src/js/myself/ogclist.js',
        myWallet : './src/js/wallet/myWallet.js',
        importWallet : './src/js/wallet/importWallet.js',

        worldcup : './src/js/worldcup/worldcup.js',



    },
    output: {
        path: path.join(__dirname, 'dist/mobile'), //输出目录的配置，模板、样式、脚本、图片等资源的路径配置都相对于它
        publicPath: config.publicPath,
        // publicPath: 'http://image.zhenghehd.com/mobile/',                //模板、样式、脚本、图片等资源对应的server上的路径
        //filename: 'js/[name]_[hash].js',            //每个页面对应的主js的生成配置
        filename: 'js/[name].js',
        chunkFilename: 'js/[id].chunk.js'   //chunk生成的配置
    },
    
    // output: {
    //     path: path.join(__dirname, 'dist/mobile'), //输出目录的配置，模板、样式、脚本、图片等资源的路径配置都相对于它
    //     publicPath: '../',
    //     // publicPath: 'http://image.zhenghehd.com/',                //模板、样式、脚本、图片等资源对应的server上的路径
    //     //filename: 'js/[name]_[hash].js',            //每个页面对应的主js的生成配置
    //     filename: 'js/[name].js',
    //     chunkFilename: 'js/[id].chunk.js'   //chunk生成的配置
    // },
    externals:{
        $: "jquery",
        jQuery: "jquery"
    },
    module: {
        rules: [ //加载器，关于各个加载器的参数配置，可自行搜索之。
            /*{
                 test: /\.css$/,
                 use:  [ 'style-loader', 'css-loader' ]
             },*/
            {
                test: /\.scss$/,
                include: resolve('src'),
                exclude: /node_modules/,
                //css插入js中
                use: ExtractTextPlugin.extract({
                    use: [{
                        loader: "css-loader"
                    }, {
                        loader: "sass-loader"
                    }],
                    // use style-loader in development
                    fallback: "style-loader"
                })
            },
            /*{
                test: /\.less$/,
                //配置less的抽取器、加载器。中间!有必要解释一下，
                //根据从右到左的顺序依次调用less、css加载器，前一个的输出是后一个的输入
                //你也可以开发自己的loader哟。有关loader的写法可自行谷歌之。
                loader: ExtractTextPlugin.extract('css!less')
            }, */
            /*{
                //html模板加载器，可以处理引用的静态资源，默认配置参数attrs=img:src，处理图片的src引用的资源
                //比如你配置，attrs=img:src img:data-src就可以一并处理data-src引用的资源了，就像下面这样
                test: /\.html$/,
                loader: "html?attrs=img:src img:data-src"
            },*/
            {
                test: /\.html$/,
                include: resolve('src'),
                exclude: /node_modules/,
                use: {
                    loader : 'html-loader'
                }
            },
            {
                //文件加载器，处理文件静态资源
                test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                include: resolve('src'),
                exclude: /node_modules/,
                loader: 'file-loader?name=./fonts/[name].[ext]'
            },
            {
                //图片加载器，雷同file-loader，更适合图片，可以将较小的图片转成base64，减少http请求
                //如下配置，将小于8192byte的图片转成base64码
                test: /\.(png|jpg|gif)$/,
                include: resolve('src'),
                exclude: /node_modules/,
                loader: 'url-loader?limit=41920&name=./img/[hash].[ext]'
            },/*
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015']
                    }
                }
            },*/
            {
                test: /\.(js|jsx)$/, // 打包出js 不支持 ie8 错误叫做 Object.defineProperty ，要安装babel-preset-es2015-loose
                loader:  'babel-loader', //api此处用use... 应该用loader 不知道为啥
                include: resolve('src'),
                exclude: /node_modules/,
                options: {
                    presets: ['es2015'], //presets: ['es2015-loose'] 编译会报错。但是成功.另外需要安装 npm install babel-preset-es2015 --save-dev
                    cacheDirectory: true
                }
            },
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            DEBUG: JSON.stringify(config.DEBUG)
        }),
        /*new webpack.ProvidePlugin({ //加载jq
            $: 'jquery'
        }),*/
        
        //开启此处 那么下面list 单独引入一个list.js 会无法执行。必须依赖提取出来的公共vendors
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendors', // 将公共模块提取，生成名为`vendors`的chunk

            chunks: ['begin','worldcup','myWallet','ogclist','importWallet','index','detail','saleIng','rest','breed', 'acquire', 'mating','winning','award','history','awardExplain','myDog','myself','earnings', 'extract', 'translist', 'notice', 'playing', 'question','setting','invite', 'feedback','transfer'], //提取哪些模块共有的部分
            minChunks: 5 // 提取至少3个模块共有的部分

        }),
        new ExtractTextPlugin({
            filename : 'css/[name].css',
            allChunks: true, //如果引入了不同文件夹下面同名xxx.css 会报错，需要加上true
            disable: process.env.NODE_ENV === "development"
        }), //单独使用link标签加载css并设置路径，相对于output配置中的publickPath

        new HtmlWebpackPlugin({
            filename: './wallet/begin.html',
            template: './src/view/wallet/begin.html',
            hash: true,
            chunks: ['vendors','begin']
        }),
        
        new HtmlWebpackPlugin({
            filename: './index.html',
            template: './src/view/index/index.html',
            hash: true,
            chunks: ['vendors','index']
        }),
        new HtmlWebpackPlugin({
            filename: './wallet/myWallet.html',
            template: './src/view/wallet/myWallet.html',
            hash: true,
            chunks: ['vendors','myWallet']
        }),
        new HtmlWebpackPlugin({
            filename: './wallet/importWallet.html',
            template: './src/view/wallet/importWallet.html',
            hash: true,
            chunks: ['vendors','importWallet']
        }),
            
        new HtmlWebpackPlugin({
            filename: './index/detail.html',
            template: './src/view/index/detail.html',
            hash: true,
            chunks: ['vendors','detail']
        }),

        new HtmlWebpackPlugin({
            filename: './index/saleIng.html',
            template: './src/view/index/saleIng.html',
            hash: true,
            chunks: ['vendors','saleIng']
        }),
        new HtmlWebpackPlugin({
            filename: './index/rest.html',
            template: './src/view/index/rest.html',
            hash: true,
            chunks: ['vendors','rest']
        }),
        new HtmlWebpackPlugin({
            filename: './index/breed.html',
            template: './src/view/index/breed.html',
            hash: true,
            chunks: ['vendors','breed']
        }),
        new HtmlWebpackPlugin({
            filename: './index/mating.html',
            template: './src/view/index/mating.html',
            hash: true,
            chunks: ['vendors','mating']
        }),
        new HtmlWebpackPlugin({
            filename: './index/winning.html',
            template: './src/view/index/winning.html',
            hash: true,
            chunks: ['vendors','winning']
        }),
        new HtmlWebpackPlugin({
            filename: './index/acquire.html',
            template: './src/view/index/acquire.html',
            hash: true,
            chunks: ['vendors','acquire']
        }),
        new HtmlWebpackPlugin({
            filename: './award/award.html',
            template: './src/view/award/award.html',
            hash: true,
            chunks: ['vendors','award']
        }),
        new HtmlWebpackPlugin({
            filename: './award/history.html',
            template: './src/view/award/history.html',
            hash: true,
            chunks: ['vendors','history']
        }),
        new HtmlWebpackPlugin({
            filename: './award/awardExplain.html',
            template: './src/view/award/awardExplain.html',
            hash: true,
            chunks: ['vendors','awardExplain']
        }),
        new HtmlWebpackPlugin({
            filename: './myDog/myDog.html',
            template: './src/view/myDog/myDog.html',
            hash: true,
            chunks: ['vendors','myDog']
        }),
        new HtmlWebpackPlugin({
            filename: './myself/myself.html',
            template: './src/view/myself/myself.html',
            hash: true,
            chunks: ['vendors','myself']
        }),
        new HtmlWebpackPlugin({
            filename: './myself/notice.html',
            template: './src/view/myself/notice.html',
            hash: true,
            chunks: ['vendors','notice']
        }),
        new HtmlWebpackPlugin({
            filename: './myself/playing.html',
            template: './src/view/myself/playing.html',
            hash: true,
            chunks: ['vendors','playing']
        }),
        new HtmlWebpackPlugin({
            filename: './myself/earnings.html',
            template: './src/view/myself/earnings.html',
            hash: true,
            chunks: ['vendors','earnings']
        }),
        new HtmlWebpackPlugin({
            filename: './myself/extract.html',
            template: './src/view/myself/extract.html',
            hash: true,
            chunks: ['vendors','extract']
        }),
        new HtmlWebpackPlugin({
            filename: './myself/translist.html',
            template: './src/view/myself/translist.html',
            hash: true,
            chunks: ['vendors','translist']
        }),
        new HtmlWebpackPlugin({
            filename: './myself/question.html',
            template: './src/view/myself/question.html',
            hash: true,
            chunks: ['vendors','question']
        }),
        new HtmlWebpackPlugin({
            filename: './myself/setting.html',
            template: './src/view/myself/setting.html',
            hash: true,
            chunks: ['vendors','setting']
        }),
        new HtmlWebpackPlugin({
            filename: './myself/invite.html',
            template: './src/view/myself/invite.html',
            hash: true,
            chunks: ['vendors','invite']
        }),
        new HtmlWebpackPlugin({
            filename: './myself/feedback.html',
            template: './src/view/myself/feedback.html',
            hash: true,
            chunks: ['vendors','feedback']
        }),
        new HtmlWebpackPlugin({
            filename: './myself/transfer.html',
            template: './src/view/myself/transfer.html',
            hash: true,
            chunks: ['vendors','transfer']
        }),
        new HtmlWebpackPlugin({
            filename: './myself/ogclist.html',
            template: './src/view/myself/ogclist.html',
            hash: true,
            chunks: ['vendors','ogclist']
        }),

        new HtmlWebpackPlugin({
            filename: './worldcup/index.html',
            template: './src/view/worldcup/index.html',
            hash: true,
            chunks: ['vendors','worldcup']
        }),

       
        new webpack.HotModuleReplacementPlugin() //热加载
    ],

    //使用webpack-dev-server，提高开发效率
    
    devServer: {
         contentBase: './dist/',
         host: 'localhost',
         port: 8081, //默认8080
         inline: true, //可以监控js变化
         hot: true, //热启动
     }
};

// 非本地环境添加代码压缩
if(config.devtool != 'eval-source-map') {
    webpackConfig.plugins.push(new uglify())
    // 据说能提升打包速度
    /*webpackConfig.plugins.push(new ParallelUglifyPlugin({
        cacheDir: '.cache/',
        uglifyJS:{
          output: {
            comments: false
          },
          compress: {
            warnings: false
          }
        }
      }))*/

}

module.exports = webpackConfig;
