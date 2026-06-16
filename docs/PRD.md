# Analogy Arcade PRD

**Product name:** Analogy Arcade  
**Version:** v0.6
**Owner:** friendly-neighborhood-product-manager  
**Status:** Public MVP live  
**Last updated:** 2026-06-15  

---

## 1. Product Summary

Analogy Arcade is a browser-only AI learning app that helps users understand any topic by explaining it through worlds they already care about.

A user enters a topic, chooses an interest world, selects an audience level, and receives a personalized explanation that includes:

- A tiny definition
- An ELI5 explanation
- A personalized analogy
- A concept-to-analogy mapping table
- A “where the analogy breaks” section
- A mini quiz
- A visible agent workflow trace

The product is designed to demonstrate practical AI Product Management skills, including agentic workflows, prompt design, evaluation, personalization, guardrails, and no-code/low-code automation.

---

## 2. Problem

Generic AI explainers are often useful but boring, inconsistent, and sometimes misleading.

Users often ask:

> “Can you explain this in a way I actually understand?”

But most tools do not let users anchor explanations to their own interests, hobbies, or mental models.

Analogy Arcade solves this by turning unfamiliar topics into familiar worlds such as:

- Football tactics
- Space missions
- Bollywood drama
- Brick-by-brick builds
- Vacation itineraries
- Superhero-style teams
- Other user-provided interests

---

## 3. Target Users

### Primary User

Curious learners who want complex topics explained through familiar interests.

Examples:

- Product managers learning technical concepts
- Students learning abstract concepts
- Professionals trying to understand business or AI terminology
- Internet users who prefer playful explanations over formal documentation

### Secondary User

Recruiters, hiring managers, and AI product leaders reviewing this as a portfolio project.

They should be able to see evidence of:

- Product thinking
- AI workflow design
- Agent orchestration
- Evaluation and quality gates
- Responsible AI decisions
- Practical use of free/browser-based tools

---

## 4. User Goals

Users should be able to:

1. Enter any topic they want to understand.
2. Pick an interest world they relate to.
3. Choose an audience level.
4. Receive a clear and fun explanation.
5. Understand where the analogy is helpful and where it breaks.
6. Test their understanding with a mini quiz.
7. See how the AI workflow generated and checked the explanation.

---

## 5. Product Goals

Analogy Arcade should:

1. Make explanations more relatable and memorable.
2. Demonstrate agentic AI workflows in a visible, understandable way.
3. Use free or browser-based tools only.
4. Avoid local downloads or paid hosting.
5. Be publicly showcaseable through GitHub.
6. Include quality guardrails that reduce misleading analogies.
7. Log outputs and feedback for future iteration.

---

## 6. Non-Goals

Version 1 will not include:

- User accounts
- Paid AI APIs
- Local model downloads
- Real-time web search by default
- Medical, legal, or financial advice
- Copyrighted images, logos, lyrics, movie scripts, or branded assets
- Complex database infrastructure
- Mobile app store distribution
- Full LMS functionality

---

## 7. MVP Scope

### Input

The user provides:

- Topic through a text field
- Interest world through a custom text field, preset suggestion, or preset button
- Audience level through clickable audience chips
- Output style through multi-select output-style chips

Current audience levels:

- 🌱 Newbie
- 🔎 Curious Learner
- 🛠️ Tech Starter
- 🚀 Product Builder
- 👑 Boss Mode

Current default output styles:

- ELI5
- Analogy
- Mapping table
- Where the analogy breaks
- Mini quiz

Optional output styles:

- Make it funnier
- Make it shorter
- Agent note

Example:

```text
Topic: OAuth
Interest world: Vacations
Audience level: Beginner Product Manager
Output style: ELI5 + analogy + mini quiz
```

### Output

The app returns:

1. Tiny definition
2. ELI5 explanation
3. Personalized analogy
4. Mapping table
5. Where the analogy breaks
6. Interactive mini quiz
7. Agent trace or agent note when requested
8. Quality score or review signal when available
9. Formatted learning card UI
10. Quota-free sample card
11. Input summary in the format: “Explain `<topic>` in terms of `<interest world>` like I’m a `<audience level>`”
12. Feedback form attached to generated request IDs

---

## 8. MVP User Stories

### Learner Stories

