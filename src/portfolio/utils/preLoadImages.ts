const cdn = (icon, color = "33FF00") =>
  `https://cdn.simpleicons.org/${icon}/${color}`;

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
];

function preLoadImages(images) {
  const imagePromises = [];

  for (let i = 0; i < images.length; i++) {
    const img = new Image(30, 30);
    const imagePromise = new Promise((res, rej) => {
      img.onload = function () {
        res(img);
      };
      img.onerror = function () {
        rej(new Error("failed to load image."));
      };
      img.src = images[i];
    });

    imagePromises.push(imagePromise);
  }

  Promise.all(imagePromises).then((images) => {
    const event = new CustomEvent("imagesPreloaded", { detail: images });
    document.dispatchEvent(event);
  });
}

const defaultIcons = () => preLoadImages(icons.map((i) => cdn(i)));

export default defaultIcons;
