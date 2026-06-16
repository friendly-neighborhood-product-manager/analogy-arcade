# Analogy Arcade Agent Architecture

Analogy Arcade is designed as a browser-only AI learning app that explains confusing topics through worlds the user already understands.

The goal is to demonstrate practical AI product skills:

- Agentic workflow design
- Prompt decomposition
- AI evaluation
- Guardrails
- Workflow automation
- Lightweight backend logging
- Public launch thinking
- Interactive learning UX
- Free-tier quota-aware product design

---

## 1. High-Level Architecture

```text
User
  ↓
Google Apps Script Web App
  ↓
Activepieces Webhook
  ↓
Explainer Agent
  ↓
Analogy Critic Agent
  ↓
Rewrite Agent
  ↓
Google Sheets Logging
  ↓
Response returned to Web App
```

The live app also includes a quota-free sample card path:

```text
User
  ↓
Google Apps Script Web App
  ↓
Quota-free sample card renderer
  ↓
Formatted learning card + interactive quiz
```

---

## 2. System Components

| Component | Role |
|---|---|
| GitHub Repo | Public source of truth for product docs, PRD, prompts, architecture, source code, and showcase assets |
| GitHub Pages | Public project showcase site |
| Google Apps Script Web App | Browser-based front end and lightweight server-side wrapper, including custom interest input, preset chips, audience chips, output-style chips, sample card toggle, progress tracker, input summary pills, interactive quiz rendering, feedback UI, scroll behavior, back-to-top control, and quota protection |
| Activepieces | Workflow orchestration layer |
| Activepieces Webhook | Receives `/sync` requests from Apps Script and returns generated responses |
| Gemini API | AI model provider for generation, critique, and rewriting |
| Google Sheets | Lightweight backend for requests, outputs, agent traces, and feedback |
| Google Drive | Storage for project artifacts and generated docs if needed |
| Apps Script Properties | Private configuration store for webhook URL, backend Sheet ID, and daily request limit |
| Hoppscotch | Browser-based API testing tool used during workflow validation |

---

## 3. Request Lifecycle

1. User opens the Analogy Arcade web app.
2. User enters a topic in the topic text field.
3. User enters an interest world by either:
   - Typing a custom interest
   - Clicking a preset chip
   - Accepting a preset suggestion while typing
4. User selects an audience level through clickable audience chips.
5. User selects one or more output styles through multi-select output-style chips.
6. The right-side progress tracker updates as each input is completed.
7. Apps Script generates a unique `request_id`.
8. Apps Script checks the daily request cap.
9. Apps Script sends the request to the Activepieces `/sync` webhook.
10. Activepieces runs the AI workflow.
11. The request is logged to the `Requests` tab in Google Sheets.
12. The final output is logged to the `Outputs` tab.
13. The agent trace is logged to the `AgentTrace` tab.
14. The final response is returned to the Apps Script web app.
15. The user sees a formatted learning card in the browser.
16. The learning card includes an input summary in the format: “Explain `<topic>` in terms of `<interest world>` like I’m a `<audience level>`.”
17. The user can answer an interactive mini quiz.
18. The user can submit feedback, which is logged to the `Feedback` tab.

---

## 4. Frontend Interaction Layer

The live app includes an interactive front-end experience built in Google Apps Script HTML.

### Input Controls

| Input area | Current behavior |
|---|---|
| Topic | Free-text field |
| Interest world | Text field with preset suggestions and preset chips |
| Preset interest chips | Clicking a preset fills the interest field; clicking the selected preset again clears the field |
| Audience level | Single-select clickable chips |
| Output style | Multi-select clickable chips |
| Generate action | User clicks “Explain it” to call the Activepieces workflow |
| Sample card action | User clicks “Show sample card” to preview the experience without using Gemini quota |

### Interest World Controls

The interest-world input is a text field, not a dropdown.

Current preset interest worlds:

- Football tactics
- Space missions
- Bollywood drama
- Brick-by-brick builds
- Vacation itineraries
- Superhero-style teams
- Arcade games
- Cooking

Behavior:

- User can type any custom interest.
- Matching preset suggestions appear as the user types.
- If the input exactly matches a preset, that preset is selected.
- If the input does not match a preset, the app treats it as a custom interest world.
- Clicking a preset fills the text field.
- Clicking the selected preset again clears the text field.
- When one preset is selected, the other preset chips are visually greyed out.

### Audience Levels

Current audience levels:

| Label | Meaning |
|---|---|
| 🌱 Newbie | Very beginner-friendly |
| 🔎 Curious Learner | Beginner but curious |
| 🛠️ Tech Starter | Technical beginner |
| 🚀 Product Builder | Product/persona-oriented explanation |
| 👑 Boss Mode | Executive-style explanation |

Behavior:

- Audience levels are selected through clickable chips.
- Only one audience level can be selected at a time.
- Clicking the selected audience level again unselects it.
- When one audience level is selected, the other audience chips are visually greyed out.
- In the generated input summary, `Boss Mode` is shortened to `Boss`.

### Output Style Controls

Default selected output styles:

- ELI5
- Analogy
- Mapping table
- Where it breaks
- Mini quiz

