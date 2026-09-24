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
    id: "faultflow",
    title: "FaultFlow",
    category: "DISTRIBUTED SYSTEMS · BROKER",
    tagline: "Resilient Multi-Tenant Webhook Orchestration & Telemetry Gateway.",
    description: "High-throughput webhook delivery engine featuring sub-25ms API ingress and atomic Redis SETNX idempotency. Coordinates 20-worker BullMQ clusters with HMAC-SHA256 signatures, exponential jitter backoff, DLQ rate throttling, and live SSE telemetry.",
    techStack: ["Node.js", "Express", "BullMQ", "Redis", "PostgreSQL", "SSE", "Zod"],
    metrics: [
      { label: "Ingress Latency", value: "<25ms" },
      { label: "DLQ Remediation", value: "50 req/s" }
    ],
    repoUrl: "https://github.com/sumeetkl11/FaultFlow_WebHook",
  },
  {
    id: "chefcraft",
    title: "ChefCraft",
    category: "GEMINI API · MULTIMODAL",
    tagline: "Multimodal recipe synthesis engine generating real-time culinary paths.",
    description: "AI-driven meal-planning platform leveraging Google Gemini API structured prompt matrices to synthesize tailored dietary regimens in sub-2 seconds. Features 25+ Express REST endpoints with PostgreSQL query caching, slashing retrieval latency by 25%.",
    techStack: ["Gemini 1.5 Pro", "Next.js", "Express.js", "PostgreSQL", "Tailwind CSS"],
    metrics: [
      { label: "Generation Latency", value: "<2s" },
      { label: "Retrieval Speedup", value: "+25%" }
    ],
    liveUrl: "https://chef-craft.vercel.app/",
    repoUrl: "https://github.com/sumeetkl11/ChefCraft",
  },
  {
    id: "linkforge",
    title: "Linkforge",
    category: "COLLABORATION · AI PIPELINE",
    tagline: "Modular team collaboration ecosystem with real-time sync and AI sprint planning.",
    description: "4-module workspace unifying team chat, Kanban boards, project wikis, and member directories. Scaled across 500+ concurrent connections via Socket.io and Redis pub/sub, integrating the Gemini API for intelligent sprint planning and task prioritization.",
    techStack: ["React 19", "TypeScript", "Node.js", "PostgreSQL", "Socket.io", "Redis", "Gemini API"],
    metrics: [
      { label: "Concurrent Scale", value: "500+ users" },
      { label: "Integrated Modules", value: "4 suites" }
    ],
    liveUrl: "https://linkforge-mauve.vercel.app/",
    repoUrl: "https://github.com/sumeetkl11/Linkforge",
  },
  {
    id: "sock-io",
    title: "Sock.io",
    category: "WEBRTC · REAL-TIME",
    tagline: "Peer-to-peer binary streaming engine and real-time messaging hub.",
    description: "Full-stack communication suite combining low-latency WebSocket messaging with WebRTC peer-to-peer audio calls and STUN NAT traversal. Backed by MongoDB Atlas, a Redis adapter for multi-instance socket mapping, and IndexedDB for offline-first message queues.",
    techStack: ["React 19", "Node.js", "Socket.io", "WebRTC", "MongoDB", "Redis", "PWA"],
    metrics: [
      { label: "WebSocket Sync", value: "<24ms P99" },
      { label: "Concurrent Scale", value: "500+ users" }
    ],
    liveUrl: "https://sock-io.onrender.com/",
    repoUrl: "https://github.com/sumeetkl11/Sock.io",
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
  "Groq", "Git & GitHub", "Docker", "WebSockets", "Redis", 
  "Tailwind CSS", "Framer Motion", "DUET · Karachi"
];

export const katanaSkills = [
  { id: "typescript", name: "TypeScript", color: "#3178C6" },
  { id: "nextjs",     name: "Next.js",    color: "#E2E8F0" },
  { id: "postgresql", name: "PostgreSQL", color: "#336791" },
  { id: "react",      name: "React",      color: "#61DAFB" },
  { id: "nodejs",     name: "Node.js",    color: "#6BBF59" },
  { id: "redis",      name: "Redis",      color: "#EF4444" },
  { id: "gemini",     name: "Gemini API", color: "#8B5CF6" },
  { id: "websockets", name: "WebSockets", color: "#06B6D4" },
  { id: "express",    name: "Express.js", color: "#EAB308" },
  { id: "git",        name: "Git & GitHub", color: "#F05032" },
];
