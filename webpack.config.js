const path = require('path')
const package = require('./package.json')

module.exports = {
    module: {
        rules: [
            {
                test: /\.(m?js|ts|tsx|jsx|js)$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            [
                                '@babel/preset-env',
                                {
                                    targets: {
                                        browsers: '> 1%, IE 11, not dead',
                                    },
                                    modules: false, // Needed for tree shaking to work.
                                },
                            ],
                        ],
                    },
                },
            },
            { test: /\.tsx?$/, loader: 'ts-loader' },
        ],
    },
    target: 'web', // or web
    entry: {
        'kross-SDK': path.resolve(__dirname, 'src/index.ts'),
    },
    resolve: {
        mainFiles: ['index'],
        extensions: ['.ts', '.js', '.tsx', '.jsx'],
    },

    output: {
        filename: `index.js`,
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: 'umd',
        umdNamedDefine: true,
        globalObject: 'this',
    },

    mode: 'production',

    optimization: {
        splitChunks: {
            cacheGroups: {
                vendors: {
                    priority: -10,
                    test: /[\\/]node_modules[\\/]/,
                    reuseExistingChunk: true,
                },
            },
            filename: `index.min.js`,
            chunks: 'async',
            minChunks: 1,
            minSize: 30000,
        },
    },
    stats: {
        colors: true,
    },
    devtool: 'source-map',
}