Optional output styles:

- Make it funnier
- Make it shorter
- Agent note

Behavior:

- Output styles are represented as multi-select chips.
- Users can select or unselect any output style.
- Multiple output styles can be selected at once.
- Selected output styles are sent to the backend as a plus-separated string.

### Guided Progress Tracker

The live app includes a right-side vertical progress tracker with five checkpoints:

1. Topic
2. Interest world
3. Audience level
4. Output style
5. Generate

Tracker behavior:

- Each checkpoint is aligned beside its corresponding input area:
  - Topic checkpoint beside the topic text field
  - Interest checkpoint beside the interest-world text field
  - Audience checkpoint beside the audience-level row
  - Output checkpoint beside the first row of output-style chips
  - Generate checkpoint beside the “Explain it” button
- Each checkpoint turns green when the corresponding input is ready.
- The fifth checkpoint turns green when all required inputs are ready to generate.

### Learning Card UX

The generated answer card includes:

- Input summary with pill-styled parameters
- Formatted Markdown rendering
- Tables
- Headings
- Interactive mini quiz
- Feedback form

The input summary appears in this format:

```text
Explain <topic> in terms of <interest world> like I'm a <audience level>
```

Input summary behavior:

- Topic, interest world, and audience level appear as pill components.
- Connector text such as “Explain”, “in terms of”, and “like I’m a” is non-bold.
- Parameter pills are bold.
- The input summary font size is aligned with the learning card section heading size.
- `Boss Mode` is displayed as `Boss` in the input summary.
- The summary appears on both sample cards and generated answer cards.

### Interactive Mini Quiz UX

The mini quiz is interactive.

Behavior:

- Quiz options are displayed as clickable choices.
- The correct answer is hidden until the user clicks an option.
- When the user selects the correct answer, the correct option turns green.
- When the user selects a wrong answer:
  - The selected wrong answer turns amber.
  - The correct answer turns green.
  - Unselected wrong options are greyed out.
- The answer explanation appears only after a user selection.

### Sample Card UX

The live app includes a quota-free sample card.

Behavior:

- Clicking `Show sample card` displays a sample card without calling Gemini.
- The button changes to `Hide sample card`.
- Clicking `Hide sample card` hides the sample card and scrolls back to the top.
- The sample card uses the same formatted learning-card UI and interactive quiz behavior as generated answers.
- The sample card includes the same input summary format as generated answers.
- Feedback is hidden for sample cards so feedback only attaches to real generated request IDs.

### Navigation UX

The app includes:

- Auto-scroll to the answer/sample card area while keeping the “Explain it” and “Show/Hide sample card” buttons visible near the top.
- Floating back-to-top button.
- Back-to-top button appears only when the user scrolls down.
- Back-to-top button disappears when the user is at the top of the page.

---

## 5. Agent Workflow

### Explainer Agent

The Explainer Agent creates the first draft of the learning card.

It receives:

- Topic
- Interest world
- Audience level
- Output style

It returns:

- Tiny definition
- ELI5 explanation
- Personalized analogy
- Mapping table
- Where the analogy breaks
- Mini quiz

### Analogy Critic Agent

The Critic Agent evaluates the first draft.

It scores the explanation on:

| Dimension | Question |
|---|---|
| Clarity | Is the explanation easy to understand? |
| Accuracy | Does it avoid obvious factual errors? |
| Analogy fit | Does the analogy map well to the topic? |
| Usefulness | Would the user actually learn from it? |
| Fun | Is it engaging and memorable? |
| Safety | Does it avoid risky, misleading, or copyrighted content? |

The Critic Agent returns a scorecard and recommended improvements.

### Rewrite Agent

The Rewrite Agent improves the original explanation using the critic’s feedback.

The final output returned to the user should be the Rewrite Agent’s improved version, not the first draft.

---

## 6. Why This Is Agentic

Analogy Arcade is not just a single prompt because the workflow separates responsibilities across multiple AI steps:

```text
Generate → Critique → Improve → Log → Return
```

Each step has a different product responsibility:

| Step | Product responsibility |
|---|---|
| Explainer Agent | Create user value |
| Critic Agent | Evaluate quality |
| Rewrite Agent | Improve output before delivery |
| Logging | Create observability and iteration data |
| Feedback form | Capture user quality signals |
| Daily cap | Protect free-tier quota |
| Public UI note | Set user expectations and reduce misuse |
| Sample card | Show product value without consuming AI quota |
| Interactive quiz | Turn explanation into a lightweight learning experience |
| Input summary | Make generated output visibly tied to user choices |

This mirrors real AI product patterns where generation, evaluation, guardrails, observability, and UX quality are treated as separate product concerns.

---

## 7. Data Model

### Requests

Stores the user request.

| Field | Description |
|---|---|
| request_id | Unique request identifier |
| timestamp | Time request was submitted |
| topic | Topic entered by user |
| interest_world | User-selected or custom analogy world |
| audience_level | Desired explanation level |
| output_style | Requested output format |
| status | Current state of request |
| result_url | Optional future link to generated artifact |

### Outputs

Stores the generated response.

