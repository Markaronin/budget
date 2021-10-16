const path = require("path");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
    devServer: {
        static: {
            directory: path.join(__dirname, "public"),
            watch: true,
        },
        port: 3000,
    },
    mode: "development",
});
