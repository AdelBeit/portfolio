const urls = { jam: "https://dnk-app-ierav.ondigitalocean.app/home?roomID=1" };
/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/jam",
        destination: urls.jam,
        permanent: true,
      },
    ];
  },
};
