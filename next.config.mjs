/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_URL: "https://bookly-lovat.vercel.app/",
    DB_LOCAL_URL: "mongodb://127.0.0.1:27017/nightwing",
    DB_URL: "mongodb+srv://ulvispaethe:lanadelrey@bookly.fbgn4yf.mongodb.net/",
    CLOUDINARY_CLOUD_NAME: "dbksfm68g",
    CLOUDINARY_API_KEY: "184162434569459",
    CLOUDINARY_API_SECRET: "N6Jl1DxhyfuRZWLXxosniv9Xwxk",
    NEXTAUTH_URL: "https://bookly-lovat.vercel.app/",
    NEXTAUTH_SECRET: "SKADHAOISDJASKDADSA",
    REVALIDATE_TOKEN: "JK34JASDASD0A",
    STRIPE_WEBHOOK_SECRET:
      "whsec_471c273f9f51de4dd443439948e904076b387035bc9434a3ff94c89f52de4c58",
    STRIPE_SECRET_KEY:
      "sk_test_51Pf0bVRtQB5ckkuzIAyQFkllEUeh4MIGRnI4kBDdoyPoIe6qjKWGq7glIThEPVjW2s87rbOOQzbAWQhH80hroWRH00uGZQG9sr",
    SMTP_SERVICE: "gmail",
    SMTP_HOST: "smtp.gmail.com",
    SMTP_PORT: "2525",
    SMPTP_USER: "fisfusfoz@gmail.com",
    SMTP_PASSWORD: "dqnb cbpe ltuk srkj",
    SMTP_FROM_EMAIL: "noreply@bookly.com",
    SMPTP_FROM_NAME: "Bookly",
    GEOCODER_API_KEY: "KfENWWQ2dgYbJRLVj5akc2N3zbsMLiGs",
    GEOCODER_PROVIDER: "mapquest",
    MAPBOX_ACCESS_TOKEN:
      "pk.eyJ1IjoidWx2aXNwYWV0aGUiLCJhIjoiY2x5Ym9ibzhrMDRlejJrcGwyNW5keXJtaSJ9.wOA93A1XW-Qamu0KzCIZNw",
  },
  images: {
    domains: ["res.cloudinary.com"],
  },
};

export default nextConfig;
