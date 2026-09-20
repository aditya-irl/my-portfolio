import { PersonalInfo, Project, SkillCategory, ExperienceItem, EducationItem, CertificationItem } from '../types/portfolio';

// =========================================================================================
// 👤 1. PERSONAL INFORMATION & SOCIAL / CONTACT LINKS
// Update your core information, email, LinkedIn, GitHub, and WhatsApp number here.
// =========================================================================================
export const personalInfo: PersonalInfo = {
  name: "ADITYA KUMAR",
  role: "Full Stack Developer & Java Developer",
  subRole: "Computer Science & Engineering Undergraduate (3rd Year)",
  location: "Greater Noida, India",

  // ✉️ Email (used in contact forms, copy buttons, mailto links, and resume footer)
  email: "Adityakumar23106@gmail.com",

  // 🔗 LinkedIn Profile URL
  linkedin: "https://linkedin.com/in/aditya-kumar-13984b31a",

  // 🐙 GitHub Profile URL (change this to your exact GitHub profile, e.g. "https://github.com/your-username")
  github: "https://github.com",

  // 📸 Instagram Profile URL
  instagram: "https://www.instagram.com/aaditya_irl_?stkn=dXB0NTd3dTZqM3dx",

  // 📱 WhatsApp Number (format: country code without '+' or spaces, e.g. "8865804386" for India +91)
  whatsapp: "8865804386",

  // 📞 Optional Direct Phone Number
  phone: "+91 98765 43210",

  headline: "Architecting Scalable Backend Systems & High-Impact Web Platforms",
  summary: "Motivated 3rd-year Computer Science & Engineering undergraduate with solid foundation in full-stack web engineering, Java development, and database architecture. Proven ability to build production-ready freelance web platforms and AI-driven automation utilities. Practical industry experience in Java backend development, agile collaboration, and web service deployments."
};

// =========================================================================================
// ⚡ 2. TECHNICAL SKILLS & COMPETENCIES
// Add, edit, or reorder technical skills, descriptions, and categories here.
// =========================================================================================
export const skillCategories: SkillCategory[] = [
  {
    id: "languages",
    title: "Programming Languages",
    description: "Core programming languages mastered for backend services, algorithms, and web applications",
    icon: "Code2",
    skills: [
      { name: "Java", iconName: "Coffee", level: "Core Language", description: "Object-oriented architectures, backend workflows, enterprise logic, data structures" },
      { name: "Python", iconName: "Python", level: "Programming Language", description: "Core algorithms, data analysis, automation scripts, and problem solving" },
      { name: "JavaScript (ES6+)", iconName: "FileCode", level: "Full Stack Language", description: "Modern asynchronous workflows, promises, DOM manipulation, ESNext syntax" },
      { name: "C", iconName: "Terminal", level: "Foundational Language", description: "Memory management fundamentals, procedural logic, algorithmic building blocks" },
      { name: "SQL", iconName: "Database", level: "Query Language", description: "Complex relational queries, indexing, schema design, transactional integrity" },
      { name: "HTML5", iconName: "Layout", level: "Semantic Markup", description: "Accessible hierarchy, SEO structuring, clean component templates" },
      { name: "CSS3", iconName: "Palette", level: "Modern Styling", description: "Responsive layouts, flexbox, grid, glassmorphism, animations" }
    ]
  },
  {
    id: "frameworks",
    title: "Frameworks & Web Engineering",
    description: "Modern frameworks powering full-stack architectures and performant web portals",
    icon: "Layers",
    skills: [
      { name: "React.js", iconName: "Atom", level: "Frontend Core", description: "Component-driven architecture, state hooks, reactive UI, virtual DOM optimization" },
      { name: "Node.js", iconName: "Server", level: "Runtime Engine", description: "Event-driven backend services, asynchronous I/O, micro-services and server scripts" },
      { name: "Express.js", iconName: "Cpu", level: "Backend Framework", description: "Modular REST APIs, middleware pipelines, routing, authentication layers" },
      { name: "RESTful APIs", iconName: "Network", level: "Integration", description: "Standardized HTTP endpoints, JSON payload handling, status code semantics" }
    ]
  },
  {
    id: "databases",
    title: "Databases & Storage",
    description: "Robust data architectures across relational and document stores",
    icon: "Database",
    skills: [
      { name: "MongoDB (NoSQL)", iconName: "Layers", level: "Document Store", description: "Flexible schema design, aggregation pipelines, Mongoose ODM integration" },
      { name: "MySQL / Relational DBMS", iconName: "Table", level: "Relational Store", description: "ACID compliance, normalized tables, foreign keys, optimized join queries" }
    ]
  },
  {
    id: "tools",
    title: "Tools & Platforms",
    description: "Industry-standard developer workflow tools and cloud deployment engines",
    icon: "Wrench",
    skills: [
      { name: "Git", iconName: "GitBranch", level: "Version Control", description: "Branching strategies, commit history, merge conflict resolution" },
      { name: "GitHub", iconName: "Github", level: "Collaboration", description: "Repository management, remote sync, PR reviews, CI/CD integrations" },
      { name: "Vercel", iconName: "Cloud", level: "Cloud Deployment", description: "Serverless web platform deployments, custom domains, instant previews" },
      { name: "VS Code", iconName: "Code", level: "Primary IDE", description: "Optimized environment, debugging tooling, extension workflows" },
      { name: "Postman", iconName: "Send", level: "API Testing", description: "Endpoint validation, payload verification, automated request suites" }
    ]
  },
  {
    id: "core-concepts",
    title: "Core Computer Science Concepts",
    description: "Theoretical and algorithmic pillars driving reliable software engineering",
    icon: "Brain",
    skills: [
      { name: "DSA (Data Structures & Algorithms)", iconName: "Binary", level: "Basic", description: "Arrays, Linked Lists, Trees, Graphs, Sorting, Searching, Complexity Analysis" },
      { name: "OOP / OOPS (Object-Oriented Programming)", iconName: "Boxes", level: "Basic", description: "Inheritance, Polymorphism, Encapsulation, Abstraction, SOLID principles" },
      { name: "Database Management Systems (DBMS)", iconName: "HardDrive", level: "Foundational", description: "Concurrency control, normalization (1NF-BCNF), transaction indexing" }
    ]
  }
];

