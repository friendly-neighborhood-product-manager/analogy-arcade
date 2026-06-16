# Analogy Arcade Architecture Diagram

This diagram shows the current Analogy Arcade architecture, the free/browser-based tools used, and paid industry-standard alternatives that could have been used instead.

The current MVP includes:

- Google Apps Script web app
- Activepieces workflow orchestration
- Gemini-powered Explainer, Critic, and Rewrite Agent workflow
- Google Sheets backend
- GitHub Pages showcase
- Custom interest input with preset chips
- Clickable audience chips
- Multi-select output-style chips
- Right-side progress tracker
- Input summary pills
- Interactive mini quiz
- Quota-free sample card
- Floating back-to-top button
- Feedback capture

---

## 1. System Architecture

```mermaid
flowchart TD
    User["Public user<br/>(Paid alt: managed customer portal)"]

    Showcase["GitHub Pages showcase<br/>(Paid alt: Vercel Pro, Netlify Pro, Webflow, AWS Amplify)"]

    Repo["GitHub repo, README, PRD, docs, source<br/>(Paid alt: Jira + Confluence, GitLab Ultimate, Azure DevOps)"]

    WebApp["Google Apps Script Web App<br/>(Paid alt: Vercel + Next.js, Firebase Functions, AWS Lambda + API Gateway)"]

    ScriptProps["Apps Script Properties<br/>(Paid alt: Google Secret Manager, AWS Secrets Manager, HashiCorp Vault)"]

    DailyCap["Apps Script daily request cap<br/>(Paid alt: Cloudflare rate limiting, AWS API Gateway usage plans, Kong API Gateway)"]

    FrontendUX["Interactive frontend UX<br/>(Paid alt: React / Next.js app, Retool, Bubble, Webflow app)"]

    InterestInput["Interest world text input + preset chips<br/>(Paid alt: Algolia Autocomplete, custom React component library)"]

    AudienceChips["Audience-level chips<br/>(Paid alt: Design-system segmented controls)"]

    OutputChips["Multi-select output-style chips<br/>(Paid alt: Design-system multi-select component)"]

    ProgressTracker["Right-side progress tracker<br/>(Paid alt: Product onboarding / stepper component)"]

    InputSummary["Input summary pills<br/>(Paid alt: custom React card component)"]

    SampleCard["Quota-free sample card toggle<br/>(Paid alt: hosted demo environment or product tour tool)"]

    InteractiveQuiz["Interactive mini quiz renderer<br/>(Paid alt: LMS quiz component, Typeform, custom React quiz component)"]

    BackToTop["Floating back-to-top button<br/>(Paid alt: design-system navigation component)"]

    Activepieces["Activepieces workflow<br/>(Paid alt: Zapier, Make, Workato, Tray.io, n8n Cloud)"]

    Webhook["Activepieces webhook<br/>(Paid alt: API Gateway endpoint, Workato callable recipe, Tray callable workflow)"]

    Gemini["Gemini API free tier via Google AI Studio<br/>(Paid alt: OpenAI API, Anthropic Claude API, Vertex AI, Azure OpenAI)"]

    Explainer["Explainer Agent<br/>(Paid alt: OpenAI / Claude prompt chain, LangChain agent, Vertex AI Agent Builder)"]

    Critic["Analogy Critic Agent<br/>(Paid alt: LangSmith evaluators, Humanloop evals, OpenAI eval pipeline)"]

    Rewrite["Rewrite Agent<br/>(Paid alt: OpenAI / Claude refinement chain, Vertex AI pipeline)"]

    Sheets["Google Sheets backend<br/>(Paid alt: Airtable, Supabase, PostgreSQL, Firebase Firestore, BigQuery)"]

    Requests["Requests tab<br/>(Paid alt: product event table in BigQuery / Snowflake)"]

    Outputs["Outputs tab<br/>(Paid alt: app database table, Airtable base, Supabase table)"]

    Trace["AgentTrace tab<br/>(Paid alt: LangSmith traces, Datadog logs, Honeycomb observability)"]

    Feedback["Feedback tab<br/>(Paid alt: Productboard, Airtable, Pendo / Amplitude feedback events)"]

    Drive["Google Drive / Docs storage<br/>(Paid alt: Notion, Confluence, SharePoint, Box)"]

    Hoppscotch["Hoppscotch API testing<br/>(Paid alt: Postman Team, Insomnia Enterprise)"]

    User --> Showcase
    Showcase --> WebApp
    Showcase --> Repo

    User --> WebApp
    WebApp --> DailyCap
    WebApp --> ScriptProps
    ScriptProps --> Webhook
    WebApp --> Webhook

    WebApp --> FrontendUX
    FrontendUX --> InterestInput
    FrontendUX --> AudienceChips
    FrontendUX --> OutputChips
    FrontendUX --> ProgressTracker
    FrontendUX --> InputSummary
    FrontendUX --> SampleCard
    FrontendUX --> InteractiveQuiz
    FrontendUX --> BackToTop

    SampleCard --> User
    InteractiveQuiz --> User
    BackToTop --> User

    Webhook --> Activepieces

    Activepieces --> Explainer
    Explainer --> Gemini

    Activepieces --> Critic
    Critic --> Gemini

    Activepieces --> Rewrite
    Rewrite --> Gemini

    Explainer --> Critic
    Critic --> Rewrite

    Activepieces --> Sheets
    Sheets --> Requests
    Sheets --> Outputs
    Sheets --> Trace
    Sheets --> Feedback

    Sheets --> Drive
    Activepieces --> WebApp
    WebApp --> User

    Repo --> Showcase
    Hoppscotch --> Webhook
```

