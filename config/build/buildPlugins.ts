import webpack, {Configuration} from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import path from "path";
import {BuildOptions} from "./types/types";

export function buildPlugins({paths, mode}: BuildOptions): Configuration['plugins'] {
    const plugins: Configuration['plugins'] = [
        new HtmlWebpackPlugin(
            {template: paths.html}
        ),
    ]

    const isDev = mode === "development";
    const isProd = mode === "production";

    if (isDev) {
        plugins.push(new webpack.ProgressPlugin())
    }
    if (isProd) {
        plugins.push(new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css',
            chunkFilename: 'css/[name].[contenthash:8].css',
        }))
    }
    return plugins;
}