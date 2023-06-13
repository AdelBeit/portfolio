const https = require("https");
const fs = require("fs");

const icons = [
  "typescript",
  "javascript",
  "nextdotjs",
  "react",
  "nodedotjs",
  "socketdotio",
  "html5",
  "css3",
  "github",
  "figma",
  "yarn",
  "npm",
  "auth0",
  "docker",
  "netlify",
  "vercel",
  "amazonaws",
  "d3dotjs",
  "python",
  "svelte",
  "express",
  "mysql",
  "digitalocean",
  "mongodb",
  "git",
  "postgresql",
  "microsoftazure",
  "googlecloud",
  "heroku",
  "pnpm",
  "visualstudiocode",
  "bootstrap",
  "gitlab",
  "bitbucket",
  "android",
  "androidstudio",
  "swift",
  "mui",
  "jira",
  "arduino",
];

const cdn = (icon, color = "33FF00") => {
  return `https://cdn.simpleicons.org/${icon}/${color}`;
};

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
