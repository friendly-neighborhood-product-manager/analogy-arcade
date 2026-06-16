# Analogy Arcade Sample Outputs

This page shows example outputs from Analogy Arcade.

The live demo has a daily request cap because it uses free-tier AI limits, so these samples help reviewers understand the product even when the live demo is temporarily unavailable.

The current live app also includes:

- Custom interest text input
- Preset interest chips
- Audience-level chips
- Multi-select output-style chips
- Input summary pills
- Formatted learning cards
- Interactive mini quizzes
- Quota-free sample card preview
- Feedback capture

---

## Current Learning Card Pattern

Each generated answer card shows the user request at the top in this format:

> Explain `<topic>` in terms of `<interest world>` like I’m a `<audience level>`

In the live UI, the topic, interest world, and audience level appear as pill components.

Example:

> Explain `APIs` in terms of `Cricket` like I’m a `Newbie`

The answer card then includes:

1. Tiny definition
2. ELI5 explanation
3. Personalized analogy
4. Mapping table
5. Where the analogy breaks
6. Interactive mini quiz

---

## Interactive Quiz Behavior

The mini quiz is interactive in the live app.

Expected behavior:

- The user sees the question and answer options.
- The correct answer is hidden until the user clicks an option.
- If the user selects the correct answer, it turns green.
- If the user selects a wrong answer:
  - The selected wrong answer turns amber.
  - The correct answer turns green.
  - The unselected wrong options are greyed out.

The samples below show the quiz content. In the live app, these are rendered as clickable answer options.

---

## Sample 0: Quota-Free Sample Card

This is the sample card available through the **Show sample card** button in the live app.

It does not call Gemini and does not consume AI quota.

### Input Summary

> Explain `APIs` in terms of `Cricket` like I’m a `Newbie`

### Tiny Definition

An API is a way for one software system to talk to another software system using agreed rules.

### ELI5 Explanation

Imagine two apps want to work together. They need a clear way to ask for information and get an answer back. An API is that agreed way of communicating.

### Analogy

Think of APIs like cricket signals between a batter and a non-striker.

The players do not need to explain the whole strategy every time. A clear signal tells the other person what is needed: run, wait, call, or adjust. APIs work similarly. One system sends a clear request, and the other system responds in a predictable way.

### Mapping Table

| API concept | Cricket analogy |
|---|---|
| API | Shared signal system |
| App making request | Batter calling for a run |
| App responding | Non-striker reacting |
| API documentation | Team playbook |
| Response | The call being understood |
| Error | Miscommunication or wrong call |

### Where the Analogy Breaks

Cricket signals are informal and human. APIs are formal, technical interfaces that can include authentication, rate limits, data formats, and error codes.

### Mini Quiz

What is the main purpose of an API?

A. To let systems interact through agreed rules  
B. To replace all software developers  
C. To make every app public  

**Correct answer:** A

---

## Sample 1: OAuth Through Vacation Itineraries

### User Input

| Field | Value |
|---|---|
| Topic | OAuth |
| Interest world | Vacation itineraries |
| Audience level | Product Builder |
| Output style | ELI5 + analogy + mapping table + where the analogy breaks + mini quiz |

### Input Summary

> Explain `OAuth` in terms of `Vacation itineraries` like I’m a `Product Builder`

### Tiny Definition

OAuth is a way for one app to get limited permission to access something from another app without asking for your password.

### ELI5 Explanation

Imagine you want a travel concierge app to check your hotel booking. You do not give the app your full hotel account password. Instead, the hotel gives the app a temporary permission pass that says exactly what it can do.

That is the basic idea of OAuth: limited access, for a specific purpose, without sharing your actual password.

### Analogy

OAuth is like giving a travel concierge a temporary resort wristband.

The wristband proves the concierge has permission to do certain things, like book a cabana or check your spa reservation. But it does not let them enter your hotel room, open your safe, or change your whole vacation plan.

### Mapping Table

| OAuth concept | Vacation analogy |
|---|---|
| User | Traveler |
| App requesting access | Travel concierge |
| Authorization server | Hotel front desk |
| Access token | Temporary wristband |
| Scope | What the wristband allows |
| Expiration | When the wristband stops working |

### Where the Analogy Breaks

A wristband is usually visible and physical. OAuth tokens are digital, can be refreshed, and may involve more technical checks behind the scenes. The analogy helps explain limited permission, but not the full technical protocol.

### Mini Quiz

What is OAuth mainly trying to avoid?

A. Apps having to use the internet  
B. Apps getting your actual password  
C. Apps showing you a login screen  

**Correct answer:** B

---

## Sample 2: Product-Market Fit Through Football Tactics

### User Input

| Field | Value |
|---|---|
| Topic | Product-market fit |
| Interest world | Football tactics |
| Audience level | Product Builder |
| Output style | ELI5 + analogy + mapping table + where the analogy breaks + mini quiz |

### Input Summary

