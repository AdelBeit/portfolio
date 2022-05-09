export const SiteData = {
  name: "Adele Beitvashahi",
  role: "Software Engineer",
  site: "Adelbeit.com",
  description: "",
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
      company: "Indiana University Information Technology Services",
      role: "Tech Consultant",
      time: "2018 - 2019",
      duties: [
        "Addressed students' questions regarding technology services, and printing at IU (i.e. IUWare).",
        "Entrusted with keys for multiple labs with $10,000+ in equipment.",
        "Troubleshoot broken lab equipment and file reports when necessary.",
      ],
    },
    {
      company: "Kroger",
      role: "Cashier",
      time: "2017",
      duties: [
        "Scanned and interacted with 100+ customers a day in a fast, friendly, and efficient manner.",
        "Handled upwards of $1000 of cash per day, and was in charge of emptying the self checkout tills at the end of the day.",
      ],
    },

    {
      company: "Steak and Shake",
      role: "Grill Cook",
      time: "2016",
      duties: [
        "Output 100+ orders per day, working on multiple different orders simultaneously, in a fast and precise manner maximizing custumer satisfaction.",
        "Operated high-volume cooking equipment such as grills and deep fryers in a fast paced environment.",
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
      company: "Kroger",
      role: "Cashier",
      title: "Top 10 fastest cashier in the district",
      city: "Bloomington, IN",
    },
  ],
  skills: [
    "Multitasking",
    "Communication",
    "Teamwork",
    "Quick Study",
    "Punctual",
  ],
  techStack: ["Javascript"],
};

export type SiteData = typeof SiteData;
