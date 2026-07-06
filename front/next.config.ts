import type { NextConfig } from "next";
export const prefixPath = "/archive/2025";
const nextConfig: NextConfig = {
    output: 'export',
    trailingSlash: true,
    distDir: './archive/2025',  // 静的ビルド用
    assetPrefix: prefixPath,
    basePath: prefixPath,
    images: {  // 静的ビルド用
        //disableStaticImages: true, // importした画像の型定義設定を無効にする設定
        unoptimized: true,  // 静的ビルド用
        loader: 'custom',
        loaderFile: './imageLoader.ts',
    },
    experimental: {
        workerThreads: false,
        cpus: 4,
    },
};

export default nextConfig;
