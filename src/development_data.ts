export const SiteData = {
  name: "Adele Beitvashahi",
  github: "github.com/adelbeit",
  linkedin: "linkedin.com/in/adel-beitvashahi",
  email: "adelbeitvashahi@gmail.com",
  city: "Seattle, WA",
  phone: "(812)  360 - 6898",
  site: "adelbeit.com",
  role: "Frontend Engineer",
  description:
    "Frontend Engineer with a passion for creating software that solves everyday problems. Demonstrated proficiency and ownership of the full software development lifecycle to solve complex business problems like lead generation. A curious and consistent frontend developer that is quick to adapt and master the latest technology.",
  imgPaths: {
    icons: {
      city: "./icons/location.png",
      phone: "./icons/phone.png",
      email: "./icons/email.png",
      linkedin: "./icons/linkedin.png",
      github: "./icons/github.png",
      favicon: "./icons/star.png.",
    },
  },
  products: [
    {
      title: "Drum & Keys",
      language:
        "NextJS, React, ToneJS, Socket.io, Docker, Digital Ocean, Figma, Git",
      time: { year: "2022", month: "mar" },
      description: [
        "Designed and implemented a progressive webapp with offline caching capabilities, that enables 10+ concurrent users in a room to jam out with virtual instruments using ToneJS.",
        "Authored a real time Web Socket API to host many users in a room, using Docker for continous delivery to Digital Ocean.",
      ],
      url: {
        demo: "https://dnk.adelbeit.com/home?roomID=1",
        github: "https://github.com/AdelBeit/dnk",
      },
    },
    {
      title: "Auto Repair Shop Website",
      url: {
        demo: "https://www.idealauto.co/",
        github: "https://github.com/AdelBeit/Client_IdealAuto",
      },
      language: "NextJS, React, Figma, Git",
      time: { year: "2022", month: "mar" },
      description: [
        "Designed and implemented a responsive JAM stack lead generation portal for an auto mechanic shop that generated a 150% increase in revenue within 2 months.",
        "Designed the website in Figma and ensured client is satisfied with the design before implementation.",
      ],
    },
  ],
  experience: [
    {
      company: "Cox Communications (Capgemini)",
      role: "Scrum Master",
      time: "2020 - 2021",
      duties: [
        "Authored a tool that standardized the list of release changes by streamlining their delivery to respective stakeholders, eliminating the task from project manager's to do list.",
        "Kept developers on track by ensuring all business requirements were well defined and formatted on JIRA for a multimillion dollar project.",
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
    degree: "Bachelor of Science in Computer Science, May 2019. GPA: 3.2",
    school: "Indiana University",
    courses: [
      "Data Structures",
      "Computer Science",
      "Software Systems",
      "Intro to Computer Vision",
      "Database Concepts",
      "Principles of Machine Learning",
      "Intro to Artificial Intelligence",
      "Fundementals of Computing",
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
      "TMobile Rockstar award; Recognized for being an SME and leading envrionment readiness functional testing efforts for QLAB07 among a team of 5.",
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
      "Java",
      "MongoDB",
      "PostgreSQL",
      "HTML",
      "CSS",
    ],
    tools: ["Git", "JIRA", "Figma", "Vercel", "AWS", "Netlify", "Docker"],
  },
  urls: {
    linkedin: "https://www.linkedin.com/in/adel-beitvashahi/",
    github: "https://github.com/AdelBeit",
    email: "mailto:adelbeitvashahi@email.com",
  },
};
