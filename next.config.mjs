/** @type {import('next').NextConfig} */
const config = {
  experimental: {
    instrumentationHook: true,
  },
  output: "standalone",
};

export default config;
