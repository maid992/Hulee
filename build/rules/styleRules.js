const path = require('path')
const fs = require('fs')
const lessToJS = require('less-vars-to-js')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const AntdScssThemePlugin = require('antd-scss-theme-plugin')

const config = require('./../config')
const { resolve } = require('./../utils')
// const theme = require('./../../theme')
const ROOT_DIR = path.resolve(__dirname, '../..');
const resolvePath = (...args) => path.resolve(ROOT_DIR, ...args);
const SRC_DIR = resolvePath('src')

const antThemeVars = lessToJS(fs.readFileSync(path.resolve(SRC_DIR, 'styles/variables.scss'), 'utf8').replace(/\$/ig, '@'));

const sassLoader = {
    loader: 'sass-loader',
    options: {
        includePaths: [require('bourbon').includePaths, resolve('src/styles')]
    }
}

const lessLoader = {
    loader: 'less-loader',
    options: {
        javascriptEnabled: true,
        modifyVars: antThemeVars
    }
}

// const typingsForCssModulesLoader = {
//     loader: 'typings-for-css-modules-loader',
//     options: {
//         modules: true,
//         namedExport: true,
//         camelCase: true,
//         sass: true
//     }
// }

const cacheLoader = {
    loader: 'cache-loader',
    options: {
        // provide a cache directory where cache items should be stored
        cacheDirectory: resolve('.cache-loader')
    }
}

module.exports = [
    {
        test: /\.css$/,
        include: [resolve('node_modules')],
        use: [
            config.extractCss ? MiniCssExtractPlugin.loader : 'style-loader',
            cacheLoader,
            'css-loader',
            'postcss-loader'
        ]
    },
    {
        test: /\.scss$/,
        issuer: {
          exclude: /\.less$/,
          },
        include: [resolve('src')],
        rules: [
            {
                use: [
                    config.extractCss ? MiniCssExtractPlugin.loader : 'style-loader',
                    // typingsForCssModulesLoader,
                    'postcss-loader',
                    sassLoader
                ]
            }
        ]
    },
    {
        test: /\.scss$/,
        issuer: /\.less$/,
        use: {
          loader: require.resolve('./../../sassVarsToLess'),
        }
    },
    {
        // for ant design
        test: /\.less$/,
        include: [
            /[\\/]node_modules[\\/].*antd/,
            resolvePath(SRC_DIR, 'styles/ant.less'),
            resolvePath(ROOT_DIR, './sassVarsToLess.js'),
            resolvePath(SRC_DIR, 'styles/variables.scss')
        ],
        rules: [
            {
                use: [
                    config.extractCss ? MiniCssExtractPlugin.loader : 'style-loader',
                    'css-loader',
                    'postcss-loader',
                    lessLoader
                ]
            }
        ]
    }
]
