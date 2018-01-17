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
        entry: path.join(PATHS.src, "app.js"),
        output: {
            path: path.join(PATHS.build, "public", "static"),
            filename: "app.js",
        },
        plugins: [
            new HtmlWebpackPlugin({
                title: "Webpack demo",
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