import { Project, Experience, Education, Profile } from "../types";
export type { Project, Experience, Education, Profile };

export const profile: Profile = {
  name: "Sumeet Kanhiya",
  tagline: "Systems Architect & Full-Stack Developer",
  location: "Karachi, Pakistan",
  bio: "I build distributed systems and high-throughput web applications using the PERN stack, Next.js, and AI integrations (Gemini API, Groq). No boilerplate — just resilient infrastructure and precise interfaces.",
  email: "sumeetkanhiya11@gmail.com",
  github: "https://github.com/sumeetkl11",
  linkedin: "https://www.linkedin.com/in/sumeet-kanhiya/",
};

export const projects: Project[] = [
  {
    id: "linkforge",
    title: "Linkforge",
    category: "AI · API Pipeline",
    tagline: "High-throughput autonomous web scraper & vector intelligence pipeline.",
    description: "URL redirection pipeline featuring fast Redis hash lookups, responsive Tailwind control panels, and transactional analytics.",
    techStack: ["React 19", "TypeScript", "Node.js", "PostgreSQL", "Socket.io", "Redis"],
    metrics: [
      { label: "URLs processed/day", value: "10k+" },
      { label: "P99 API latency", value: "<200ms" }
    ],
    liveUrl: "https://linkforge-mauve.vercel.app",
    repoUrl: "https://github.com/sumeetkl11/linkforge",
  },
  {
    id: "sock-io",
    title: "Sock.io",
    category: "Systems · WebRTC",
    tagline: "Peer-to-peer binary streaming engine with zero-allocation buffers.",
    description: "Bi-directional messaging hub built with native WebSocket topologies, heartbeat health monitors, and partitioned PostgreSQL rooms.",
    techStack: ["Node.js", "MongoDB", "WebRTC", "React"],
    metrics: [
      { label: "WebSocket sync", value: "<24ms P99" }
    ],
    repoUrl: "https://github.com/sumeetkl11/sock.io",
  },
  {
    id: "chefcraft",
    title: "ChefCraft",
    category: "Gemini API · Multimodal",
    tagline: "Multimodal sensory recipe synthesis engine generating real-time culinary paths.",
    description: "Automated meal scheduling pipeline executing Gemini API prompt matrices. Backed by PostgreSQL query caches, Express REST endpoints, and dynamic macronutrient rebalancing.",
    techStack: ["Gemini 1.5 Pro", "Next.js", "PostgreSQL", "Tailwind CSS"],
    metrics: [
      { label: "REST Endpoints", value: "25+" },
      { label: "Generation latency", value: "sub-2s" }
    ],
    liveUrl: "https://chef-craft.vercel.app",
    repoUrl: "https://github.com/sumeetkl11/chefcraft",
  }
];

export const experiences: Experience[] = [
  {
    id: "chefcraft-backend",
    role: "Backend Developer",
    company: "ChefCraft (Production Project)",
    period: "Mar 2025 — Jun 2025",
    description: "Engineered 25+ RESTful API endpoints using Node.js & Express.js. Integrated Google Gemini API with structured prompt design and multi-tier model fallbacks, achieving deterministic JSON output schemas with sub-2s generation latency.",
    tags: ["Node.js", "Express", "Gemini API", "PostgreSQL"],
  },
  {
    id: "freelance",
    role: "Freelance Web Developer",
    company: "Independent Clients",
    period: "Dec 2024 — Present",
    description: "Delivered 2+ end-to-end full-stack web applications for clients across SaaS, e-commerce, and content platforms using Agile/Scrum sprint cycles. Architected performance-optimized, responsive frontends with React and Tailwind CSS.",
    tags: ["React", "Tailwind CSS", "Full-Stack", "Agile"],
  }
];

export const education: Education[] = [
  {
    id: "duet-bs",
    degree: "B.S. in Computer Science",
    institution: "Dawood University of Engineering & Technology (DUET), Karachi",
    period: "Nov 2024 — Dec 2028 (Expected)",
    description: "Rigorous foundation in relational database management systems (RDBMS), multithreading, concurrency control, and deterministic algorithm optimization. Core Coursework: Database Management Systems, Software Engineering, Computer Networks, Data Structures & Algorithms.",
  }
];

export const techMarqueeItems = [
  "PERN Stack", "Next.js 15", "React 19", "TypeScript", "Node.js", 
  "PostgreSQL", "Express.js", "REST APIs", "Full-Stack", "Gemini API", 
  "Groq", "Kotlin", "Jetpack Compose", "WebSockets", "Redis", 
  "Tailwind CSS", "Framer Motion", "DUET · Karachi"
];
