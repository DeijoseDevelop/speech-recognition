/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        X_API_KEY: process.env.X_API_KEY,
    },
};

module.exports = nextConfig;