| Field | Description |
|---|---|
| request_id | Associated request |
| tiny_definition | Future structured field |
| eli5_explanation | Future structured field |
| analogy | Future structured field |
| mapping_table | Future structured field |
| where_analogy_breaks | Future structured field |
| mini_quiz | Future structured field |
| final_output | Full generated output |

Current MVP behavior:

- The full generated Markdown response is stored in `final_output`.
- Individual output sections are not yet split into separate columns.

### AgentTrace

Stores agent workflow evidence.

| Field | Description |
|---|---|
| request_id | Associated request |
| agent_name | Name of agent step |
| step_number | Workflow step number |
| input_summary | Short summary of input |
| output_summary | Short summary or raw output |
| score | Optional quality score |
| next_action | What happened next |

### Feedback

Stores user feedback from the live feedback form.

| Field | Description |
|---|---|
| request_id | Associated generated request |
| timestamp | Feedback timestamp |
| rating | User rating |
| feedback_text | User comments |
| too_simple | User marked explanation too simple |
| too_complex | User marked explanation too complex |
| analogy_wrong | User marked analogy wrong |
| not_fun | User marked output not fun |
| would_share | User would share the output |

---

## 8. Guardrails

Analogy Arcade includes several product guardrails:

| Guardrail | Purpose |
|---|---|
| Daily request cap | Protects free-tier AI quota |
| Server-side webhook call | Keeps webhook URLs and API keys out of browser JavaScript |
| Privacy note | Warns users not to enter sensitive information |
| “Where the analogy breaks” | Reduces risk of users overlearning a metaphor |
| Critic Agent | Reviews output quality before final response |
| Rewrite Agent | Improves explanation before publishing |
| Google Sheets logs | Supports debugging and product iteration |
| Feedback form | Captures user quality signals |
| Interactive quiz reveal | Hides the correct answer until the user selects an option |
| Selected-wrong quiz state | Shows the user’s wrong selection in amber while the correct answer appears in green |
| Sample card toggle | Lets users preview the app without consuming Gemini quota |
| Input summary | Makes the generated answer visibly tied to the user’s chosen topic, interest world, and audience |
| Progress tracker | Helps users understand which required inputs are complete |
| Back-to-top button | Improves navigation after generated content appears |

---

## 9. Free-Tier Constraints

This project is intentionally built with free or browser-based tools.

That creates real product constraints:

- Gemini free-tier quotas are limited.
- Multi-agent workflows consume multiple AI calls per user request.
- Public access needs daily caps.
- The app should avoid repeated unnecessary testing.
- The public demo may need a quota-safe mode later.
- The sample card exists so users can preview the experience without consuming AI quota.

These constraints are treated as product design inputs, not just technical limitations.

---

## 10. Current Architecture Decision

The current MVP uses a multi-step AI workflow:

```text
Explainer Agent
→ Critic Agent
→ Rewrite Agent
```

This demonstrates agentic orchestration clearly, but it consumes multiple AI calls per user request.

A future public-safe version may use a quota-safe composite agent mode:

```text
Single AI call
→ explanation
→ quality scorecard
→ visible workflow trace
```

This would reduce model usage while preserving the user-visible product experience.

The live app also includes a quota-free sample card so users can see the experience even when the AI request quota is exhausted.

---

## 11. Current UX Decisions

Current frontend UX decisions:

| Area | Decision |
|---|---|
| Interest world | Text field plus preset chips rather than dropdown |
| Custom interests | Any unmatched interest text becomes a custom interest world |
| Preset selection | Clicking selected preset again clears it |
| Audience level | Clickable single-select chips |
| Output style | Clickable multi-select chips |
| Quiz | Interactive answer reveal |
| Sample card | Toggle between show/hide without AI calls |
| Progress tracker | Right-side vertical tracker aligned to fields |
| Input summary | Large learning-card header with pill-styled parameters |
| Navigation | Auto-scroll to answer/sample while keeping action buttons visible |
| Back-to-top | Floating button appears only after scrolling down |

---

## 12. Future Improvements

Potential next steps:

1. Add screenshot gallery to GitHub Pages.
2. Add exportable/shareable learning cards.
3. Add structured JSON output from agents.
4. Split final output into separate Google Sheets columns.
5. Add conditional rewrite logic based on critic score.
6. Add quota-safe composite-agent mode for public demo usage.
7. Add model provider fallback using Groq or Cloudflare Workers AI.
8. Add public gallery of best outputs.
9. Add analytics dashboard from Google Sheets feedback.
10. Add a model comparison page.
11. Add access-code mode for controlled public beta usage.
12. Add separate AgentTrace rows for Explainer, Critic, and Rewrite.
13. Add automated sample-output publishing to GitHub or Google Docs.

---

## 13. Security Notes

This repo should never include:

- Gemini API keys
- Activepieces webhook URLs
- Google Sheet edit links
- Google Sheet IDs
- Apps Script project IDs
- Apps Script script properties
- Raw private user data
- User emails
- Secret tokens

The public repo should contain only:

- Product documentation
- Prompt templates
- Architecture notes
- Sample outputs
- Screenshots with sensitive data removed
- Public demo links
- Sanitized Apps Script source code
