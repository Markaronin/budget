const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");

const contentBase = path.join(__dirname, "public");

module.exports = {
    entry: "./src/ts/main.tsx",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                include: /\/src\/ts/,
            },
            {
                test: /\.less$/i,
                use: ["style-loader", "css-loader", "less-loader"],
                include: /\/src\/ts/,
            },
        ],
    },
    output: {
        filename: "bundle.js",
        path: contentBase,
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js", ".less", ".css"],
    },
};