- As a learner, I want to enter a topic so I can understand it quickly.
- As a learner, I want to pick an interest world so the explanation feels familiar.
- As a learner, I want to choose my audience level so the explanation is not too simple or too advanced.
- As a learner, I want to see where the analogy breaks so I do not learn the wrong thing.
- As a learner, I want a mini quiz so I can check whether I understood.

### Portfolio Reviewer Stories

- As a hiring manager, I want to see the agent workflow so I can understand how the product uses AI beyond a single prompt.
- As an AI product leader, I want to see quality scoring so I know the builder understands evaluation.
- As a recruiter, I want to see a polished public repo so I can quickly understand the project.

---

## 9. Agent Workflow

The product will use a multi-step agentic workflow.

```text
User Input
  ↓
Intake Agent
  ↓
Topic Classifier Agent
  ↓
Interest Mapper Agent
  ↓
Explainer Agent
  ↓
Analogy Critic Agent
  ↓
Rewrite Agent
  ↓
Quiz Agent
  ↓
Publisher Agent
  ↓
Learning Card
```

### Agent Responsibilities

| Agent | Responsibility |
|---|---|
| Intake Agent | Normalize user input into structured fields |
| Topic Classifier Agent | Classify topic type and identify risk level |
| Interest Mapper Agent | Map the topic to the user’s selected interest world |
| Explainer Agent | Generate the explanation and analogy |
| Analogy Critic Agent | Evaluate clarity, accuracy, analogy fit, and risk |
| Rewrite Agent | Improve the explanation if quality is below threshold |
| Quiz Agent | Generate a mini comprehension quiz |
| Publisher Agent | Format the final output into a learning card |

---

## 10. Quality Guardrails

Every final explanation should include:

- A clear definition
- A personalized analogy
- A mapping table
- A “where the analogy breaks” section
- A mini quiz
- A visible quality score

The app should avoid pretending to be authoritative for:

- Medical topics
- Legal topics
- Financial advice
- Current events
- Highly sensitive topics
- Topics requiring precise factual grounding

For these topics, the app should ask for source material or provide a clear caveat.

---

## 11. Evaluation Rubric

Each generated explanation should be scored from 1 to 5.

| Dimension | Question |
|---|---|
| Clarity | Is the explanation easy to understand? |
| Accuracy | Does it avoid obvious factual errors? |
| Analogy fit | Does the analogy map well to the topic? |
| Usefulness | Would the user actually learn from it? |
| Fun | Does it feel engaging and memorable? |
| Safety | Does it avoid risky, misleading, or copyrighted content? |

A result should be rewritten if any of these are true:

- `clarity_score < 4`
- `accuracy_score < 4`
- `analogy_fit_score < 4`

---

## 12. Planned Tech Stack

| Layer | Tool |
|---|---|
| Public showcase | GitHub Pages |
| Repository | GitHub |
| App UI | Google Apps Script Web App |
| Storage | Google Sheets |
| AI generation | Gemini API free tier |
| Workflow automation | Activepieces |
| Generated artifacts | Google Docs / Google Drive |
| Analytics | Google Sheets / Looker Studio later |

---

## 13. Data Model

### Requests

| Field | Description |
|---|---|
| request_id | Unique request identifier |
| timestamp | Time request was submitted |
| topic | Topic entered by user |
| interest_world | User-selected analogy world |
| audience_level | Desired explanation level |
| output_style | Requested format |
| status | Request state |
| result_url | Link to generated result, if available |

### Outputs

| Field | Description |
|---|---|
| request_id | Associated request |
| tiny_definition | Short definition |
| eli5_explanation | Simple explanation |
| analogy | Personalized analogy |
| mapping_table | Topic-to-world mapping |
| where_analogy_breaks | Limits of the analogy |
| mini_quiz | Quiz questions |
| final_output | Full formatted response |

### AgentTrace

| Field | Description |
|---|---|
| request_id | Associated request |
| agent_name | Agent step name |
| step_number | Workflow step number |
| input_summary | Summary of agent input |
| output_summary | Summary of agent output |
| score | Quality score if applicable |
| next_action | Continue, rewrite, reject, or publish |

### Feedback

| Field | Description |
|---|---|
| request_id | Associated request |
| timestamp | Feedback timestamp |
| rating | User rating |
| feedback_text | User notes |
| too_simple | Boolean |
| too_complex | Boolean |
| analogy_wrong | Boolean |
| not_fun | Boolean |
| would_share | Boolean |

---

## 14. Success Metrics

### MVP Product Metrics

