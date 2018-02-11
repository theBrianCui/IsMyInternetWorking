const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const nodeExternals = require('webpack-node-externals');
const ClosureCompilerPlugin = require('webpack-closure-compiler');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
require('dotenv').config();

const PATHS = {
    src: path.join(__dirname, "src"),
    build: path.join(__dirname, "build")
};

let css_rules = {
    test: /\.s?css$/,
    use: process.env.NODE_ENV === "production" ? ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: ['css-loader', 'sass-loader']
    }) : ["style-loader", "css-loader", "sass-loader"]
};

let plugins = [new HtmlWebpackPlugin({
        title: "Webpack demo",
        template: path.join(PATHS.src, "hbs", "index.hbs"),
        filename: path.join(PATHS.build, "public", "index.html")
    })
];

if (process.env.NODE_ENV === "production") {
    plugins.push(new ClosureCompilerPlugin({
        compiler: {
            language_in: 'ECMASCRIPT6',
            language_out: 'ECMASCRIPT5_STRICT',
            compilation_level: 'SIMPLE'
        },
        jsCompiler: true,
    }));
    plugins.push(new ExtractTextPlugin('style.css'));
}

module.exports = [
    {
        name: "app",
        target: "web",
        resolve: {
            alias: {
                "request$": "xhr"
            },
        },
        entry: path.join(PATHS.src, "app.js"),
        module: {
            rules: [
                css_rules,
                {
                    test: /\.hbs$/,
                    use: "handlebars-loader",
                }
            ],
        },
        output: {
            path: path.join(PATHS.build, "public", "static"),
            filename: "app.js",
        },
        plugins: plugins,
    },
    {
        name: "server",
        target: "node",
        entry: path.join(PATHS.src, "server.js"),
        externals: [nodeExternals()],
        node: {
            __dirname: false,
            __filename: false,
        },
        output: {
            path: path.join(PATHS.build),
            filename: "server.js",
        },
    },
];