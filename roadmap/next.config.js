/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

const withMDX = require("@next/mdx")({
  extension: /\.(md|mdx)?$/,
  options: {
    rehypePlugins: [rehypePrism],
    remarkPlugins: [],
  },
});
nextConfig = withMDX(nextConfig);
module.exports = nextConfig