// =========================================================================================
// 🚀 3. FEATURED PROJECTS & CASE STUDIES
// Add or update your live project links (liveUrl) and GitHub repository links (githubUrl) here.
// =========================================================================================
export const projects: Project[] = [
  {
    id: "slide-ai",
    title: "SlideAI – Automated Question-to-Slide Converter",
    tagline: "AI-powered utility reducing educator lecture slide preparation time by >70%",
    category: "AI & Utilities",
    type: "Freelance / Production",

    // 🔗 Links: Add your live website URL and GitHub repo link below
    liveUrl: "", // Optional: Add live URL when hosted (e.g. "https://slideai.app")
    githubUrl: "https://github.com/adityakumar/slide-ai", // Change to your GitHub repository URL

    description: "An AI-powered utility engineered to parse question papers, test documents, and complex study material, automatically segmenting items into cleanly formatted, ready-to-present slides.",
    highlights: [
      "Engineered an AI-powered utility that parses question papers and documents, auto-segmenting items into formatted slides.",
      "Designed specifically for digital board educators, reducing lecture slide preparation time by over 70%.",
      "Seamless client-side parsing paired with intelligent segmentation pipeline for structured educational slides.",
      "Production-ready deployment on Vercel with responsive interactive previews and export formatting."
    ],
    technologies: ["React.js", "Node.js", "AI Integration", "Vercel", "JavaScript (ES6+)"],
    metrics: ">70% Time Reduction for Educators",
    architectureDetails: {
      frontend: "React.js interactive UI with instant document preview and slide visualizer",
      backend: "Node.js processing pipeline with intelligent content segmenter",
      deployment: "Vercel cloud serverless deployment with edge caching",
      keyInnovation: "Automated OCR/text parsing into modular slide decks tailored for digital whiteboard presentations"
    },
    featured: true,
    accentColor: "from-sky-500 to-indigo-600"
  },
  {
    id: "smart-campus",
    title: "Smart Campus Web Notice Portal",
    tagline: "Centralized web circulars system replacing chaotic WhatsApp group messaging",
    category: "Full-Stack",
    type: "Freelance / College Project",

    // 🔗 Links: Add your live website URL and GitHub repo link below
    liveUrl: "", // Optional: Add live URL (e.g. "https://smart-campus-notice.vercel.app")
    githubUrl: "", // Optional: Add GitHub repository URL

    description: "A centralized, web-based circulars system built to eliminate fragmented communications and chaotic WhatsApp messaging across college departments, ensuring streamlined notification delivery.",
    highlights: [
      "Developed a centralized, web-based circulars system to replace chaotic WhatsApp group messaging for college departments.",
      "Implemented category-based filtering, pinned administrative notices, and structured notification channels for students.",
      "Engineered high-performance MongoDB schemas with Express.js REST APIs for rapid notice dispatch.",
      "Delivered an intuitive student portal with instantaneous real-time circular search and tag discovery."
    ],
    technologies: ["React.js", "Node.js", "MongoDB", "Express.js", "RESTful APIs"],
    metrics: "100% Centralized Notice Distribution",
    architectureDetails: {
      frontend: "React.js dynamic single page interface with instant category filtering",
      backend: "Express.js RESTful API handling notice payloads and priority sorting",
      database: "MongoDB document collection with multi-field indexing for circulars",
      keyInnovation: "Priority-pinned administrative broadcast pipeline replacing unorganized instant messaging groups"
    },
    featured: true,
    accentColor: "from-indigo-500 to-violet-600"
  },
  {
    id: "edtech-platform",
    title: "EdTech Institute Management Platform (ClassPlus Model)",
    tagline: "Full-scale coaching platform for course distribution, student tracking, and batch controls",
    category: "Full-Stack",
    type: "Freelance Project",

    // 🔗 Links: Add your live website URL and GitHub repo link below
    liveUrl: "", // Optional: Add live URL
    githubUrl: "", // Optional: Add GitHub repo URL

    description: "A comprehensive coaching and institute management web application designed on the ClassPlus model to facilitate digital course distribution, student analytics, batch management, and administrative workflows.",
    highlights: [
      "Built a comprehensive coaching management application facilitating course distribution, student tracking, and batches.",
      "Structured backend schemas to handle student progress, administrative controls, and class communication feeds.",
      "Implemented role-based administrative dashboards for instructors, students, and institute management.",
      "Optimized relational/document data models ensuring seamless handling of student attendance and course content distribution."
    ],
    technologies: ["React.js", "Node.js", "Express.js", "DBMS", "RESTful APIs", "Full-Stack Web App"],
    metrics: "Multi-Role Institute Management",
    architectureDetails: {
      frontend: "Modern React.js dashboard with role-based access for students and administrators",
      backend: "Node.js / Express.js modular service architecture with secure API endpoints",
      database: "Robust DBMS schema for batch scheduling, enrolled student tracking, and course materials",
      keyInnovation: "Unified portal unifying course delivery, student tracking, and administrative feeds into a single interface"
    },
    featured: true,
    accentColor: "from-emerald-500 to-teal-600"
  },
  {
    id: "electronic-store",
    title: "Electronic Store Mobile & Inventory Management System",
    tagline: "Real-time stock monitoring, automated billing, and sales analytics for retail enterprise",
    category: "Enterprise & Systems",
    type: "Commercial Project",

    // 🔗 Links: Add your live website URL and GitHub repo link below
    liveUrl: "", // Optional: Add live URL
    githubUrl: "", // Optional: Add GitHub repo URL

    description: "A robust commercial inventory management and retail operations software engineered for electronics retailers, enabling real-time stock monitoring, instant billing generation, and sales analytics.",
    highlights: [
      "Engineered inventory management software enabling real-time stock monitoring, billing, and sales analytics for retail.",
      "Built resilient backend business logic utilizing Java and JavaScript for rapid transaction execution.",
      "Constructed relational database tables with optimized queries for multi-item inventory tracking and low-stock alerts.",
      "Designed an intuitive checkout workflow reducing counter checkout friction for electronic goods."
    ],
    technologies: ["Java", "JavaScript", "Database Management (DBMS)", "SQL", "OOPs"],
    metrics: "Real-Time Stock & Sales Tracking",
    architectureDetails: {
      frontend: "JavaScript responsive retail billing interface and stock management panel",
      backend: "Java object-oriented backend workflow processing transactions and stock counts",
      database: "Relational database tracking product SKUs, supplier info, and transaction records",
      keyInnovation: "Synchronous stock reduction and sales invoice generation with real-time audit logging"
    },
    featured: true,
    accentColor: "from-amber-500 to-orange-600"
  },
  {
    id: "water-brand-website",
    title: "Bottled Water Brand Commercial Website & Inquiry System",
    tagline: "Production brand showcase & distributor order inquiry portal hosted on GoDaddy",
    category: "Commercial",
    type: "Commercial / Client Project",

    // 🔗 Links: Add your live GoDaddy website URL below
    liveUrl: "", // Optional: Add live client domain (e.g. "https://yourwaterbrand.com")
    githubUrl: "", // Optional: Add GitHub repo URL

    description: "A high-conversion commercial website and customer inquiry platform developed for a packaged drinking water enterprise, hosted on GoDaddy with dynamic product showcases and interactive lead capture forms.",
    highlights: [
      "Designed and deployed a responsive commercial brand showcase for a packaged drinking water enterprise hosted on GoDaddy.",
      "Built a functional contact and wholesale order inquiry form with input validation and instant customer feedback.",
      "Optimized for fast mobile rendering, high visual clarity, and search visibility across retail and bulk distribution buyers.",
      "Engineered clean client-side validation logic for bulk volume inquiries and distributor requests."
    ],
    technologies: ["HTML5", "CSS3", "JavaScript", "GoDaddy Hosting", "Custom Form System"],
    metrics: "Live Production Commercial Website",
    architectureDetails: {
      frontend: "Clean semantic HTML5 & modern CSS3 responsive design system",
      backend: "Custom form processing system connecting customer inquiries to business inboxes",
      deployment: "GoDaddy hosting infrastructure with domain routing and SSL security",
      keyInnovation: "Direct B2B/B2C wholesale inquiry pipeline integrated seamlessly into brand showcase"
    },
    featured: false,
    accentColor: "from-cyan-500 to-blue-600"
  }
];

