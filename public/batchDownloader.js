const https = require("https");
const fs = require("fs");

const cdn = (icon, color = "33FF00") => {
  return `https://cdn.simpleicons.org/${icon}/${color}`;
};

const icons = [
  "TypeScript",
  "JavaScript",
  "next.js",
  "React",
  "Node.js",
  "Express",
  "Socket.io",
  "HTML5",
  "CSS3",
  "bootstrap",
  "Git",
  "yarn",
  "npm",
  "pnpm",
  "github",
  "gitlab",
  "bitbucket",
  "Docker",
  "Figma",
  "DigitalOcean",
  "d3.js",
  "three.js",
  "Jest",
  "playwright",
  "Puppeteer",
  "MySQL",
  "graphql",
  "MongoDB",
  "PostgreSQL",
  "heroku",
  "netlify",
  "vercel",
  "svelte",
  "JSON",
  "Webpack",
  "Babel",
  "AmazonAWS",
  "MicrosoftAzure",
  "GoogleCloud",
  "Kubernetes",
  "JAMstack",
  ".env",
  "Python",
  "android",
  "androidstudio",
  "swift",
  "visualstudiocode",
  "mui",
  "JIRA",
  "arduino",
  "php",
  // "tonejs",
];

const links = icons.map((i) => cdn(i));
console.log(links);
const folderName = "downloaded Imgs";

if (!fs.existsSync(folderName)) {
  fs.mkdirSync(folderName);
}
links.forEach((link) => {
  console.log;
  const fileName = link.split("/")[3];
  https.get(link, (response) => {
    response.pipe(fs.createWriteStream(`${folderName}/${fileName}.svg`));
  });
});
