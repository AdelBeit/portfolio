export const SiteData = {
  name: "Adele Beitvashahi",
  role: "Software Engineer",
  site: "Adelbeit.com",
  city: "Seattle, WA",
  phone: "(812) 360 - 6898",
  email: "adelbeitvashahi@gmail.com",
  description: "",
  imgPaths: {
    icons: {
      city: "./icons/location.png",
      phone: "./icons/phone.png",
      email: "./icons/email.png",
      linkedin: "./icons/linkedin.png",
      github: "./icons/github.png",
    },
  },
  info: {
    github: "adelbeit",
    linkedin: "adel-beitvashahi",
    email: "adelbeitvashahi@gmail.com",
    city: "Seattle, WA",
  },
  projects: [
    {
      title: "Resume Generator",
      language: "NextJS, ReactJS, TypeScript",
      time: { year: "2022", month: "mar" },
      description: [
        "Generates a resume from JSON data.",
        "Uses Flexbox to ensure responsiveness across devices",
        "Powered by NextJS, ReactJS, and Typescript. Deployed on Vercel.",
      ],
      url: { demo: "https://adelbeit.com/", github: "https://github.com/AdelBeit/portfolio" }
    },
    {
      title: "Drum & Keys",
      language: "NextJS",
      time: { year: "2022", month: "mar" },
      description: [
        "Uses Web Intersection Observer API and CSS transitions for animations.",
        "Uses Web Audio API to play samples, and provide user volume controls.",
        "Supports multi-user sessions using Web Socket API (Socket.IO)",
        "Uses Docker and Digital Ocean for deployment. Powered by NextJS, ReactJS, ToneJS, and Socket.IO",
      ],
      url: { demo: "https://adelbeit.com/dnk", github: "https://github.com/AdelBeit/dnk" }
    },
    {
      title: "bord",
      language: "NextJS",
      time: { year: "2021", month: "feb" },
      description:
        [
          "Built on JAMstack, Javascript API Markup stack.",
          "Uses Auth0 for passwordless authentication, allowing for a seamless signup/login process through google account.",
          "Uses AirtableDB to store book/movie/show titles.",
          "Powered by ReactJS, SASS, Bootstrap, Auth0, AirtableDB. Deployed on Netlify.",
        ],
      url: { demo: "https://bord.netlify.app/", github: "https://github.com/AdelBeit/bord" }
    }
  ],
  experience: [
    {
      company: "Freelance Developer",
      role: "Ideal Auto",
      time: "2022",
      duties: [
        "Created a fast landing page for an auto mechanic shop using Typescript, NextJS, ReactJS, and NodeJS.",
        "Designed the website in Figma and ensured client is satisfied with the design before implementation.",
        "Ensured website responsiveness on multiple platforms using CSS media queries",
      ],
      url: { demo: "https://www.idealauto.co/", github: "https://github.com/AdelBeit/Client_IdealAuto" }
    },
    {
      company: "Cox Communications",
      role: "Scrum Master",
      time: "2020 - 2021",
      duties: [
        "Kept developers on track by ensuring all business requirements well defined and formatted on JIRA for a multimillion dollar project.",
        "Developed a script that standardized the list of release changes, streamlined their delivery to respective stakeholders, eliminating the task from project manager's to do list.",
      ],
      url: { demo: "", github: "" }
    },
    {
      company: "TMobile",
      role: "Quality Engineer",
      time: "2019 - 2020",
      duties: [
        "Built and automated UI tests using Tricentis Tosca for several projects worth $10+ million.",
        "Created and maintained Oracle MySQL scripts for test data gathering which reduced testing workload by 50%.",
        "Designed, planned, and executed test cases for numerous projects, collectively worth millions of dollars",
      ],
      url: { demo: "", github: "" }
    },
  ],
  education: {
    school: "Indiana University Bloomington",
    major: "Computer Science",
    degree: "Bachelor of Science",
    gradYear: "2019",
  },
  achievements: [
    {
      company: "TMobile",
      role: "Software Engineer",
      title: "TMobile Rock star award",
      city: "Seattle, WA",
    },
  ],

  techStack: {
    languages: [
      "Javascript", "ReactJS", "NextJS", "NodeJS", "ExpressJS",
      "Typescript",
      "Python",
      "Java",
      "MongoDB",
      "HTML/CSS",
    ],
    tools: ["Git", "JIRA", "Figma"],
  },
  urls: {
    linkedin: "https://www.linkedin.com/in/adel-beitvashahi/",
    github: "https://github.com/AdelBeit",
    email: "mailto:adelbeitvashahi@email.com"
  }
};