// =========================================================================================
// 💼 4. WORK EXPERIENCE & INTERNSHIPS
// Update company names, roles, durations, and bullet points here.
// =========================================================================================
export const experiences: ExperienceItem[] = [
  {
    id: "skillnexis-java",
    role: "Java Developer Intern",
    company: "Skillnexis",
    duration: "2 Months",
    type: "Technical Internship",
    location: "Remote / Hybrid",
    points: [
      "Designed and implemented core Java backend modules and object-oriented architectures for application workflows.",
      "Constructed database queries and optimized data interaction logic to support scalable data storage and retrieval.",
      "Collaborated on code testing, debugging edge cases, and adhering to standard software engineering best practices."
    ],
    skills: ["Java", "Object-Oriented Programming (OOPs)", "SQL", "Relational DBMS", "Backend Architecture", "Debugging"]
  },
  {
    id: "edlernity-hr",
    role: "HR Operations Intern",
    company: "Edlernity",
    duration: "Internship",
    type: "Operations Internship",
    location: "Corporate Operations",
    points: [
      "Streamlined candidate evaluation pipelines by screening profiles and coordinating interview rounds with cross-functional teams.",
      "Maintained and managed recruitment tracker spreadsheets, ensuring accurate candidate record management and reporting."
    ],
    skills: ["Candidate Screening", "Pipeline Coordination", "Recruitment Tracking", "Cross-Functional Collaboration", "Operations"]
  }
];

