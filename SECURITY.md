# Security Notes

Analogy Arcade is a public portfolio project with a live demo. The project is intentionally designed so secrets are not stored in the GitHub repository or exposed in browser JavaScript.

The current public MVP includes:

- Google Apps Script web app
- Activepieces workflow
- Gemini API free-tier model calls
- Google Sheets backend
- GitHub Pages showcase
- Custom interest input
- Preset chips
- Audience chips
- Output-style chips
- Input progress tracker
- Input summary pills
- Interactive mini quiz
- Feedback capture
- Quota-free sample card
- Daily request cap

---

## Secrets That Must Never Be Committed

Do not commit or publish:

- Gemini API keys
- Activepieces webhook URLs
- Google Sheet edit links
- Google Sheet IDs
- Apps Script project IDs
- Apps Script script properties
- Google account emails from logs
- Raw private user submissions
- OAuth tokens
- Any copied request or response containing private data
- Any screenshots that reveal private URLs, keys, tokens, or account details

---

## Where Secrets Are Stored

Secrets and private configuration are stored in **Google Apps Script Properties**, not in GitHub.

Current script properties:

| Property | Purpose |
|---|---|
| `ACTIVEPIECES_WEBHOOK_SYNC_URL` | Activepieces `/sync` webhook URL |
| `DAILY_REQUEST_LIMIT` | Daily app-level usage cap |
| `ANALOGY_ARCADE_BACKEND_SHEET_ID` | Private Google Sheet backend ID |

---

## Public-Safe Files

These files are safe to publish because they do not include secrets:

| File | Why it is safe |
|---|---|
| `appscript/Code.gs` | Uses script properties instead of hardcoded secrets |
| `appscript/Index.html` | Calls Apps Script server-side functions, not model APIs directly |
| `docs/PRD.md` | Product documentation only |
| `docs/agent-architecture.md` | Architecture documentation only |
| `docs/architecture-diagram.md` | Architecture documentation only |
| `docs/prompt-design.md` | Prompt templates without API keys |
| `docs/sample-outputs.md` | Sanitized examples |
| `docs/evaluation-test-plan.md` | Evaluation documentation only |
| `docs/activepieces-workflow-runbook.md` | Workflow documentation without private webhook URLs |
| `README.md` | Public project overview |
| `SECURITY.md` | Public security posture and secret-handling notes |

---

## Frontend Security Design

The live web app does not call Gemini or Activepieces directly from browser JavaScript.

Instead, the request path is:

```text
Browser UI
→ Google Apps Script server-side function
→ Activepieces webhook
→ Gemini workflow
→ Google Sheets logging
→ Response returned to browser
```

This keeps the Activepieces webhook URL and Gemini API key out of the frontend.

The browser only calls Apps Script server-side functions such as:

- `generateExplanation(...)`
- `submitFeedback(...)`

---

## Apps Script Server-Side Responsibilities

The Apps Script backend is responsible for:

| Responsibility | Why it matters |
|---|---|
| Reading webhook URL from Script Properties | Keeps private webhook out of GitHub and browser JavaScript |
| Creating request IDs | Ties requests, outputs, traces, and feedback together |
| Enforcing daily request cap | Protects free-tier Gemini quota |
| Calling Activepieces server-side | Prevents exposing automation endpoint to frontend code |
| Returning sanitized response to browser | Keeps frontend simple |
| Writing feedback to Google Sheets | Captures quality signals without exposing Sheet edit links |

---

## Usage Protection

The app includes a daily request cap to protect free-tier AI quota.

Configured property:

```text
DAILY_REQUEST_LIMIT
```

Current MVP value:

```text
3
```

This protects against accidental overuse and public demo abuse.

The app also includes a quota-free sample card so users and reviewers can preview the product without triggering Gemini or Activepieces.

---

## User Data Policy for MVP

The app warns users not to enter:

- Private information
- Sensitive information
- Confidential work content
- Medical information
- Legal questions requiring advice
- Financial information requiring advice

The project should be treated as a public demo, not a private or enterprise-grade application.

---

## Data Collected in the MVP

