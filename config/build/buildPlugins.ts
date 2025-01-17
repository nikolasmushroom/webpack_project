import webpack, {Configuration} from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import {BuildOptions} from "./types/types";
import {BundleAnalyzerPlugin} from 'webpack-bundle-analyzer'
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import path from "path";
import CopyPlugin from "copy-webpack-plugin";

export function buildPlugins({paths, mode, analyzer, platform}: BuildOptions): Configuration['plugins'] {
    const plugins: Configuration['plugins'] = [
        new webpack.DefinePlugin({
            __PLATFORM__: JSON.stringify(platform)
        }),
        new HtmlWebpackPlugin(
            {template: paths.html, favicon: path.resolve(paths.public, 'favicon.ico')},
        ),
    ]

    const isDev = mode === "development";
    const isProd = mode === "production";

    if (isDev) {
        plugins.push(new webpack.ProgressPlugin())
        plugins.push(new ReactRefreshWebpackPlugin())
        plugins.push(new ForkTsCheckerWebpackPlugin())
    }
    if (isProd) {
        plugins.push(new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css',
            chunkFilename: 'css/[name].[contenthash:8].css',
        }))
        plugins.push( new CopyPlugin({
            patterns: [
                { from: path.resolve(paths.public, 'locales'), to: path.resolve(paths.output, 'locales') },
            ],
        }),)
    }
    if (analyzer) {
        plugins.push(new BundleAnalyzerPlugin())
    }
    return plugins;
}