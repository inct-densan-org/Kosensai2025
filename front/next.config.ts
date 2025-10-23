import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    experimental: {
        workerThreads: false,
        cpus: 4,
    },
    cacheComponents: true,
};

export default nextConfig;
