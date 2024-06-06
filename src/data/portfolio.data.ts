const LANDING = {
  NAME: "Adele Beitvashahi",
  ROLE: "Software Engineer",
  CONTENT: "I have a passion for developing software that's",
  KEYWORDS: [
    "accessible",
    "light weight",
    "scalable",
    "fast",
    "secure",
    "responsive",
    "thoughtfully written",
    "extendable",
    "optimized",
    "well documented",
    "beautiful",
    "GONNA FEED YOUR PETS",
    "bug free",
    "modular",
    "maintainable",
    "i m m a c u l a t e",
    "efficient",
    "never gonna let you down",
    "future proof",
    "certified 100% organic grassfed NON GMO",
    "well tested",
    "versatile",
    "dairy free",
    "reusable",
    "reliable",
    "robust",
  ],
  EXTRAS:
    "Adele is proficient in creating optimized, scalable, and error-free code. However, his abilities extend beyond just writing code. Throughout his career, he has had a chance to fill the shoes of various roles in Software Development Life Cycle (SDLC); such as Quality Engineering, Project Management, and UX/UI Design. This diverse range of experiences has provided Adele a with comprehensive understanding of SDLC, making him a more well-rounded Engineer who brings a unique perspective to the field.",
};

const ABOUT = {
  TITLE: "ABOUT",
  CONTENT1:
    "I like turning ideas into reality, and I can do anything I set my mind to. I'm infinitely curious, perpetually learning, and have a passion for problem solving! \n\nI have worked with many different technologies and am not afraid to try new ones. Aside from my technical affinity, my personable nature, soft skills, and diverse background set me apart from my peers. \n\nOutside of coding and working, I enjoy everything tech, cinema, music, and the outdoors! I'm looking for a company where I'm challenged everyday, if you are that company let's talk",
  CONTENT2:
    "Not only is Adele a highly capable and effective software engineer, but he also possesses strong soft skills that set him apart from his peers in his field. \n\nThroughout his career, he has had the opportunity to play various roles in the software development life cycle (SDLC), including Quality Engineering, Project Management, and UX/UI Design. This diverse range of experiences has provided Adele with a comprehensive understanding of SDLC and equipped him with a unique perspective. \n\nHis combination of technical expertise and interpersonal skills make Adele a valuable asset to any team",
  CONTENT3:
    "Curious with a natural tendency to identify and solve problems, I enjoy building and tinkering with things. Coding is my favorite medium, but I dabble in mediums such as art, cooking, music, dancing, and photography. \n\nIn my spare time, I love exploring new things, whether it be trying out new foods, finding new music or tv shows, traveling to new places, making new connections, or discovering new hobbies. \n\nI'm a lifelong learner who's passionate about creating and connecting; Perpetually eager for new opportunities to better myself and the world around me.",
  LINKS: {
    LINKEDIN: "https://linkedin.com/in/adel-beitvashahi",
    GITHUB: "https://github.com/adelbeit",
    RESUME: "/Adele_Beitvashahi.pdf",
    EMAIL: "mailto:adelbeitvashahi@gmail.com",
    DEVDOTTO: "https://dev.to/adelbeit",
  },
};

const ETHERICONS = [
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
  // "arduino",
  // "graphql",
  // "php",
  // "threedotjs",
  // "jest",
  "playwright",
  // "puppeteer",
  // "json",
  // "webpack",
  // "babel",
  // "kubernetes",
  // "jamstack",
  // "dotenv",
  // "tonejs",
];

const TECHSTACK = {
  ICONS: ETHERICONS,
};

const EDUCATION = {
  TITLE: "Indiana University Bloomington",
  DEGREE: "Bachelor of Science, Computer Science",
};