// =========================================================================================
// 🎓 5. EDUCATION & ACADEMIC CREDENTIALS
// Update your university, colleges, schools, degrees, and graduation years here.
// =========================================================================================
export const educationList: EducationItem[] = [
  {
    id: "btech-aimt",
    degree: "Bachelor of Technology (B.Tech) in Computer Science and Engineering",
    institution: "Accurate Institute of Management and Technology",
    location: "Greater Noida, UP, India",
    duration: "2024 – 2028 (Expected)",
    status: "Currently in 3rd Year",
    highlights: [
      "Rigorous core curriculum in Data Structures, Algorithms, Object-Oriented Programming, and Database Systems.",
      "Active development of real-world freelance platforms, AI automation utilities, and enterprise projects."
    ]
  },
  {
    id: "senior-secondary",
    degree: "Senior Secondary (Class XII)",
    institution: "Green Valley Public School",
    location: "Dibiyapur, Auraiya, UP",
    duration: "Completed",
    status: "Completed",
    highlights: [
      "Concentration in Physics, Chemistry, and Mathematics (PCM) with strong analytical foundations."
    ]
  },
  {
    id: "secondary",
    degree: "Secondary (Class X)",
    institution: "RBSRS Public School",
    location: "Saurikh, Kannauj, UP",
    duration: "Completed",
    status: "Completed",
    highlights: [
      "Foundational secondary education with distinction in Science and Mathematics."
    ]
  }
];

