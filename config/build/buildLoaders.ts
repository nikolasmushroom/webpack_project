import {ModuleOptions} from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import {BuildOptions} from "./types/types";
import ReactRefreshTypeScript from "react-refresh-typescript";
import {buildBabelLoader} from "./babel/buildBabelLoader";

export function buildLoaders(options: BuildOptions): ModuleOptions['rules'] {
    const isDev = options.mode === "development";
    const cssLoaderWithModules = {
        loader: "css-loader",
        options: {
            modules: {
                localIdentName: isDev ? "[path][name]__[local]--[hash:base64:8]" : "[hash:base64:8]",
            },
        }
    }
    const svgLoader = {
        test: /\.svg$/,
        use: [{
            loader: '@svgr/webpack', options: {
                icon: true,
                svgoConfig: {
                    plugins: [
                        {
                            name: 'convertColors',
                            params: {
                                currentColor: true
                            }
                        }
                    ]
                }
            }
        }],
    }
    const assetLoader = {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
    }
    const scssLoader = {
        test: /\.s[ac]ss$/i,
        use: [isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            cssLoaderWithModules
        ],
    }
    // const babelLoader = {
    //     test: /\.tsx?$/,
    //     exclude: /node_modules/,
    //     use: {
    //         loader: "babel-loader",
    //     }
    // }
    const tsLoader = {
        exclude: /node_modules/,
        test: /\.tsx?$/,
        use: [
            {
                loader: 'ts-loader',
                options: {
                    getCustomTransformers: () => ({
                        before: [isDev && ReactRefreshTypeScript()].filter(Boolean),
                    }),
                    transpileOnly: true
                }
            }
        ],
    }
    const babelLoader = buildBabelLoader(options)
    return [
        assetLoader,
        scssLoader,
        // tsLoader,
        babelLoader,
        svgLoader,
    ]
}