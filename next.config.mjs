/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "9000",
        pathname: "/**",
      },
    ],
  },
  reactStrictMode: false,
  turbopack: {
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  },
  rewrites: () => {
    const BASEURL_PATH = new URL(process.env.NEXT_PUBLIC_BASEURL).pathname;
    return [
      {
        source: `${BASEURL_PATH}/:path*`,
        destination: `${process.env.SOURCE_BASEURL}/:path*`,
      },
    ];
  },
};

export default nextConfig;
