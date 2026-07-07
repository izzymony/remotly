import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

 images:{
 remotePatterns:[
  {
    protocol: 'https',
    hostname: 'd2q79iu7y748jz.cloudfront.net'
  },
  {
    protocol: 'https',
    hostname:'logo.clearbit.com'
  },
  {
    protocol: 'https',
    hostname: 'media.licdn.com'
  }
 ]
 }
};

export default nextConfig;
