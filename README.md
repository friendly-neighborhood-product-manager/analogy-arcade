# Analogy-Arcade
Explain boring, confusing, or scary topics through things you may actually care about: 

- football ⚽️
- space 🛸
- Bollywood 🪩
- LEGO 🧱
- vacations 🏖️
- and other perfectly valid interests

------

**Pick a topic. Pick a vibe. Let AI turn “huh?” into “ohhh.”**

## Live Project

- **Showcase site:** https://friendly-neighborhood-product-manager.github.io/analogy-arcade/
- **Live demo:** https://script.google.com/macros/s/AKfycby8jV-vfUYrWbiCJnYuhQgHflsHHAe23kZl2Tx25CPFIvltbwJiekLE49PJ3vXSuMzZ/exec
- **PRD:** [docs/PRD.md](docs/PRD.md)
- **Agent architecture:** [docs/agent-architecture.md](docs/agent-architecture.md)
- **Architecture diagram:** [docs/architecture-diagram.md](docs/architecture-diagram.md)
- **Prompt design:** [docs/prompt-design.md](docs/prompt-design.md)
- **Sample outputs:** [docs/sample-outputs.md](docs/sample-outputs.md)
- **Evaluation & test plan:** [docs/evaluation-test-plan.md](docs/evaluation-test-plan.md)
- **Activepieces workflow runbook:** [docs/activepieces-workflow-runbook.md](docs/activepieces-workflow-runbook.md)

> Public beta note: the live demo uses free-tier AI limits and has a daily request cap. Please do not enter private, sensitive, confidential, medical, legal, or financial information.

Analogy Arcade is a browser-only AI learning app that explains any topic through worlds people already understand — football tactics, space missions, Bollywood drama, brick-by-brick builds, vacation itineraries, superhero-style teams, or a custom interest the user provides.

The goal is not just to generate cute analogies. The goal is to demonstrate how agentic AI workflows can make explanations clearer, safer, more personalized, and more useful.

---

## What it does

A user enters:

- A topic they want to understand
- A preset interest area or a custom interest world they relate to
- Their audience level
- The type of explanation they want

The app returns:

- An ELI5 explanation
- A personalized analogy
- A concept-to-analogy mapping table
- A “where the analogy breaks” section
- A mini quiz
- A visible agent workflow trace
- A quota-free sample card so users can preview the experience without using AI quota

---

## Example

**Topic:** OAuth  
**Explain it through:** Vacations  
**Audience:** Beginner PM  

**Output idea:**

OAuth is like giving a travel concierge a temporary pass that lets them check one part of your trip without handing over your passport, wallet, and hotel room key.

The analogy helps explain:

- User = traveler
- App = travel concierge
- Access token = temporary pass
- Scope = what the pass is allowed to access
- Expiration = when the pass stops working

The app also explains where the analogy breaks so users do not overlearn the metaphor.

---

## Why I’m building this

I am building Analogy Arcade as a personal AI product project to explore:

- Agentic workflows
- Prompt design
- AI evaluation
- Personalization
- Human-centered explanations
- Workflow automation
- Lightweight no-code/low-code product building
- Responsible AI guardrails

This project is intentionally designed to be built with free or browser-based tools.

---

## Planned stack

- **GitHub Pages** for the public showcase
- **Google Apps Script** for the browser-based app
- **Google Sheets** for lightweight storage and logs
- **Gemini API free tier** for AI generation
- **Activepieces** for workflow automation and agent orchestration
- **Google Drive / Docs** for generated artifacts

---

## Agent workflow concept

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
