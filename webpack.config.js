let path = require('path');
let MiniCssExtractPlugin = require('mini-css-extract-plugin');

let conf = {
	context: __dirname,
	entry: './src/main.js',
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: 'main.js',
		publicPath: '/dist/',
		clean: true,
	},
	resolve: {
		// alias: {
		// 	components: path.resolve(__dirname, './src/components'),
		// },
		extensions: ['.js', '.jsx'],
	},
	devServer: {
		static: {
			directory: path.join(__dirname, '.'),
		},
		historyApiFallback: true,
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				loader: 'babel-loader',
				exclude: '/node_modules/'
			},
			{
				test: /\.module\.css$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							modules: {
								localIdentName: '[local]__[sha1:hash:hex:7]'
							}
						}
					}
				]
			},
			{
				test: /^((?!\.module).)*css$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader']
			}
		]
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: 'main.css'
		})
	]
};
module.exports = (env, options) => {
	let isProd = options.mode === 'production';
	// conf.devtool = isProd ? false : 'eval-cheap-module-source-map';
	conf.devtool = isProd ? false : 'source-map';
	return conf;
}
