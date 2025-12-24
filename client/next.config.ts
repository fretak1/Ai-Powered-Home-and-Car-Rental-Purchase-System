import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images:{
    remotePatterns:[
      {
      protocol:"https",
      hostname:"example.com",                                                                                      port:"",
      port:"",
      pathname:"/**",
      },

    ],
  },
};

export default nextConfig;