---

## 2. Runtime Flow

```mermaid
sequenceDiagram
    participant U as Public User
    participant GP as GitHub Pages Showcase
    participant GAS as Google Apps Script Web App
    participant AP as Activepieces Workflow
    participant Gemini as Gemini API
    participant Sheets as Google Sheets Backend

    U->>GP: Opens project showcase
    GP->>GAS: Clicks live demo
    U->>GAS: Enters topic
    U->>GAS: Types custom interest or clicks preset chip
    U->>GAS: Selects audience chip
    U->>GAS: Selects output-style chips
    GAS->>GAS: Updates right-side progress tracker
    GAS->>GAS: Generates request_id and checks daily cap
    GAS->>GAS: Displays input summary pills
    GAS->>AP: Sends POST request to /sync webhook
    AP->>Gemini: Explainer Agent generates first draft
    AP->>Gemini: Critic Agent scores explanation
    AP->>Gemini: Rewrite Agent improves final answer
    AP->>Sheets: Logs request
    AP->>Sheets: Logs final output
    AP->>Sheets: Logs agent trace
    AP->>GAS: Returns final learning card
    GAS->>U: Displays formatted answer card
    GAS->>U: Enables interactive mini quiz
    U->>GAS: Submits feedback
    GAS->>Sheets: Logs feedback
```

---

## 3. Quota-Free Sample Card Flow

```mermaid
sequenceDiagram
    participant U as Public User
    participant GAS as Google Apps Script Web App

    U->>GAS: Clicks Show sample card
    GAS->>GAS: Builds static sample card locally
    GAS->>GAS: Displays input summary pills
    GAS->>GAS: Renders Markdown-style learning card
    GAS->>GAS: Enables interactive mini quiz
    GAS->>U: Shows sample card without Gemini call
    U->>GAS: Clicks Hide sample card
    GAS->>GAS: Hides sample card
    GAS->>U: Scrolls back to top
```

---

## 4. Frontend UX Architecture

