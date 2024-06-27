/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        DB_LOCAL_URL:  "mongodb://127.0.0.1:27017/nightwing",
        DB_URL: ""
    }
};

export default nextConfig;
