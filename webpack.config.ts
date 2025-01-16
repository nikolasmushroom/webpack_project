import path from 'path';
import webpack from 'webpack';
import {buildWebpack} from "./config/build/buildWebpack";
import {BuildMode, BuildPaths} from "./config/build/types/types";


export interface envVariables {
    mode?: BuildMode;
    port?: number
}

export default (env: envVariables) => {
    const paths: BuildPaths = {
        output: path.resolve(__dirname, 'build'),
        html: path.resolve(__dirname, 'src', 'index.html'),
        entry: path.resolve(__dirname, 'src/', 'index.tsx'),
    }
    const config: webpack.Configuration = buildWebpack({
        port: env.port ?? 3000,
        mode: env.mode ?? 'development',
        paths: paths
    })
    return config;

};