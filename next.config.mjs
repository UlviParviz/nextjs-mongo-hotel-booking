/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        API_URL: "http://localhost:3000",
        DB_LOCAL_URL:  "mongodb://127.0.0.1:27017/nightwing",
        DB_URL: ""
    },
    images: {
        domains: ["res.cloudinary.com"],
      },
};

export default nextConfig;
