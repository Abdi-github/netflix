/** @type {import('next').NextConfig} */
const withTM = require("next-transpile-modules")([
  "@stripe/firestore-stripe-payments",
]);

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["image.tmdb.org", "rb.gy"],
  },
};

module.exports = withTM(nextConfig);
