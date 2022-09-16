const urls = { dnk: "https://dnk-app-ierav.ondigitalocean.app/home?roomID=1" };
/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/dnk",
        destination: urls.dnk,
        permanent: true,
      },
    ];
  },
};
