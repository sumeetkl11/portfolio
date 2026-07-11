# YC Product Lead Review — Sumeet Kanhiya Portfolio
> Reviewed: July 2026 | Verdict: **Generic student project. Needs a complete messaging overhaul.**

---

## The Instant Verdict (10-second test)

A hiring manager lands on your site. Here's what they read in the hero:

> *"Full Stack Developer specializing in the PERN stack and scalable web architectures."*

That sentence describes **every** junior dev's LinkedIn. There is no hook, no proof, no differentiation. You have 8 seconds. You wasted them.

---

## 🔴 CRITICAL FAILURES — Fix These First

### 1. The README.md is an active embarrassment

**Current:**
```
# portfolio
This is a frontend for a portfolio website.
## Installation
1. Clone the repository.
2. Run `npm install` to install the dependencies.
```

**The problem:** This is the default boilerplate Next.js text. You didn't even change the description. A YC engineer who clicks your GitHub sees this and immediately closes the tab. This README is telling them *you don't care about your own work.*

**Fix it:** Write a README that reads like a product page — what the portfolio IS, the architecture (Next.js 15 + Edge API + Neon PostgreSQL + Express backend), what's technically interesting (WebGL 3D canvas, terminal contact mode, print-optimized resume renderer), and how to run it locally.

---

### 2. You claim Android development. It does not exist anywhere.

- Not in the hero tagline.
- Not in the projects section (zero Android projects shown).
- It's buried as a **one-line bullet in a "Certifications & Core Competencies" section** that reads: *"Hands-on experience building production-grade Android apps using Kotlin, Jetpack Compose, and Firebase."*

This is the **worst possible way** to make a claim. "Hands-on experience" with zero code to show is a red flag, not a credential. Either:
1. **Ship an Android project** (even a small one) and add it to the Projects section with a GitHub link, OR
2. **Remove the claim entirely** — it currently hurts you by making you look like you're padding.

If you genuinely have Android work, show a screenshot, a Play Store link, or a GitHub repo. Nothing else counts.

---

### 3. Your projects are not projects — they're descriptions

**Tastebuds AI:** "An intelligent meal-planning platform that generates personalized full-day meal plans..." — this is marketing copy, not engineering proof. A senior engineer reading this asks: *What was the schema for storing meal plans? How did you handle Gemini hallucinations and schema violations? What's your token budget strategy? What's the p95 latency of a generation call?*

**SocialConnect:** "Redis pub/sub for horizontal scaling" — great claim. But where's the proof? No architecture diagram, no mention of how many concurrent connections were tested, no mention of message persistence strategy. This is a sentence, not evidence.

**Linkforge:** "sub-25ms redirect latency" — this is actually your best concrete claim. Lead with the number. But then explain *how* — Next.js Edge runtime + cold start mitigation + PostgreSQL connection pooling via Neon.

**Fix:** Each project card needs 1–2 **engineering specifics** that prove depth. Not what the app does — what was *hard* and how you solved it.

---

### 4. The backend is a single file with 2 endpoints

You present yourself as a full-stack PERN developer. Your backend is:
- `index.ts`: 60 lines, 2 routes (`GET /api/health`, `POST /api/messages`)
- `db.ts`: 20 lines of connection boilerplate
- `schema.sql`: 4 tables (users, preferences, meal_plans, messages — but none are actually used by these routes)

The schema is for Tastebuds, but the backend only handles contact form submissions. **The PERN backend for your portfolio is a contact form mailer.** That's not a backend — that's a serverless function. The fact that you set up `express-rate-limit`, `helmet`, and `cors` is good hygiene, but it doesn't demonstrate PERN depth.

**Fix:** Either make the backend do something meaningful (serve your blog posts, track analytics, expose a project view counter with PostgreSQL) OR clearly separate it and don't present it as a centerpiece.

---

### 5. "Freelance Web Developer — Independent Clients" is vague and unverifiable

- *"Deliver end-to-end PERN stack web applications for clients across e-commerce, SaaS, and content platforms"* — Which clients? What did you build? What was the result?
- If clients are confidential, say *"Delivered 3 client projects (NDA)"* and give domain/category.
- Listing WordPress/WooCommerce work in the same bullet as PERN stack development makes you look junior. These are not the same tier of work.

