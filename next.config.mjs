/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_URL: "http://localhost:3000",
    DB_LOCAL_URL: "mongodb://127.0.0.1:27017/nightwing",
    DB_URL: "",
    CLOUDINARY_CLOUD_NAME: "dbksfm68g",
    CLOUDINARY_API_KEY: "184162434569459",
    CLOUDINARY_API_SECRET: "N6Jl1DxhyfuRZWLXxosniv9Xwxk",
    NEXTAUTH_URL: "http://localhost:3000",
    NEXTAUTH_SECRET: "SKADHAOISDJASKDADSA",
    SMTP_SERVICE: "gmail",
    SMTP_HOST: "smtp.gmail.com",
    SMTP_PORT: 2525,
    SMPTP_USER: "fisfusfoz@gmail.com",
    SMTP_PASSWORD: "dqnb cbpe ltuk srkj",
    SMTP_FROM_EMAIL: "noreply@bookly.com",
    SMPTP_FROM_NAME: "Bookly"
  },
  images: {
    domains: ["res.cloudinary.com"],
  },
};

export default nextConfig;
