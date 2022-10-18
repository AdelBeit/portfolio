export const SiteData = {
  name: "Adele Beitvashahi",
  github: "https://github.com/adelbeit",
  linkedin: "https://linkedin.com/in/adel-beitvashahi",
  email: "adelbeitvashahi@gmail.com",
  city: "Seattle, WA",
  phone: "(812)  360 - 6898",
  site: "https://adelbeit.com",
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
    },
  },
  products: [
    {
      title: "Drum & Keys",
      language: "NextJS",
      time: { year: "2022", month: "mar" },
      description: [
        "Designed and implemented a progressive webapp with offline caching capabilities, that enables 10+ concurrent users in a room to jam out with virtual instruments using ToneJS, React, and Nextjs.",
        "Authored a real time Web Socket API to host many users in a room, using Docker for continous delivery to Digital Ocean.",
      ],
      url: {
        demo: "https://adelbeit.com/dnk",
        github: "https://github.com/AdelBeit/dnk",
      },
    },
    {
      title: "Auto Sale & Repair Website",
      url: {
        demo: "https://www.idealauto.co/",
        github: "https://github.com/AdelBeit/Client_IdealAuto",
      },
      language: "NextJS",
      time: { year: "2022", month: "mar" },
      description: [
        "Designed and implemented a responsive JAM stack lead generation portal for an auto mechanic shop that generated a 150% increase in revenue within 2 months.",
        "Designed the website in Figma and ensured client is satisfied with the design before implementation.",
      ],
    },
  ],
  experience: [
    {
      company: "Cox Communications",
      role: "Scrum Master",
      time: "2020 - 2021",
      duties: [
        "Kept developers on track by ensuring all business requirements were well defined and formatted on JIRA for a multimillion dollar project.",
        "Authored a tool that standardized the list of release changes by streamlining their delivery to respective stakeholders, eliminating the task from project manager's to do list.",
      ],
      url: { demo: "", github: "" },
    },
    {
      company: "TMobile",
      role: "Quality Engineer",
      time: "2019 - 2020",
      duties: [
        "Built and automated UI tests using Tricentis Tosca for several projects worth $10+ million.",
        "Created and maintained Oracle MySQL scripts for test data gathering which reduced testing workload by 50%.",
        "Spearheaded the design, and execution of test cases by mentoring diverse teams of quality engineers resulting in 100% test coverage of projects collectively worth upwards of $100 million.",
      ],
      url: { demo: "", github: "" },
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
      "Javascript",
      "ReactJS",
      "NextJS",
      "NodeJS",
      "ExpressJS",
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
    email: "mailto:adelbeitvashahi@email.com",
  },
};
