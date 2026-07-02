import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: 'export',
    experimental: {
        workerThreads: false,
        cpus: 4,
    },
};

export default nextConfig;