// =========================================================================================
// 🏆 6. CERTIFICATIONS & CREDENTIAL VERIFICATION LINKS
// Add your live certificate verification URLs (linkUrl) and credential IDs here.
// =========================================================================================
export const certifications: CertificationItem[] = [
  {
    id: "python-hackerrank",
    title: "Python — HackerRank",
    issuer: "HackerRank",
    type: "Skill Verification & Problem Solving",
    technology: "Python",
    // 🔗 Verification Link: Paste your HackerRank certificate URL below
    linkUrl: "", // e.g. "https://www.hackerrank.com/certificates/your-python-id"
    description: "Verified problem-solving assessment certifying proficiency in Python core syntax, data structures, conditional control flows, and algorithmic logic.",
    badgeCode: "HR-VERIFIED-PYTHON",
    tags: ["Python", "Problem Solving", "HackerRank", "Algorithms"],
    verificationNote: "Verified Core Competency Assessment"
  },
  {
    id: "java-hackerrank",
    title: "Java — HackerRank",
    issuer: "HackerRank",
    type: "Skill Verification & Problem Solving",
    technology: "Java",
    // 🔗 Verification Link: Paste your HackerRank certificate URL below
    linkUrl: "", // e.g. "https://www.hackerrank.com/certificates/your-java-id"
    description: "Verified certification validating core Java fundamentals, object-oriented concepts, exception handling, data structures, and standard library algorithms.",
    badgeCode: "HR-VERIFIED-JAVA",
    tags: ["Java", "OOP", "Problem Solving", "HackerRank"],
    verificationNote: "Verified Core Competency Assessment"
  },
  {
    id: "sql-hackerrank",
    title: "SQL — HackerRank",
    issuer: "HackerRank",
    type: "Database Querying & Verification",
    technology: "SQL",
    // 🔗 Verification Link: Paste your HackerRank certificate URL below
    linkUrl: "", // e.g. "https://www.hackerrank.com/certificates/your-sql-id"
    description: "Verified relational database assessment validating proficiency in complex SQL queries, multi-table joins, aggregations, subqueries, and data filtering.",
    badgeCode: "HR-VERIFIED-SQL",
    tags: ["SQL", "Relational DBMS", "Database Queries", "HackerRank"],
    verificationNote: "Verified Core Competency Assessment"
  },
  {
    id: "jpmorgan-simulation",
    title: "Software Engineering Job Simulation",
    issuer: "J.P. Morgan Chase & Co. (Forage)",
    type: "Industry Simulation Experience",
    technology: "Software Engineering",
    // 🔗 Verification Link: Paste your Forage certificate URL below
    linkUrl: "", // e.g. "https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/..."
    description: "Completed practical engineering tasks covering interface development, live financial data feeds handling, and perspective analysis for enterprise software.",
    badgeCode: "JPMC-FORAGE-SWE-SIM",
    tags: ["Interface Development", "Live Data Feeds", "Financial Systems", "Perspective Analysis"],
    verificationNote: "Industry Simulation Completion"
  },
  {
    id: "aws-cloud-practitioner",
    title: "AWS Certified Cloud Practitioner / Cloud Foundational Training",
    issuer: "Amazon Web Services (AWS)",
    type: "Cloud Computing & Infrastructure",
    technology: "AWS Cloud",
    // 🔗 Verification Link: Paste your AWS certificate badge link below
    linkUrl: "", // e.g. "https://www.credly.com/badges/your-aws-badge-id"
    description: "Foundational training in AWS cloud architecture, compute services, storage infrastructure, security compliance, and deployment models.",
    badgeCode: "AWS-CLOUD-FOUNDATIONS",
    tags: ["Cloud Computing", "AWS", "Infrastructure", "Deployment Models", "Security"],
    verificationNote: "Cloud Architecture Foundations"
  }
];
