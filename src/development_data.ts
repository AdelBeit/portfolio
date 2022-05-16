export const SiteData = {
  name: "Adele Beitvashahi",
  role: "Software Engineer",
  site: "Adelbeit.com",
  description: "",
  imgPaths: {
    icons: {
      location: "",
      phone: "",
      email: "",
      linkedin: "",
      github: "",
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
      title: "bord",
      language: "ReactJS",
      time: { year: "2021", month: "feb" },
      description:
        "Track your favorite movies, shows and books with this secure, and responsive webapp. Powered by Auth0, AirtableDB. Built on JAMstack",
      url: "https://github.com/AdelBeit/bord",
    },
    {
      title: "Secured Webapp",
      language: "ExpressJS",
      time: { year: "2020", month: "aug" },
      description:
        "Secure webapp with native log-in functionality, uses JWT session tokens. Powered by MongoDB and PUGJS template engine.",
      url: "https://github.com/AdelBeit/JWT_Webapp/tree/master/restapiDB",
    },
    {
      title: "GroupMe Bot",
      language: "NodeJS",
      time: { year: "2019", month: "dec" },
      description:
        "Listens for a command and a caption in the chat. Then takes the caption and overlays it onto an image using Cloudinary. Then posts the image back to the chat.",
      url: "https://github.com/AdelBeit/Zero",
    },
    {
      title: "Object Classification",
      language: "Python",
      time: { year: "2018", month: "apr" },
      description:
        "Uses bag of words technique and a training image dataset to learn what objects look like, then uses the k-nearest neighbors algorithm to classify new images containing those objects.",
      url: "https://github.com/AdelBeit/Sandbox/tree/master/Rusted/Object%20Classification",
    },
  ],
  experience: [
    {
      company: "Ideal Auto Sale & Service",
      role: "Full Stack Developer",
      time: "2022",
      duties: [
        "Gather requirements, design, build, and deliver a fast and sleek landing page for an auto mechanic shop.",
        "Delivered the project on time.",
      ],
    },
    {
      company: "Cox Communications",
      role: "Software Engineer",
      time: "2020 - 2021",
      duties: [
        "Ran daily standup and facillitated discussions between stakeholders and developers.",
        "Turned requirements into clearly defined and uniformly formatted stories using JIRA.",
        "Refined and prioritized stories based on business needs and kept the backlog groomed.",
        "Developed a script to retrieve and format release notes in to a custom format.",
      ],
    },
    {
      company: "TMobile",
      role: "Software Engineer",
      time: "2019 - 2020",
      duties: [
        "Built and automated UI tests using Tricentis Tosca.",
        "Wrote and maintained Oracle MySQL scripts for test data gathering.",
        "Designed, planned, executed, and reported manual and automated test cases",
        "Reported and triaged bugs all the way to resolution.",
      ],
    },
  ],
  education: {
    school: "Indiana University Bloomington",
    major: "Computer Science",
    degree: "Bachelor of Science",
    gradYear: "2015 - 2019",
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
      "JavaScript (React, Next)",
      "Python",
      "Java",
      "MongoDB",
      "HTML/CSS",
    ],
    tools: ["Github", "JIRA"],
  },
};