| Metric | Target |
|---|---|
| First successful generated explanation | Completed |
| Number of sample outputs | 10+ |
| Average quality score | 4.0+ |
| Rewrite loop working | Yes |
| Public README complete | Yes |
| PRD maintained in GitHub | Yes |

### User Experience Metrics

| Metric | Description |
|---|---|
| Completion rate | Percent of submitted requests that produce an output |
| Regeneration rate | Percent of outputs users want rewritten |
| Positive feedback rate | Percent of thumbs-up or positive ratings |
| Share intent | Percent of users who say they would share the result |
| Analogy failure rate | Percent of users who mark the analogy as wrong |

---

## 15. Risks and Mitigations

| Risk | Mitigation |
|---|---|
| The analogy is funny but inaccurate | Include critic agent and “where the analogy breaks” |
| User enters high-stakes topic | Add topic classifier and caveat |
| Free API quota is exhausted | Add daily usage cap |
| Public users spam the app | Add lightweight rate limit or access code |
| API key is exposed | Keep calls server-side only |
| Output is too verbose | Add audience-level and length controls |
| App feels like a generic chatbot | Show agent trace, quiz, mapping table, and quality score |

---

## 16. Launch Plan

### Phase 1: Repo Foundation — Complete

- [x] Create GitHub repo
- [x] Add README
- [x] Add PRD
- [x] Create Google Sheet backend

### Phase 2: No-Code / Low-Code Prototype — Complete

- [x] Create Apps Script web app input UI
- [x] Connect request logging
- [x] Generate first explanation with Gemini
- [x] Save output to Google Sheet
- [x] Return result to browser

### Phase 3: Agentic Workflow — Complete

- [x] Add Explainer Agent
- [x] Add Analogy Critic Agent
- [x] Add Rewrite Agent
- [x] Log agent trace
- [x] Return final rewritten output to user

### Phase 4: Public Showcase — Complete

- [x] Publish GitHub Pages site
- [x] Add live demo link
- [x] Add PRD
- [x] Add agent architecture documentation
- [x] Add architecture diagram
- [x] Add prompt design documentation
- [x] Add sample outputs

### Phase 5: Feedback Loop — Complete

- [x] Add Google Sheet feedback backend
- [x] Add feedback UI to web app
- [x] Capture user rating
- [x] Capture issue tags
- [x] Store feedback against request ID

### Phase 5.5: Custom Interest Worlds — Complete

- [x] Add “Something else...” option to the interest-world dropdown
- [x] Add custom interest input field
- [x] Pass custom interest world to Activepieces workflow
- [x] Log custom interest world to Google Sheets
- [x] Test custom interest flow end-to-end

### Phase 5.6: Learning Card UX — Complete

- [x] Improve generated output formatting
- [x] Render Markdown-style headings, bullets, bold text, and tables in the live app
- [x] Add quota-free sample card button
- [x] Allow users to preview the product without consuming Gemini quota
- [x] Hide feedback form for sample cards so feedback only attaches to real generated request IDs

### Phase 5.7: Interactive Learning Controls — Complete

- [x] Replace interest-world dropdown with a text field
- [x] Add preset interest buttons below the interest text field
- [x] Add preset suggestions as users type
- [x] Treat unmatched interest text as a custom interest world
- [x] Allow selected interest presets to be unselected by clicking again
- [x] Replace audience dropdown with clickable audience-level chips
- [x] Add audience levels: Newbie, Curious Learner, Tech Starter, Product Builder, Boss Mode
- [x] Allow selected audience level to be unselected by clicking again
- [x] Replace output-style textarea with multi-select output-style chips
- [x] Format selected output styles as a plus-separated string for the backend

### Phase 5.8: Interactive Quiz and Navigation UX — Complete

- [x] Make mini quiz options clickable
- [x] Hide quiz answer until the user selects an option
- [x] Show correct answer in green
- [x] Show selected wrong answer in amber
- [x] Grey out unselected wrong options after answer selection
- [x] Add quota-free sample card toggle
- [x] Change sample card button text between “Show sample card” and “Hide sample card”
- [x] Add auto-scroll to the sample card and answer card
- [x] Add floating back-to-top button
- [x] Hide back-to-top button when user is at the top of the page

### Phase 5.9: Guided Input Progress and Input Summary — Complete

