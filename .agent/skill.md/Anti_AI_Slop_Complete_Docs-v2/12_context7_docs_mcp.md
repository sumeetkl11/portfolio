# Slide 2: CONTEXT7 MCP — Latest Documentation, Zero Hallucinations

> **Source**: Slide 2 from [@web_pros on Instagram](https://www.instagram.com/web_pros/p/DbS_Ni8jdZp/?img_index=1)  
> **Headline**: **"CONTEXT7: Latest Documentation. Zero Hallucinations."**  
> **Featured Libraries in Image**: React (`useState`), Next.js App Router v16 (`generateMetadata`), Tailwind CSS (`Flexbox`), Supabase (`createClient`), Shadcn/UI, Prisma

---

## 1. What is Context7 MCP & Why It Exists

### The Core Problem: LLM Knowledge Cutoffs & Hallucinations
Standard AI models (like ChatGPT or older Claude/Gemini checkpoints) are trained on snapshots of the web from months or years ago. In fast-moving web ecosystems:
- **Next.js**: The model often generates outdated Pages Router code (`getServerSideProps`) instead of modern Server Components or App Router (`generateMetadata`, server actions).
- **Tailwind CSS**: Model writes invalid or deprecated utility classes.
- **Supabase / Prisma / Shadcn**: Model uses deprecated client initialization patterns or non-existent props.

### What Context7 MCP Does:
**Context7** is an MCP server that acts as a live, real-time documentation search hub (`Search latest docs [⌘K]`). 
Instead of hallucinating code syntax from training weights, Antigravity queries Context7 in the background to fetch:
- The exact API reference for the latest framework version.
- Verified, up-to-date copy-pasteable code snippets (e.g., App Router v16 page templates, modern `createClient` patterns).
- Zero deprecated methods.

---

## 2. Guide to Setup & How to Use in Antigravity

### Step 1: Add to `mcp_config.json`
Add the documentation hub server to your `.agents/mcp_config.json` (or global config):

```json
{
  "mcpServers": {
    "context7": {
      "command": "npx",
      "args": ["-y", "context7-mcp@latest"]
    }
  }
}
```

*(Alternative / Open Source Equivalents if using official docs MCPs)*:
```json
{
  "mcpServers": {
    "dev-docs": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-fetch"]
    }
  }
}
```

### Step 2: How to Use in Antigravity Prompting
You don't need to specify documentation URLs manually. Simply tell Antigravity to reference current docs:

- **Next.js App Router**:
  > *"Create a dynamic dashboard page using Next.js 15/16 App Router. Use Context7 to fetch the latest `generateMetadata` and Server Component conventions so no deprecated syntax is used."*

- **Supabase Client**:
  > *"Setup Supabase authentication using the latest SSR client package `@supabase/ssr`. Query Context7 for the current `createClient` cookie helper implementation."*

- **Tailwind & Shadcn**:
  > *"Check the latest Shadcn/UI docs via Context7 and generate an accessible command-palette modal matching modern Radix UI primitives."*

---

## 3. Expert Advice & Suggestions for this Slide

> [!IMPORTANT]
> **1. The "Zero Hallucination" Rule for Modern Frameworks**  
> Never let the AI guess framework code for tools that updated recently (Next.js 15+, Tailwind v4, React 19 Actions). Always instruct Antigravity:  
> *"Before writing this module, consult Context7 to verify the current API signature for [Library]."*

> [!TIP]
> **2. Preserving Context Window Tokens**  
> Do not ask Context7 to dump entire manual pages into your chat. Instead, prompt the agent to search for **specific method signatures** (e.g., `generateMetadata API`, `useOptimistic React 19 example`). This keeps token consumption minimal and responses fast.

> [!TIP]
> **3. Ideal Stack to Pair with Context7**  
> Context7 is most valuable when you are #vibecoding with the bleeding-edge stack shown in the image:
> - **Frontend**: Next.js App Router + React 19 + Tailwind CSS
> - **Component Library**: Shadcn/UI
> - **Backend & DB**: Supabase + Prisma ORM
> With live docs piped in, Antigravity acts as if it was trained yesterday on the exact version you are running.

---

## Navigation
- Return to **[Documentation Series Table of Contents](file:///d:/coedes/no%20ai%20slop%20with%20design%20STUDY/mcp_docs/README.md)**
- Next: **[Slide 3: Playwright MCP (Browser Automation)](file:///d:/coedes/no%20ai%20slop%20with%20design%20STUDY/mcp_docs/04_chrome_devtools_and_playwright_mcp.md)**
