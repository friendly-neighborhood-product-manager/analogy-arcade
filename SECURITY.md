# Security Notes

Analogy Arcade is a public portfolio project with a live demo. The project is intentionally designed so secrets are not stored in the GitHub repository or exposed in browser JavaScript.

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

---

## What To Do If a Secret Is Accidentally Committed

If a secret is accidentally committed:

1. Revoke or rotate the exposed key, webhook, or token immediately.
2. Remove the secret from the repository.
3. Rewrite Git history if needed.
4. Update Google Apps Script Properties with the new secret.
5. Test the live app again.
6. Document the incident and fix in the changelog if appropriate.

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

Future improvements could include:

- Access-code mode for controlled public beta
- Stronger rate limiting
- Anonymized analytics
- Clearer public data-retention policy
- A proper privacy page
- Provider-level quota monitoring
- Separate dev and production environments
- Safer logging and data deletion controls

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