> Explain `Product-market fit` in terms of `Football tactics` like I’m a `Product Builder`

### Tiny Definition

Product-market fit means your product solves a real problem for a market that strongly wants it.

### ELI5 Explanation

Product-market fit is when users do not just try your product once. They keep coming back, recommend it, and would be upset if it disappeared.

### Analogy

Product-market fit is like finding a football tactic that perfectly matches your squad and opponent.

A manager can have a beautiful formation on paper, but if the players cannot execute it or the opponent easily shuts it down, it does not work. Product-market fit is when the formation, players, and match situation all click.

The team starts creating chances naturally. Players know their roles. Fans can see the momentum. The scoreboard finally reflects the plan.

### Mapping Table

| Product concept | Football analogy |
|---|---|
| Product | Formation or tactic |
| Market | Opponent and match context |
| Users | Players executing the system |
| Pain point | Weakness the tactic exploits |
| Retention | Tactic keeps creating chances |
| Word of mouth | Fans chanting about the system |

### Where the Analogy Breaks

Football matches have fixed time limits and clear scores. Markets are messier. Product-market fit can change over time as competitors, users, and needs evolve.

### Mini Quiz

Which signal best suggests product-market fit?

A. Users try the product once and forget it  
B. Users keep coming back and recommend it  
C. The product has a pretty landing page  

**Correct answer:** B

---

## Sample 3: Technical Debt Through Space Missions

### User Input

| Field | Value |
|---|---|
| Topic | Technical debt |
| Interest world | Space missions |
| Audience level | Tech Starter |
| Output style | ELI5 + analogy + mapping table + where the analogy breaks + mini quiz |

### Input Summary

> Explain `Technical debt` in terms of `Space missions` like I’m a `Tech Starter`

### Tiny Definition

Technical debt is the future cost created when a team chooses a faster or easier technical shortcut today.

### ELI5 Explanation

Sometimes teams build something quickly to hit a deadline. That can be okay, but shortcuts often need to be cleaned up later. If the team never fixes them, the product becomes harder to improve.

### Analogy

Technical debt is like using temporary patches on a spacecraft to make launch day.

Maybe the patch gets the rocket off the ground, but mission control needs to track it carefully. If too many temporary patches pile up, the mission becomes risky, repairs get harder, and every future maneuver takes longer.

### Mapping Table

| Technical debt concept | Space mission analogy |
|---|---|
| Shortcut | Temporary spacecraft patch |
| Codebase | Spacecraft system |
| Engineering team | Mission control |
| Refactoring | Scheduled maintenance |
| Bugs | Mission anomalies |
| Delayed cleanup | Increased mission risk |

### Where the Analogy Breaks

Software is usually easier to change than hardware in space. Technical debt is often manageable when tracked intentionally, while spacecraft failures can be much more immediate and dangerous.

### Mini Quiz

When is technical debt most dangerous?

A. When it is tracked and planned for  
B. When nobody knows it exists or keeps ignoring it  
C. When a team writes documentation  

**Correct answer:** B

---

## Sample 4: APIs Through Brick-by-Brick Builds

### User Input

| Field | Value |
|---|---|
| Topic | APIs |
| Interest world | Brick-by-brick builds |
| Audience level | Newbie |
| Output style | ELI5 + analogy + mapping table + where the analogy breaks + mini quiz |

### Input Summary

> Explain `APIs` in terms of `Brick-by-brick builds` like I’m a `Newbie`

### Tiny Definition

An API is a way for one software system to interact with another software system using agreed rules.

### ELI5 Explanation

An API lets apps talk to each other without needing to know every detail of how the other app works.

### Analogy

An API is like the connection points on toy building bricks.

You do not need to know how every brick was manufactured. You only need to know how pieces connect. If the studs and holes line up, you can build something bigger by combining parts.

APIs work the same way. One system exposes a clear way to connect, and another system uses that connection to request or send information.

### Mapping Table

| API concept | Brick-build analogy |
|---|---|
| API | Connection points between bricks |
| App using API | Builder |
| API documentation | Instruction booklet |
| Request | Asking for a specific brick connection |
| Response | The connected piece or result |
| Error | Pieces do not fit or wrong piece used |

### Where the Analogy Breaks

Bricks are physical and usually simple. APIs can involve authentication, rate limits, data formats, permissions, errors, and changing versions.

### Mini Quiz

What is the main role of an API?

A. Let systems interact through agreed rules  
B. Replace all software developers  
C. Store every password forever  

**Correct answer:** A

---

## Sample 5: Gross Margin Through Bollywood Drama

### User Input

| Field | Value |
|---|---|
| Topic | Gross margin |
| Interest world | Bollywood drama |
| Audience level | Curious Learner |
| Output style | ELI5 + analogy + mapping table + where the analogy breaks + mini quiz |

### Input Summary

> Explain `Gross margin` in terms of `Bollywood drama` like I’m a `Curious Learner`

### Tiny Definition

Gross margin is what is left from revenue after subtracting the direct cost of delivering the product or service.

