# Slide 3: PLAYWRIGHT MCP — AI-Powered Browser Automation

> **Source**: Slide 3 from [@web_pros on Instagram](https://www.instagram.com/web_pros/p/DbS_Ni8jdZp/?img_index=1)  
> **Headline**: **"PLAYWRIGHT: AI-powered browser automation. Test. Interact. Validate."**  
> **Featured Modules in Image**: Multi-Viewport Responsive Testing (Desktop, Tablet, Mobile), Form Automation, Screenshot Capture, Visual Regression Testing, Live Action Execution

---

## 1. What is Playwright MCP & Its Core Uses

**Playwright MCP** (`@modelcontextprotocol/server-playwright`) gives Google Antigravity a real Chromium/WebKit/Firefox browser engine to autonomously test, interact with, and validate web applications.

### Key Capabilities Highlighted in the Image:

```
┌─────────────────────────────────────────────────────────────┐
│                 PLAYWRIGHT AUTOMATION ENGINE                │
├──────────────────────────────┬──────────────────────────────┤
│ 📱 Responsive Viewport Tests │ Desktop (1440px)             │
│                              │ Tablet (768px)               │
│                              │ Mobile (375px)               │
├──────────────────────────────┼──────────────────────────────┤
│ 📝 Form Automation           │ Multi-step checkout flows,   │
│                              │ typing inputs, clicking      │
├──────────────────────────────┼──────────────────────────────┤
│ 📸 Screenshot & Visual Diff  │ Full-page captures, visual   │
│                              │ regression change detection  │
├──────────────────────────────┼──────────────────────────────┤
│ 🤖 Autonomous AI Assistant   │ Asserts UI state, validates  │
│                              │ redirects, catches errors    │
└──────────────────────────────┴──────────────────────────────┘
```

---

## 2. Setup Guide in Antigravity

### Step 1: Add Playwright to `mcp_config.json`
Add the server configuration to your workspace (`.agents/mcp_config.json`) or global config:

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-playwright"]
    }
  }
}
```

### Step 2: Running Browser Tests Headless vs. Headed
By default, Playwright runs headless in the background. If you want to watch the browser open live on your screen as the AI clicks, pass the `--headed` flag:

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-playwright", "--headed"]
    }
  }
}
```

---

## 3. How to Prompt Antigravity for the Flows Shown in the Slide

### 1. Form & Checkout Flow Automation
As shown in the image log:
```
-> Navigated to https://acme.com
-> Clicked on "Get started"
-> Filling input[name="email"]
-> Typed "hello@acme.com"
-> Clicked on "Continue"
-> Screenshot saved • home-desktop.png
-> Test completed successfully
```
> **Prompt Antigravity**:  
> *"Launch Playwright MCP, navigate to `http://localhost:3000`, click 'Get started', fill the email input with `test@example.com`, click 'Continue', verify that step 2 loads without errors, and save a screenshot."*

### 2. Multi-Viewport Responsive Testing (Desktop, Tablet, Mobile)
> **Prompt Antigravity**:  
> *"Test the homepage across 3 viewports: Desktop (1440x900), Tablet (768x1024), and Mobile (375x667). Check for horizontal scrollbar overflow bugs and verify hamburger menu toggle on mobile."*

### 3. Visual Regression & State Assertion
> **Prompt Antigravity**:  
> *"After updating the checkout button styling, take before-and-after screenshots and confirm that no adjacent layout elements shifted unexpectedly."*

---

## 4. Expert Advice & Suggestions for this Slide

> [!TIP]
> **1. Use Playwright for End-to-End User Journeys**  
> Don't just test single static pages. Playwright shines when you instruct Antigravity to perform a complete user journey:  
> `Sign Up -> Check verification -> Fill profile -> Add product to cart -> Checkout`.  
> If any step breaks, the agent pinpoints the exact line of code causing the failure.

> [!IMPORTANT]
> **2. Resilient Selectors (Avoid Brittle XPaths)**  
> When automating forms, prompt Antigravity to target elements by **user-facing roles or attributes** rather than complex generated CSS class names:
> - ✅ Good: `getByRole('button', { name: 'Continue' })` or `input[name="email"]`
> - ❌ Bad: `div > div:nth-child(3) > button.css-1f4x9`

> [!WARNING]
> **3. Wait for Network Idle & Animations**  
> When taking screenshots for visual regression tests, always ensure images and fonts are loaded and CSS transitions have settled (`waitForLoadState('networkidle')`), otherwise screenshots may report false differences due to in-flight animations.

---

## Navigation
- Previous: **[Slide 2: Context7 MCP (Documentation)](file:///d:/coedes/no%20ai%20slop%20with%20design%20STUDY/mcp_docs/08_context7_docs_mcp.md)**
- Next: **[Slide 4: Think. Plan. Build. (Sequential Thinking & Filesystem MCP)](file:///d:/coedes/no%20ai%20slop%20with%20design%20STUDY/mcp_docs/09_sequential_thinking_and_filesystem_mcp.md)**
