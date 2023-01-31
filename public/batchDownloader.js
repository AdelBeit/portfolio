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
  "MySQL",
  "MongoDB",
  "PostgreSQL",
  "heroku",
  "netlify",
  "vercel",
  "svelte",
  "AmazonAWS",
  "MicrosoftAzure",
  "GoogleCloud",
  "Python",
  "android",
  "androidstudio",
  "swift",
  "visualstudiocode",
  "mui",
  "JIRA",
  "arduino",
];
const links = icons.map((i) => cdn(i));
console.log(links);
const folderName = "downloadedImgs";

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