- [x] Add right-side vertical progress tracker
- [x] Align progress checkpoints beside topic field, interest field, audience row, output-style row, and generate button
- [x] Turn tracker checkpoints green when inputs are ready
- [x] Add fifth checkpoint for the “Explain it” action
- [x] Add input summary to sample card and generated answer card
- [x] Render input summary as “Explain `<topic>` in terms of `<interest world>` like I’m a `<audience level>`”
- [x] Style summary parameters as pill components
- [x] Trim “Boss Mode” to “Boss” in the input summary
- [x] Make connector text in the summary non-bold while keeping parameter pills bold

### Phase 6: Next Iteration — Planned

- [ ] Add screenshot gallery to GitHub Pages
- [ ] Add exportable/shareable learning cards
- [ ] Add structured JSON output from agents
- [ ] Split final output into separate Google Sheet columns
- [ ] Add conditional rewrite logic
- [ ] Add quota-safe composite agent mode
- [ ] Add public gallery of best outputs
- [ ] Add model provider fallback, such as Groq or Cloudflare Workers AI

---

## 17. Open Questions

1. Should v1 use Google Forms first or go directly to Apps Script Web App?
2. Should Activepieces orchestrate all agent steps, or should some logic live in Apps Script?
3. Should public users be able to generate live outputs, or should the first public version show sample outputs only?
4. What should the daily request limit be?
5. Which interest worlds should be included in v1?
6. Should the app support user-provided custom interests in v1? **Resolved: Yes. Implemented in v0.3.**

---

## 18. Decision Log

| Date | Decision | Reason |
|---|---|---|
| 2026-06-15 | Use GitHub as product documentation source of truth | Public portfolio visibility |
| 2026-06-15 | Use Google Sheets as backend | Free, browser-based, easy to inspect |
| 2026-06-15 | Include “where the analogy breaks” in every output | Reduces risk of misleading analogies |
| 2026-06-15 | Use Activepieces for workflow orchestration | Demonstrates Zapier/n8n-style agent workflows |

---

## 19. Changelog

### v0.6

- Added vertical progress tracker aligned to form inputs and generate action
- Added fifth progress checkpoint for the “Explain it” button
- Added input summary to sample and answer cards
- Styled input summary parameters as pill components
- Increased input summary font size to match section headings
- Made input summary connector text non-bold
- Trimmed “Boss Mode” to “Boss” in the input summary
- Added auto-scroll behavior for sample card and generated answer card
- Added floating back-to-top button that appears only after scrolling down
- Updated sample card behavior so the button toggles between “Show sample card” and “Hide sample card”

### v0.5

- Replaced interest-world dropdown with custom text input and preset buttons
- Added preset suggestion behavior while typing an interest world
- Added custom interest support when no preset matches
- Added ability to unselect a chosen preset by clicking it again
- Replaced audience dropdown with clickable audience-level chips
- Added audience levels: Newbie, Curious Learner, Tech Starter, Product Builder, and Boss Mode
- Replaced output-style textarea with multi-select output-style chips
- Removed emojis from output-style labels
- Added interactive mini quiz rendering
- Added hidden-answer quiz behavior
- Added green correct-answer state, amber selected-wrong state, and greyed-out unselected wrong options

### v0.4

- Improved live app output rendering so generated Markdown appears as a formatted learning card
- Added support for headings, bullets, bold text, inline code, and basic tables
- Added a quota-free sample card button
- Confirmed users can preview a sample explanation without consuming Gemini quota
- Hid feedback form for sample cards to avoid feedback rows without real generated request IDs

### v0.3

- Added custom interest world support
- Added “Something else...” option to the interest-world dropdown
- Added custom interest input field to the live web app
- Confirmed custom interest worlds pass through to Activepieces
- Confirmed custom interest worlds log correctly in Google Sheets
- Tested custom interest flow end-to-end with APIs through Cricket

### v0.2

- Public Apps Script web app launched
- Activepieces workflow connected to live web app
- Gemini-powered Explainer Agent, Critic Agent, and Rewrite Agent working
- Requests logged to Google Sheets
- Outputs logged to Google Sheets
- Agent traces logged to Google Sheets
- Daily request cap added to protect free-tier AI quota
- Privacy and responsible-use note added to UI
- Feedback capture added to live app
- GitHub Pages showcase published
- Architecture, prompt design, and sample output docs added

### v0.1

- Initial PRD created
- MVP scope defined
- Agent workflow proposed
- Data model drafted
- Success metrics and risks documented
