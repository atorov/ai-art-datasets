const path = require('path')
const webpack = require('webpack')

const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const pkg = require('./package.json')

const APP_NAME = pkg.name
const APP_VERSION = pkg.version

const HOST = process.env.HOST || '0.0.0.0'
const PORT = process.env.PORT || 8080

const NODE_MODULES = path.resolve(__dirname, 'node_modules')
const EXTERNALS = path.resolve(__dirname, 'externals')
const STORAGE = path.resolve(__dirname, '__storage__')
const EXCLUDE_DEFAULT = [NODE_MODULES, EXTERNALS, STORAGE]

const SRC = path.resolve(__dirname, 'src')
// const PUBLIC = path.resolve(__dirname, 'build/public')
// const DIST = path.resolve(__dirname, 'build/public/ai-art-datasets')
const DIST = path.resolve(__dirname, 'build/public')

const { NODE_ENV } = process.env
const MODE = NODE_ENV !== 'development' ? 'production' : 'development'

const config = {
    mode: MODE,

    // https://github.com/webpack/webpack-dev-server/issues/2758
    // Solved for webpack-dev-server v4
    // target: MODE === 'development' ? 'web' : 'browserslist',

    resolve: {
        extensions: ['.ts', '.tsx', '.json', '.js'],
    },

    entry: [
        'core-js/stable',
        'regenerator-runtime/runtime',
        'whatwg-fetch',
        `${SRC}`,
    ],

    output: {
        path: DIST,
        // publicPath: '/ai-art-datasets/',
        publicPath: '/',
    },

    devtool: 'source-map',

    performance: {
        maxEntrypointSize: MODE === 'production' ? 1000000 : 5000000,
        maxAssetSize: MODE === 'production' ? 1000000 : 5000000,
    },

    module: {
        rules: [
            {
                test: /\.scss$/,
                include: SRC,
                exclude: EXCLUDE_DEFAULT,
                use: (() => {
                    if (MODE === 'development') {
                        return [
                            'style-loader',
                            'css-loader',
                            {
                                loader: 'postcss-loader',
                                options: {
                                    postcssOptions: {
                                        plugins: [
                                            [
                                                'postcss-preset-env',
                                                { /* Options */ },
                                            ],
                                        ],
                                    },
                                },
                            },
                            'sass-loader',
                        ]
                    }

                    return [
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        {
                            loader: 'postcss-loader',
                            options: {
                                postcssOptions: {
                                    plugins: [
                                        [
                                            'postcss-preset-env',
                                            { /* Options */ },
                                        ],
                                    ],
                                },
                            },
                        },
                        'sass-loader',
                    ]
                })(),
            },
            {
                test: /\.worker\.ts$/,
                include: SRC,
                exclude: EXCLUDE_DEFAULT,
                use: {
                    loader: 'worker-loader',
                    options: {
                        filename: '[name].[contenthash:4].js',
                    },
                },
            },
            // {
            //     test: /\.jsx?$/,
            //     include: SRC,
            //     exclude: EXCLUDE_DEFAULT,
            //     use: {
            //         loader: 'babel-loader',
            //     },
            // },
            // https://github.com/webpack/webpack/issues/11467
            {
                test: /\.m?js$/,
                resolve: {
                    fullySpecified: false, // disable the behavior
                },
            },
            {
                test: /\.tsx?$/,
                include: SRC,
                exclude: EXCLUDE_DEFAULT,
                use: {
                    loader: 'ts-loader',
                },
            },
        ],
    },

    plugins: [
        new webpack.WatchIgnorePlugin({ paths: EXCLUDE_DEFAULT }),

        new webpack.DefinePlugin({
            APP_NAME: JSON.stringify(APP_NAME),
            APP_VERSION: JSON.stringify(APP_VERSION),
            MODE: JSON.stringify(MODE),
            NODE_ENV: JSON.stringify(NODE_ENV),
            // 'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
            process: { env: { NODE_ENV: JSON.stringify(NODE_ENV) } },
        }),

        new HtmlWebpackPlugin({
            filename: `${DIST}/index.html`,
            template: `${SRC}/index.ejs`,
        }),

        new MiniCssExtractPlugin({
            filename: '[name].[contenthash:4].css',
        }),

        new CopyWebpackPlugin({
            patterns: [
                {
                    from: `${SRC}/assets/img/favicon.png`,
                    to: `${DIST}/favicon.png`,
                },
                {
                    from: `${SRC}/assets/img`,
                    to: `${DIST}/img`,
                    globOptions: {
                        ignore: ['.DS_Store'],
                    },
                },
                {
                    from: `${SRC}/assets/local-db`,
                    to: `${DIST}/local-db`,
                    globOptions: {
                        ignore: ['.DS_Store'],
                    },
                },
                // {
                //     from: `${SRC}/assets/surge.sh`,
                //     to: `${PUBLIC}/`,
                // },
            ],
        }),
    ],
}

// Production mode only settings -----------------------------------------------
if (MODE === 'production') {
    config.output.chunkFilename = '[name].[chunkhash:4].js'
    config.output.filename = '[name].[chunkhash:4].js'

    config.optimization = {
        splitChunks: {
            chunks: 'initial',
        },
        runtimeChunk: {
            name: 'manifest',
        },
    }
}

// Development mode only settings ----------------------------------------------
if (MODE === 'development') {
    config.devServer = {
        host: HOST,
        port: PORT,
        client: {
            logging: 'info',
            overlay: {
                errors: true,
                warnings: true,
            },
            // progress: true,
        },
        devMiddleware: {
            // publicPath: '/ai-art-datasets/',
            // publicPath: '/',
            // stats: 'errors-only',
            stats: 'minimal',
        },
        server: 'https',
        // static: {
        // directory: path.resolve(__dirname, "static"),
        // staticOptions: {},
        //
        // Don't be confused with `devMiddleware.publicPath`, it is `publicPath` for static directory
        // Can be:
        // publicPath: ['/static-public-path-one/', '/static-public-path-two/'],
        // publicPath: '/ai-art-datasets/',
        // publicPath: '/',
        //
        // Can be:
        // serveIndex: {} (options for the `serveIndex` option you can find https://github.com/expressjs/serve-index)
        // serveIndex: true,
        //
        // Can be:
        // watch: {} (options for the `watch` option you can find https://github.com/paulmillr/chokidar)
        // watch: true,
        // watch: {
        //     aggregateTimeout: 300,
        //     poll: 1000,
        //     ignored: EXCLUDE_DEFAULT,
        // },
        // },
        historyApiFallback: {
            // index: '/ai-art-datasets/index.html',
            index: '/index.html',
        },
        allowedHosts: 'all',
        // liveReload: true,
        // hot: false,
    }
}

module.exports = config
