/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        API_URL: process.env.API_URL,
        LOCAL_API_URL: process.env.LOCAL_API_URL,
        X_API_KEY: process.env.X_API_KEY,
    },
};

module.exports = nextConfig;
