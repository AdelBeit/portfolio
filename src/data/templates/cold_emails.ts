export const templates = {
  early_career: 
  `Hello {{name}},

  I'm Adel Beitvashahi, I'm a software engineer and {{company}} has multiple job openings. What do I have to do to get an interview?
  
  My Background: 
  - Proficient in React and frontend development.
  - Recently finished a smart autofill project. it scrapes a form on a website and fills it out based on a given context (i.g. background info for a job form).
   - - Uses: Python, Langchain, Nodejs, and AI.
  - I played a significant role in my team landing 1st place in a hackathon last year.
  - Excellent with Git, Figma, and Docker.
  - B.S. in Computer Science.
  - And more...
  
  I'm a generalist and I'm looking at a couple of positions at {{company}}, I've heard good things about the culture from a friend that works there currently.
  Let me know if you want me to send you the job links I'm looking at.
  
  Stay smiling,
  The Finest Codesmith in the Realm
  
  
  Links:
  https://adelbeit.com
  https://github.com/adelbeit`,
  experienced: 
  `Hello {{name}},

  I'm Adel Beitvashahi, I'm a software engineer and {{company}} has multiple job openings. What do I have to do to get an interview?
  
  My Background: 
  - 3+ years of experience.
  - Proficient in React and frontend development.
  - Recently finished a smart autofill project. it scrapes a form on a website and fills it out based on a given context (i.g. background info for a job form).
   - - Uses: Python, Langchain, Nodejs, and AI.
  - I played a significant role in my team landing 1st place in a hackathon last year.
  - Excellent with Git, Figma, and Docker.
  - B.S. in Computer Science.
  - And more...
  
  I'm a generalist and I'm looking at a couple of positions at {{company}}, I've heard good things about the culture from a friend that works there currently.
  Let me know if you want me to send you the job links I'm looking at.
  
  Stay smiling,
  The Finest Codesmith in the Realm
  
  
  Links:
  https://adelbeit.com
  https://github.com/adelbeit`,
  apply: function(template:string , vars:{[key:string]:string}) {
    if(!this[template]) throw new Error(`Template ${template} does not exist.`);
    
    return Object.keys(vars).reduce((str,key) => {
      return str.replaceAll(`{{${key}}}`,vars[key]);
    }, this[template]);
  }
}