**Fix:** Either name a specific outcome ("Rebuilt checkout flow for a Karachi-based e-commerce client, reducing cart abandonment by 18%") or remove the WordPress line entirely if you're positioning as a PERN developer.

---

## 🟡 POSITIONING PROBLEMS

### 6. "PERN Stack" is not a brand differentiator

Everyone says PERN. What you actually have that's interesting:
- WebGL 3D backgrounds via Three.js/React Three Fiber — on a **portfolio site**. That's a flex.
- A **terminal-mode contact form** that simulates a bash shell. That's memorable.
- A **print-optimized resume renderer** built in React (jspdf + html2canvas). That's genuinely clever.
- Edge runtime URL shortener with sub-25ms latency. Concrete and impressive.

**None of these are in your hero.** Your hero says "PERN stack" while your site *is demonstrating* WebGL, real-time terminal UX, and Edge computing. Lead with what you've actually *built*, not the acronym.

**Suggested hero rewrite:**
> *"I build things that are fast, real-time, and memorable — from WebSocket platforms to Edge-deployed APIs. Currently available for full-stack roles."*

---

### 7. "Currently open to opportunities" is the softest possible CTA

Your meta description says it. Your hero CTA says "View My Work" / "Get in Touch." These are passive. A developer who's confident in their work says something specific.

**Fix:** Change the CTA to something with intent:
> *"Available for full-stack or backend roles — let's build something."*  
> Or: *"Open to SDE roles starting [month]."*

---

### 8. Timeline entry "Tastebuds AI Initiative" is made up

You're listing "Tastebuds AI Initiative" as the organization under your own personal project. An employer checking this sees a company name that doesn't exist. This isn't padding — it's confusing at best, deceptive at worst.

**Fix:** Call it what it is: *"Personal Project / Freelance"* and let the technical work speak.

---

## 🟢 WHAT'S ACTUALLY GOOD (Keep These)

- **Code quality is solid.** Framer Motion stagger animations, `useReducedMotion` for accessibility, proper `aria-label` on all interactive elements, Zod validation on the contact form, `helmet` + rate limiting on the backend. This is not a lazy dev.
- **Three typography variables (Space Grotesk + Syne + JetBrains Mono).** Cohesive, intentional design system. Looks senior.
- **Terminal contact mode.** This is memorable and genuinely shows off your personality. Keep it. Make it more prominent.
- **Print-optimized resume (`ResumeClient.tsx`).** 17KB of carefully crafted print CSS with `@media print` overrides — this is the kind of detail that gets noticed. Put a note about it somewhere.
- **`GITHUB_USERNAME` constant bug:** You have `GITHUB_USERNAME = 'sumeetkanhiya'` but `GITHUB_URL = 'https://github.com/sumeetkl11'` — the username and URL don't match. Fix this before sharing.

---

## 🎯 Priority Fix List (Ordered)

| # | Fix | Impact | Effort |
|---|-----|--------|--------|
| 1 | Rewrite the README.md completely | 🔴 Critical | Low |
| 2 | Either ship an Android project or remove the Android claim | 🔴 Critical | High |
| 3 | Fix the `GITHUB_USERNAME` ≠ `GITHUB_URL` mismatch | 🔴 Critical | 5 min |
| 4 | Add 1–2 engineering specifics to each project description | 🔴 Critical | Medium |
| 5 | Rewrite the hero tagline — cut "PERN stack", add something specific | 🟠 High | Low |
| 6 | Remove "Tastebuds AI Initiative" as a fake org name | 🟠 High | Low |
| 7 | Cut WordPress/WooCommerce from the primary experience bullet | 🟠 High | Low |
| 8 | Change "open to opportunities" to a specific, confident CTA | 🟡 Medium | Low |
| 9 | Add architecture depth to SocialConnect (connection count, persistence) | 🟡 Medium | Medium |
| 10 | Make the backend do something real, or explicitly scope it as a contact API | 🟡 Medium | High |

---

## Bottom Line

**The engineering is better than the messaging.** You have real technical instincts — the terminal mode, the print renderer, the WebGL canvas, the Edge runtime work. But you're hiding all of it behind generic junior-dev copy.

The portfolio looks polished. The content reads like a first-year student. Fix the copy. Ship the Android project. Rewrite the README. Then you have something worth sharing.
