export const SiteData = {
  name: "Adele Beitvashahi",
  github: "github.com/adelbeit",
  linkedin: "linkedin.com/in/adel-beitvashahi",
  email: "adelbeitvashahi@gmail.com",
  city: "Seattle, WA",
  phone: "(812) 360 - 6898",
  portfolio: "adelbeit.com",
  role: "Frontend Engineer",
  objective:
    "After earning my BS in CS in 2019, I worked as a Scrum Master and Quality Engineer. Exposing me to various aspects of the SDLC process, and allowing me to develop a comprehensive understanding of it as a developer. Meanwhile, I also honed my development and design skills through working on side projects which can be found on my Github.",
  products: [
    {
      title: "Jamroom",
      language:
        "NextJS, Typescript, React, ToneJS, Socket.io, Docker, Digital Ocean",
      time: { year: "2022", month: "mar" },
      description: [
        "Designed and implemented a progressive webapp with offline caching capabilities, that enables 10+ concurrent users in a room to jam out with virtual instruments using ToneJS.",
        "Authored a real-time Web Socket API to host many users in a room, using Docker for continuous delivery to Digital Ocean.",
      ],
      url: {
        demo: "https://jam.adelbeit.com/home?roomID=1",
        github: "https://github.com/AdelBeit/jamroom",
      },
    },
    {
      title: "Portfolio",
      url: {
        demo: "https://adelbeit.com/",
        github: "https://github.com/AdelBeit/portfolio",
      },
      language: "NextJS, React, Typescript, Figma",
      time: { year: "2023", month: "feb" },
      description: [
        "Designed and implemented a responsive, and interactive landing page using NextJS, ReactJS and Typescript. The code and design both follow atomic design principles and the content is centralized in one file, making this a template that can be easily modified and extended.",
      ],
    },
    {
      title: "Lead Generation Site",
      url: {
        demo: "https://www.idealauto.co/",
        github: "https://github.com/AdelBeit/Client_IdealAuto",
      },
      language: "NextJS, React, Figma",
      time: { year: "2022", month: "mar" },
      description: [
        "Designed and implemented a responsive JAM stack lead generation portal for an auto mechanic shop that generated a 150% increase in revenue within 2 months.",
      ],
    },
  ],
  experience: [
    {
      company: "Cox Communications (Capgemini)",
      role: "Scrum Master",
      time: "2020 - 2021",
      duties: [
        "Authored a tool that standardized the list of release changes by streamlining their delivery to respective stakeholders, eliminating the task from the project manager's to-do list.",
        "Facilitated Scrum meetings, managed project tasks, and tracked progress for multimillion-dollar projects using Agile methodology.",
        "Communicated project status to stakeholders, including teams, clients, and executive management, and removed impediments to project success.",
      ],
      url: { demo: "", github: "" },
    },
    {
      company: "TMobile (Capgemini)",
      role: "Quality Engineer",
      time: "2019 - 2020",
      duties: [
        "Spearheaded the design, and execution of test cases by mentoring diverse teams of quality engineers resulting in 100% test coverage of projects collectively worth upwards of $100 million.",
        "Built and automated UI tests using Tricentis Tosca for several projects worth $10+ million.",
        "Created and maintained Oracle MySQL scripts for test data gathering which reduced testing workload by 50%.",
      ],
      url: { demo: "", github: "" },
    },
  ],
  education: {
    city: "Bloomington, IN",
    degree: "Bachelor of Science in Computer Science, GPA: 3.2",
    school: "Indiana University",
    courses: [
      "Data Structures",
      "Computer Science",
      "Software Systems",
      "Intro to Computer Vision",
      "Database Concepts",
      "Principles of Machine Learning",
      "Intro to Artificial Intelligence",
      "Fundamentals of Computing",
      "Autonomous Robotics",
    ],
    year: { start: "Fall 2015", end: "May 2019" },
  },
  achievements: {
    company: "TMobile",
    role: "Software Engineer",
    title: "TMobile Rock star award",
    city: "Seattle, WA",
    award:
      "TMobile Rockstar award; Recognized for being an SME and leading environment readiness functional testing efforts.",
  },
  techStack: {
    languages: [
      "Javascript",
      "Typescript",
      "ReactJS",
      "NextJS",
      "NodeJS",
      "ExpressJS",
      "Python",
      "MongoDB",
      "PostgreSQL",
      "HTML/CSS",
      "CSS",
    ],
    tools: ["Git", "JIRA", "Figma", "Vercel", "AWS", "Netlify", "Docker"],
  },
  urls: {
    linkedin: "https://www.linkedin.com/in/adel-beitvashahi/",
    github: "https://github.com/AdelBeit",
    email: "mailto:adelbeitvashahi@email.com",
    portfolio: "https://adelbeit.com",
  },
};
