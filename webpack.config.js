const webpack = require('webpack');

const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
    entry: {
        App: './javascript/index',
    },
    context: `${__dirname}/assets`,
    output: {
        path: (NODE_ENV === 'development') ? `${__dirname}/static/build` : `${__dirname}/final`,
        filename: NODE_ENV === 'development' ? '[name].js' : '[name]-[hash].js',
        publicPath: (NODE_ENV === 'development') ? '/static/build' : '/final',
        library: '[name]',
    },

    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production'),
            },
        }),
        new webpack.optimize.UglifyJsPlugin(),
    ],


    resolve: {
        modules: [`${__dirname}/assets/javascript`, 'node_modules'],
        extensions: ['.js', '.jsx'],
    },

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                include: `${__dirname}\\assets`,
                loader: 'babel-loader?presets[]=react&presets[]=es2015&presets[]=stage-1',
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader?modules=true&localIdentName=[name]__[local]___[hash:base64:5]',
            },
            {
                test: /\.scss$/,
                loader: 'style-loader!css-loader!sass-loader?outputStyle=expanded',
            },
            {
                test: /\.(png|jpg|gif|svg|ttf|eot|woff|woff2)$/,
                loader: 'url-loader?limit=4096&name=[path][name].[ext]',
            },
        ],
    },


    watch: NODE_ENV === 'development',
    watchOptions: {
        aggregateTimeout: 100,
    },

    devtool: NODE_ENV === 'development' ? 'cheap-inline-module-source-map' : false,
};


if (NODE_ENV !== 'development') {
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: true,
            },
        })
    );
}

