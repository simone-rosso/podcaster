const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

const ruleForJavascript = {
    test: /\.js$/,
    loader: 'babel-loader',
    options: {
        presets: [
            [
                '@babel/preset-react',
                {
                    runtime: 'automatic'
                }
            ]

        ]
    }
}

const ruleForCss = {
    test: /\.css$/,
    use: ['style-loader', 'css-loader']
}

const rules = [ruleForJavascript, ruleForCss]

module.exports = (_, argv) => {
    const { mode } = argv
    const isProduction = mode === 'production'
    return {
        output: {
            filename: isProduction ? '[name].[contenthash].js' : 'main.js',
            path: path.resolve(__dirname, 'build')
        },
        plugins: [
            new HtmlWebpackPlugin({ template: 'src/index.html' })
        ],
        module: {
            rules
        },
        devServer: {
            open: true,
            port: 3000,
            historyApiFallback: true,
        },
        resolve: {
            alias: {
                'hooks': path.join(__dirname, 'src/hooks'),
                'components': path.join(__dirname, 'src/components'),
                'pages': path.join(__dirname, 'src/pages'),
            },
        },
        devtool: 'source-map'
    }
}