### ELI5 Explanation

If a company sells something for $100 and it directly costs $60 to make or deliver it, the company has $40 left as gross profit. That $40 is the gross margin in dollars.

### Analogy

Gross margin is like the money left after producing the big song sequence.

The movie earns money from ticket sales, but the production team had direct costs: costumes, sets, dancers, lighting, and choreography. After paying those direct costs, whatever is left helps fund the rest of the movie business: marketing, offices, future films, and profit.

### Mapping Table

| Business concept | Bollywood analogy |
|---|---|
| Revenue | Ticket sales |
| Cost of goods sold | Cost of the song sequence |
| Gross profit | Money left after direct production costs |
| Gross margin percentage | How efficiently the scene earns compared to cost |
| Operating expenses | Studio overhead and marketing |
| Profitability | Whether the whole film makes money |

### Where the Analogy Breaks

A company may have many products, recurring revenue, and complex cost allocation. A movie scene is simpler and more contained than a full business model.

### Mini Quiz

If revenue is $100 and direct cost is $60, gross profit is:

A. $40  
B. $60  
C. $160  

**Correct answer:** A

---

## Sample 6: Kubernetes Through Football Tactics

### User Input

| Field | Value |
|---|---|
| Topic | Kubernetes |
| Interest world | Football tactics |
| Audience level | Tech Starter |
| Output style | ELI5 + analogy + mapping table + where the analogy breaks + mini quiz + make it shorter |

### Input Summary

> Explain `Kubernetes` in terms of `Football tactics` like I’m a `Tech Starter`

### Tiny Definition

Kubernetes is a system that helps run, manage, scale, and recover software containers.

### ELI5 Explanation

When many small pieces of software need to run together, Kubernetes helps decide where they should run, how many copies should exist, and what to do if one breaks.

### Analogy

Kubernetes is like a football manager coordinating a squad during a match.

The manager decides which players are on the pitch, adjusts the formation, replaces injured players, and makes sure the team keeps functioning even when something goes wrong.

### Mapping Table

| Kubernetes concept | Football analogy |
|---|---|
| Container | Player |
| Pod | Small unit of players working together |
| Cluster | Whole squad and staff |
| Scheduler | Manager deciding who plays where |
| Scaling | Adding more players to handle pressure |
| Self-healing | Substituting an injured player |

### Where the Analogy Breaks

Football players are humans with judgment and creativity. Containers are software units that follow defined rules. Kubernetes is more automated and technical than a manager shouting from the touchline.

### Mini Quiz

What is one major job of Kubernetes?

A. Manage and recover running containers  
B. Design football kits  
C. Replace all developers with one server  

**Correct answer:** A

---

## Sample 7: SaaS Pricing Through Arcade Games

### User Input

| Field | Value |
|---|---|
| Topic | SaaS pricing |
| Interest world | Arcade games |
| Audience level | Product Builder |
| Output style | ELI5 + analogy + mapping table + where the analogy breaks + mini quiz + make it funnier |

### Input Summary

> Explain `SaaS pricing` in terms of `Arcade games` like I’m a `Product Builder`

### Tiny Definition

SaaS pricing is how a software company charges customers for access to its online product.

### ELI5 Explanation

SaaS companies often charge based on usage, features, seats, or subscription tiers. The goal is to match price with value.

### Analogy

SaaS pricing is like an arcade deciding how people pay to play.

Some players buy one token at a time. Some buy an unlimited wristband. Some pay extra for premium machines. Some get a group pass. The arcade wants pricing that feels fair, encourages more play, and still keeps the lights on.

### Mapping Table

| SaaS pricing concept | Arcade analogy |
|---|---|
| Subscription | Monthly arcade pass |
| Usage-based pricing | Paying per game token |
| Feature tier | Access to premium machines |
| Seat-based pricing | Number of friends allowed on the pass |
| Free trial | First game free |
| Expansion revenue | Player buys more tokens or upgrades |

### Where the Analogy Breaks

Software value can be harder to measure than arcade usage. SaaS pricing also involves renewals, procurement, integrations, support costs, and competitive positioning.

### Mini Quiz

Which pricing model charges more as customers use more?

A. Usage-based pricing  
B. Random pricing  
C. One-time snack pricing  

**Correct answer:** A

---

## Why These Samples Matter

These outputs demonstrate the core product pattern:

| Product element | Purpose |
|---|---|
| User topic | Defines what the user wants to understand |
| Interest world | Personalizes the explanation |
| Audience level | Controls depth and tone |
| Input summary | Makes the user request visible in the answer card |
| Analogy | Creates a familiar mental model |
| Mapping table | Shows how the analogy maps to the concept |
| Where the analogy breaks | Prevents overlearning the metaphor |
| Interactive quiz | Turns passive reading into lightweight learning |
| Feedback form | Captures user quality signals |

The goal is not only to make learning fun, but also to avoid making a metaphor sound more complete than it really is.