const PRODUCTS = [
  {
    TITLE: "Audiobook Generator",
    CONTENT: [
      "Webapp that generates personalized audio books from a given e-book, and an ElevenLabs cloned voice model. Powered by NextJS.",
    ],
    STACK: ["react", "typescript", "nextdotjs", "github"],
    LINKS: {
      VIDEO: "",
      CODE: "https://github.com/AdelBeit/narrator",
      LINK: "https://narrator.adelbeit.com/",
    },
  },
  {
    TITLE: "Smart Autofill",
    CONTENT: [
      "Web scraper that extracts form from a website. Runs it through chatgpt to pair different form inputs with given context data, and fills out the form using Playwright. Powered by Beautiful Soup, Python, and ChatGPT.",
      "Due this projects capability to create spam, the source code is not public.",
    ],
    STACK: ["python", "playwright", "github"],
    LINKS: {
      VIDEO: "",
      CODE: "https://github.com/AdelBeit/html-parser",
      LINK: "https://narrator.adelbeit.com/",
    },
  },
  {
    TITLE: "Jamroom",
    CONTENT: [
      "Progressive webapp that let's 10+ concurrent users jam out together with virtual instruments. Features offline caching.",
      "Powered by a real-time Web Socket API to host many users in a virtual jam session, using Docker for continuous delivery to Digital Ocean.",
    ],
    STACK: [
      "nextdotjs",
      "react",
      "typescript",
      "tonejs",
      "socketdotio",
      "docker",
      "digitalocean",
      "figma",
      "github",
    ],
    LINKS: {
      VIDEO: "",
      CODE: "https://github.com/adelbeit/jamroom",
      LINK: "https://jam.adelbeit.com/",
    },
  },
  {
    TITLE: "Icon Ether",
    CONTENT: [
      "Animated component that spawns image/shaped particles with random x,y coords that move about and bounce off the screen.",
      "Fetches icons from SimpleIcons provided a valid name. Features automatic fallback to local images.",
    ],
    STACK: ["react", "typescript", "Figma", "github", "yarn", "npm"],
    LINKS: {
      VIDEO: "",
      CODE: "https://github.com/adelbeit/react-icon-ether",
      LINK: "https://www.npmjs.com/package/react-icon-ether",
    },
  },
  {
    TITLE: "Bord",
    CONTENT: [
      "Responsive to-watch list for movies and shows. With Hotkey support!",
      "Features Google SSO powered by Auth0, and a forward proxy server layer for cloaking API tokens.",
    ],
    STACK: ["react", "bootstrap", "auth0", "airtable", "netlify", "github"],
    LINKS: {
      VIDEO: "",
      CODE: "https://github.com/adelbeit/bord",
      LINK: "https://bord.adelbeit.com/",
    },
  },
  // {
  //   TITLE: "Portfolio",
  //   CONTENT: [
  //     "Cyberpunk-themed portfolio template site designed in Figma. Built with Nextjs and Typescript.",
  //   ],
  //   STACK: [
  //     "nextdotjs",
  //     "react",
  //     "typescript",
  //     "javascript",
  //     "figma",
  //     "github",
  //   ],
  //   LINKS: {
  //     VIDEO: "",
  //     CODE: "https://github.com/adelbeit/portfolio",
  //     LINK: "https://adelbeit.com/",
  //   },
  // },
  // {
  //   TITLE: "Lead Generation Site",
  //   CONTENT: [
  //     "Designed and implemented a responsive JAM stack lead generation portal for an auto mechanic shop that generated a 150% increase in revenue within 2 months.",
  //   ],
  //   STACK: [
  //     "nextdotjs",
  //     "react",
  //     "Figma",
  //     "Git",
  //     "github",
  //     "css3",
  //     "typescript",
  //     "javascript",
  //     "vercel",
  //   ],
  //   LINKS: {
  //     VIDEO: "",
  //     CODE: "https://github.com/AdelBeit/Client_IdealAuto",
  //     LINK: "https://www.idealauto.co/",
  //   },
  // },
];

const BLOGPOSTS = [
  {
    TITLE:
      "How to persist client-side preferences on the client in Svelte (w/o DB)",
    LINK: "https://dev.to/adelbeit/how-to-persist-user-preferences-in-svelte-wo-db-51nf",
  },
  {
    TITLE:
      "This website was built to serve with templatability in mind. Get started by forking the repo and customizing the profile.data.json! Just follow the link by clicking on this card.",
    LINK: "https://github.com/adelbeit/portfolio",
  }, // footer post
];

const SONGS = ["mercenary.mp3", "spoiler.mp3", "star eater.mp3"];

export {
  LANDING,
  ABOUT,
  EDUCATION,
  PRODUCTS,
  BLOGPOSTS,
  SONGS,
  TECHSTACK,
  ETHERICONS,
};