The MVP stores lightweight product data in Google Sheets.

### Requests

May include:

- Request ID
- Timestamp
- Topic
- Interest world
- Audience level
- Output style
- Status

### Outputs

May include:

- Request ID
- Generated response
- Final output Markdown

### AgentTrace

May include:

- Request ID
- Agent name
- Step number
- Critic output or summary
- Next action

### Feedback

May include:

- Request ID
- Rating
- Feedback text
- Too simple flag
- Too complex flag
- Analogy wrong flag
- Not fun flag
- Would share flag

The MVP does not intentionally collect user accounts, passwords, payment data, or sensitive personal information.

---

## Responsible AI Guardrails

Analogy Arcade includes several product-level guardrails:

- Privacy and quota note in the UI
- Daily request cap
- Server-side calls to Activepieces
- Critic Agent quality review
- Rewrite Agent improvement step
- “Where the analogy breaks” section
- User feedback capture
- High-stakes topic caveats in prompts
- Avoidance of copyrighted lyrics, movie dialogue, logos, and protected assets
- Interactive quiz answer reveal only after user selection
- Quota-free sample card for safe previewing

---

## Frontend UX Safety Notes

The current frontend includes several UX features that reduce confusion and improve trust:

| UX feature | Safety / trust value |
|---|---|
| Input summary pills | Shows exactly what the user asked for |
| Progress tracker | Makes required inputs clear |
| Quota-free sample card | Allows preview without consuming model quota |
| Interactive quiz | Reveals the answer only after a user choice |
| Feedback form | Lets users report poor analogies or confusing outputs |
| Back-to-top button | Improves navigation after long generated output |
| Daily quota warning | Sets expectations for public demo usage |

---

## Copyright and Brand Safety

The app should avoid generating or publishing:

- Copyrighted song lyrics
- Movie dialogue
- Scripts
- Logos
- Protected brand assets
- Official character art
- Unlicensed images
- Long verbatim copyrighted text

The app may use broad, generic interest worlds such as:

- Superhero-style teams
- Bollywood drama
- Football tactics
- Space missions
- Brick-by-brick builds
- Vacation itineraries

These are intended as generic themes, not as copies of protected franchises or assets.

---

## What To Do If a Secret Is Accidentally Committed

If a secret is accidentally committed:

1. Revoke or rotate the exposed key, webhook, or token immediately.
2. Remove the secret from the repository.
3. Rewrite Git history if needed.
4. Update Google Apps Script Properties with the new secret.
5. Test the live app again.
6. Document the incident and fix in the changelog if appropriate.

Examples:

| Exposed secret | Immediate action |
|---|---|
| Gemini API key | Revoke key in Google AI Studio and create a new one |
| Activepieces webhook URL | Rotate/recreate webhook or flow endpoint |
| Google Sheet ID/edit link | Revoke sharing or create a new backend sheet |
| Apps Script project ID | Review project permissions and remove exposure |
| OAuth token | Revoke token immediately |

---

## Public Demo Limitations

This is a portfolio MVP, not a production app.

Known limitations:

- No user authentication
- No abuse-detection system beyond the daily cap
- No production database
- No enterprise logging
- No data retention controls beyond manual Google Sheet management
- No formal privacy policy yet
- No automated moderation beyond prompt-level guardrails
- No encrypted application database
- No role-based access control
- No automatic deletion of submitted prompts or feedback
- No dedicated incident response process
- No separate development and production environments

Future improvements could include:

- Access-code mode for controlled public beta
- Stronger rate limiting
- Anonymized analytics
- Clearer public data-retention policy
- A proper privacy page
- Provider-level quota monitoring
- Separate dev and production environments
- Safer logging and data deletion controls
- Automatic redaction of sensitive user inputs
- Admin dashboard for deleting test data

---

## Security Design Summary

Analogy Arcade follows a simple security principle:

```text
Public repo shows the product.
Private script properties hold the secrets.
Server-side functions call private services.
The browser never sees API keys or webhook URLs.
```

This is enough for a public portfolio MVP and demonstrates responsible handling of secrets, quota protection, and public-demo risk.
