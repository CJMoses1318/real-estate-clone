import path from "node:path";
import type { NextConfig } from "next";

const projectRoot = path.resolve(__dirname);

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  turbopack: {
    root: projectRoot,
  },
  // Use webpack for dev so PostCSS + Tailwind v4 (lightningcss) resolve from project
  webpack: (config, { dir }) => {
    const projectDir = (dir ?? projectRoot) as string;
    const nodeModules = path.join(projectDir, "node_modules");
    config.context = projectDir;
    config.resolve ??= {};
    config.resolve.modules = [
      nodeModules,
      ...(Array.isArray(config.resolve.modules) ? config.resolve.modules : ["node_modules"]),
    ];
    config.resolve.alias = {
      ...config.resolve.alias,
      tailwindcss: path.join(nodeModules, "tailwindcss"),
      "@tailwindcss/postcss": path.join(nodeModules, "@tailwindcss/postcss"),
    };
    return config;
  },
};

export default nextConfig;
