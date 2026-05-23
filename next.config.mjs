/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  turbopack: {
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  },
  rewrites: () => {
    return [
      {
        source: `/api/proxy/:path*`,
        destination: `${process.env.BASEURL}/:path*`,
      },
    ];
  },
};

export default nextConfig;