```mermaid
flowchart TD
    Frontend["Google Apps Script Frontend<br/>(Paid alt: Next.js / React frontend)"]

    Topic["Topic text field"]
    Interest["Interest world text field"]
    Presets["Preset interest chips"]
    Suggestions["Preset suggestion box"]
    Audience["Audience-level chips"]
    Output["Multi-select output-style chips"]
    Progress["Vertical progress tracker"]
    Summary["Input summary pills"]
    Sample["Quota-free sample card"]
    Quiz["Interactive mini quiz"]
    FeedbackUI["Feedback form"]
    Scroll["Auto-scroll + back-to-top button"]

    Frontend --> Topic
    Frontend --> Interest
    Frontend --> Presets
    Frontend --> Suggestions
    Frontend --> Audience
    Frontend --> Output
    Frontend --> Progress
    Frontend --> Summary
    Frontend --> Sample
    Frontend --> Quiz
    Frontend --> FeedbackUI
    Frontend --> Scroll

    Topic --> Progress
    Interest --> Progress
    Presets --> Interest
    Suggestions --> Interest
    Audience --> Progress
    Output --> Progress

    Summary --> Sample
    Summary --> Quiz
    Quiz --> FeedbackUI
```

---

## 5. Tooling Map

| Layer | Tool used | Paid industry-standard alternatives | Why this choice was used |
|---|---|---|---|
| Public project showcase | GitHub Pages | Vercel Pro, Netlify Pro, Webflow, AWS Amplify | Free, public, connected directly to the repo |
| Source of truth | GitHub repo | GitLab Ultimate, Azure DevOps, Bitbucket, Jira + Confluence | Strong public portfolio artifact |
| Product docs | README + PRD in GitHub | Confluence, Notion, Productboard, Jira Product Discovery | Easy for hiring managers to inspect |
| Live web app | Google Apps Script Web App | Vercel + Next.js, Firebase, AWS Lambda + API Gateway | Browser-only, no local setup, free for MVP |
| Frontend interaction layer | Apps Script HTML / CSS / JavaScript | React, Next.js, Retool, Bubble, Webflow app | Enough for a public MVP without local installs |
| Secret storage | Apps Script Properties | Google Secret Manager, AWS Secrets Manager, HashiCorp Vault | Keeps webhook URL and Sheet ID out of browser code and GitHub |
| Workflow automation | Activepieces | Zapier, Make, Workato, Tray.io, n8n Cloud | Browser-based automation with agent workflow patterns |
| AI model provider | Gemini API free tier | OpenAI API, Anthropic Claude API, Vertex AI, Azure OpenAI | Free-tier model access through Google AI Studio |
| Agent orchestration | Activepieces steps | LangChain, LangGraph, CrewAI, Vertex AI Agent Builder | Visual workflow orchestration without local coding |
| Backend storage | Google Sheets | Airtable, Supabase, PostgreSQL, Firebase Firestore, BigQuery | Free, simple, inspectable data store |
| Feedback capture | Google Sheets Feedback tab | Productboard, Pendo, Amplitude, Airtable | Low-friction MVP feedback loop |
| Output storage | Google Drive / Docs | Notion, Confluence, SharePoint, Box | Fits existing Google One storage ecosystem |
| API testing | Hoppscotch | Postman Team, Insomnia Enterprise | Browser-based API testing with no install |
| Usage protection | Apps Script daily cap | Cloudflare rate limiting, Kong, AWS API Gateway usage plans | Protects free AI quota from accidental overuse |
| Future analytics | Google Sheets / Looker Studio | Amplitude, Mixpanel, Pendo, Heap | Free or low-cost way to show product metrics |

---

## 6. Key Product UX Components

| UX component | Current behavior | Why it matters |
|---|---|---|
| Interest text field | User can type any interest world | Enables true personalization |
| Preset interest chips | User can click presets like football, space, Bollywood, and cooking | Speeds up input and shows product personality |
| Preset suggestion box | Matching preset appears while typing | Helps users discover presets without a dropdown |
| Audience chips | User selects one audience level by clicking | Makes the app feel more playful than a standard form |
| Output-style chips | User can multi-select the desired response sections | Gives users control over answer format |
| Progress tracker | Right-side checkpoints turn green as inputs are completed | Guides the user through the form |
| Input summary pills | Displays “Explain topic in terms of interest like I’m a audience” | Makes output visibly tied to user intent |
| Interactive mini quiz | User selects an answer; answer is revealed after click | Turns passive explanation into active learning |
| Sample card toggle | Shows/hides a quota-free sample card | Lets reviewers preview the product without using AI quota |
| Back-to-top button | Floating button appears after scrolling down | Improves navigation after long generated content |

