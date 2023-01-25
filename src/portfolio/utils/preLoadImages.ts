const cdn = (icon, color = "33FF00") => `https://cdn.simpleicons.org/${icon}/${color}`;

const icons = [
   "heroku",
   "JavaScript",
   "netlify",
   "vercel",
   "svelte",
   "arduino",
   "HTML5",
   "CSS3",
   "React",
   "TypeScript",
   "Webpack",
   "Babel",
   "Node.js",
   "JSON",
   "Git",
   "github",
   "gitlab",
   "bitbucket",
   "d3dotjs",
   "threedotjs",
   "Jest",
   "Puppeteer",
   "AmazonAWS",
   "MicrosoftAzure",
   "GoogleCloud",
   "Kubernetes",
   "nextdotjs",
   "Socket.io",
   "Docker",
   "DigitalOcean",
   "Figma",
   "JAMstack",
   "dotenv",
   "MySQL",
   "Express",
   "Python",
   "php",
   "yarn",
   "npm",
   "pnpm",
   "graphql",
   "MongoDB",
   "PostgreSQL",
   "JIRA",
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

const defaultIcons = () => preLoadImages(icons.map(i => cdn(i)));

export default defaultIcons;