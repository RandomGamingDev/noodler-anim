import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  variants: {
    extend: {
        display: ["group-hover"],
    },
  },

};

export default nextConfig;