---

## 7. Design Rationale

Analogy Arcade is intentionally built with free, browser-accessible tools. The architecture prioritizes:

- No local downloads
- No paid hosting
- Public portfolio visibility
- Agentic workflow demonstration
- Simple observability through Google Sheets
- Responsible quota protection
- Easy replacement of model providers later
- Fun, personalized learning experience
- Product-quality UX details despite no-code / low-code constraints

The architecture mirrors real AI product patterns:

```text
User request
→ Generation
→ Evaluation
→ Rewrite
→ Logging
→ Feedback
→ Iteration
```

The frontend also mirrors real product design patterns:

```text
Input guidance
→ Personalization
→ Progress tracking
→ Generated output
→ Interactive learning
→ Feedback capture
```

---

## 8. Current Constraints

The current architecture has a few deliberate constraints:

| Constraint | Impact | Mitigation |
|---|---|---|
| Gemini free-tier quota | Limits public usage volume | Daily request cap |
| Multi-agent flow uses multiple model calls | Each user request consumes several AI calls | Future quota-safe composite mode |
| Google Sheets is not a production database | Not ideal for high-volume usage | Good enough for MVP and portfolio demo |
| Apps Script UI is lightweight | Limited frontend customization | Custom HTML / CSS / JavaScript for richer UX |
| Activepieces flow is visual, not code-first | Harder to version-control full logic | Document workflow and export screenshots / JSON |
| Public demo has no login | Possible usage abuse | Daily cap and public warning |
| Feedback data is simple | Limited analytics depth | Future Looker Studio dashboard |

---

## 9. Current Security Design

```mermaid
flowchart TD
    Browser["Browser UI"]
    AppsScript["Apps Script server-side functions"]
    Props["Apps Script Properties"]
    Activepieces["Activepieces webhook"]
    Gemini["Gemini API"]
    Sheets["Google Sheets backend"]

    Browser --> AppsScript
    AppsScript --> Props
    Props --> Activepieces
    Activepieces --> Gemini
    Activepieces --> Sheets
    AppsScript --> Sheets

    Browser -. does not see .-> Props
    Browser -. does not see .-> Gemini
    Browser -. does not see .-> Activepieces
```

Security design decisions:

- Gemini API key is not stored in GitHub.
- Activepieces webhook URL is stored in Apps Script Properties.
- Google Sheet ID is stored in Apps Script Properties.
- Browser JavaScript calls Apps Script server-side functions instead of calling model APIs directly.
- Public repo only includes sanitized source code and documentation.
- Live demo includes a daily request cap.

---

## 10. Future Architecture Options

### Option A: Quota-Safe Public Mode

```text
User
→ Apps Script
→ Activepieces
→ Single composite AI call
→ Google Sheets
→ Response
```

This reduces AI calls per request while keeping the user-visible agent trace.

### Option B: More Production-Like AI App

```text
User
→ Vercel / Next.js
→ API route
→ LangGraph or custom orchestration
→ OpenAI / Anthropic / Vertex AI
→ Supabase / Postgres
→ Analytics
```

This would be more scalable, but it would violate the current zero-spend and browser-only constraint.

### Option C: Open-Weight Hosted Model Path

```text
User
→ Apps Script
→ Activepieces HTTP request
→ Cloudflare Workers AI or Groq
→ Google Sheets
→ Response
```

This could reduce dependence on Gemini quotas while keeping the project mostly browser-based and free-tier friendly.

---

## 11. Security Notes

Do not publish:

- Gemini API key
- Activepieces webhook URL
- Google Sheet edit link
- Google Sheet ID
- Apps Script project ID
- Apps Script script properties
- Raw user data
- Private test payloads
- Personal emails

Publicly safe artifacts:

- Architecture diagram
- PRD
- Prompt templates
- Sanitized source code
- Sanitized screenshots
- Sample outputs
- GitHub Pages showcase
- Live demo link with daily cap
