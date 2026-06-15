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

---

## 2. System Components

| Component | Role |
|---|---|
| GitHub Repo | Public source of truth for product docs, PRD, prompts, architecture, and showcase assets |
| GitHub Pages | Public project showcase site |
| Google Apps Script Web App | Browser-based front end and lightweight server-side wrapper |
| Activepieces | Workflow orchestration layer |
| Gemini API | AI model provider for generation, critique, and rewriting |
| Google Sheets | Lightweight backend for requests, outputs, agent traces, and feedback |
| Google Drive | Storage for project artifacts and generated docs if needed |

---

## 3. Request Lifecycle

1. User opens the Analogy Arcade web app.
2. User enters:
   - Topic
   - Interest world
   - Audience level
   - Output style
3. Apps Script generates a unique `request_id`.
4. Apps Script sends the request to the Activepieces `/sync` webhook.
5. Activepieces runs the AI workflow.
6. The request is logged to the `Requests` tab in Google Sheets.
7. The final output is logged to the `Outputs` tab.
8. The agent trace is logged to the `AgentTrace` tab.
9. The final response is returned to the Apps Script web app.
10. The user sees the final learning card in the browser.

---

## 4. Agent Workflow

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

## 5. Why This Is Agentic

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
| Daily cap | Protect free-tier quota |
| Public UI note | Set user expectations and reduce misuse |

This mirrors real AI product patterns where generation, evaluation, guardrails, and observability are treated as separate product concerns.

---

## 6. Data Model

### Requests

Stores the user request.

| Field | Description |
|---|---|
| request_id | Unique request identifier |
| timestamp | Time request was submitted |
| topic | Topic entered by user |
| interest_world | User-selected analogy world |
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

Reserved for future user feedback.

| Field | Description |
|---|---|
| request_id | Associated request |
| timestamp | Feedback timestamp |
| rating | User rating |
| feedback_text | User comments |
| too_simple | User marked explanation too simple |
| too_complex | User marked explanation too complex |
| analogy_wrong | User marked analogy wrong |
| not_fun | User marked output not fun |
| would_share | User would share the output |

---

## 7. Guardrails

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

---

## 8. Free-Tier Constraints

This project is intentionally built with free or browser-based tools.

That creates real product constraints:

- Gemini free-tier quotas are limited.
- Multi-agent workflows consume multiple AI calls per user request.
- Public access needs daily caps.
- The app should avoid repeated unnecessary testing.
- The public demo may need a quota-safe mode later.

These constraints are treated as product design inputs, not just technical limitations.

---

## 9. Current Architecture Decision

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

---

## 10. Future Improvements

Potential next steps:

1. Add structured JSON outputs so each section can be stored separately.
2. Add user feedback buttons.
3. Add a public gallery of best explanations.
4. Add custom user-provided interest worlds.
5. Add a quota-safe fallback mode.
6. Add multiple model provider support, such as Gemini and Groq or Cloudflare Workers AI.
7. Add a model comparison page.
8. Add basic analytics through Google Sheets or Looker Studio.
9. Add a sample output library to GitHub Pages.
10. Add an access-code mode for controlled public beta usage.

---

## 11. Security Notes

This repo should never include:

- Gemini API keys
- Activepieces webhook URLs
- Google Sheet edit links
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
