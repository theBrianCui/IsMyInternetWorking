const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const nodeExternals = require('webpack-node-externals');

const PATHS = {
  src: path.join(__dirname, "src"),
  build: path.join(__dirname, "build")
};

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
                {
                    test: /\.s?css$/,
                    use: ["style-loader", "css-loader", "sass-loader"]
                },
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
        plugins: [
            new HtmlWebpackPlugin({
                title: "Webpack demo",
                template: path.join(PATHS.src, "hbs", "index.hbs"),
                filename: path.join(PATHS.build, "public", "index.html")
            }),
        ],
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