# Chola Sports Platform
## Product, Architecture & Execution Master Plan

**Version:** 2.0  
**Status:** Long-term source of truth  
**Primary customer/pilot:** Chola FC  
**Initial sport:** Football  
**Backend:** Django + Django REST Framework + PostgreSQL  
**Frontend:** React + Vite + React Router + Tailwind  
**Product direction:** Multi-tenant, multi-sport sports-management platform

---

# 1. How This Document Must Be Used

This document is the **long-term source of truth** for both the human team and coding agents.

It is **not** a requirement to build the entire future SaaS before Chola FC gets value.

The execution strategy is:

> **Build for Chola FC now. Architect for future organizations from the beginning. Generalize aggressively only when real requirements justify it.**

Chola FC is **Customer/Tenant #1** and Football is **Sport #1**.

The immediate goal is to make a useful production system for Chola FC as quickly and safely as possible.

The long-term goal is to evolve the same codebase into a product that can serve other clubs, academies, schools, colleges and sports organizations.

---

# 2. Product Vision

The product should eventually be:

> **A sports-management platform that helps clubs, academies, schools, colleges and sports organizations manage athletes, coaches, programs, teams, training, attendance and operations in one place.**

Chola FC is the first real customer and the first environment in which the product will be tested.

The product must **not** permanently depend on:

- Chola FC
- Football
- one specific coaching structure
- one specific organization
- one specific customer workflow

However, we should not build hypothetical features merely because another organization might need them someday.

---

# 3. The Most Important Principle

## Build for Chola FC. Architect for the future.

Every feature should pass this test:

### Good

Build:

`Attendance for Chola FC`

using:

`Organization → Team → TrainingSession → AttendanceRecord`

### Bad

Build:

`CholaFCPlayerAttendance`

or:

`CholaFCU15Attendance`

or hardcode:

`if organization == "Chola FC"`

The first approach solves today's real problem while keeping tomorrow's options open.

---

# 4. Current Situation

The existing repository began as a Chola FC-focused frontend/marketing application.

The audit identified:

- React/Vite frontend
- Tailwind CSS
- React Router
- Radix UI
- Chola FC-specific public pages
- player registration
- jersey ordering
- external webhook/CRM integrations
- no proper database
- no Django backend
- no authentication
- no tenant isolation
- no real operational dashboard

The existing frontend should **not be unnecessarily rewritten**.

The backend should now become the system of record.

---

# 5. Immediate Goal

## Do NOT build the whole SaaS now.

The immediate objective is:

> **Build the backend required to turn the existing Chola FC frontend into a real operational application.**

The first useful system should allow Chola FC to manage:

1. users
2. organization membership
3. athletes
4. guardians
5. staff/coaches
6. sports
7. programs
8. batches
9. teams
10. team memberships
11. training sessions
12. attendance

After that, connect the existing React frontend to the backend.

---

# 6. What Must Be Generalized Now

These foundations should be generic from the beginning because doing so is relatively inexpensive and prevents future rewrites.

## Core entities

- User
- Organization
- OrganizationMembership
- Sport
- AthleteProfile
- AthleteSportProfile
- GuardianProfile
- Guardian-Athlete relationship
- StaffProfile
- Program
- Batch
- Team
- TeamMembership
- TrainingSession
- AttendanceRecord
- Facility

These entities should not contain Chola-specific assumptions.

---

# 7. What Does NOT Need to Be Generalized Now

Do not build unnecessary abstraction for:

- every possible sport
- every possible sports statistic
- every possible payment provider
- every possible tournament format
- every possible organization structure
- enterprise billing
- advanced analytics
- AI scouting
- social networking
- livestreaming
- native mobile apps

Build these only when real requirements appear.

---

# 8. Product Evolution

The intended evolution is:

```text
Stage 1
Chola FC + Football
        ↓
Stage 2
Chola FC Production System
        ↓
Stage 3
Second Football Organization
        ↓
Stage 4
Multi-Organization Football Platform
        ↓
Stage 5
Multi-Sport Platform
        ↓
Stage 6
Commercial Sports SaaS
```

Do not skip directly from Stage 1 to Stage 6.

---

# 9. Domain Model

## 9.1 Organization

An Organization is the top-level tenant.

Example:

```text
Organization
    name: Chola FC
    slug: chola-fc
```

Future:

```text
Chola FC
ABC Football Academy
XYZ Cricket Academy
```

Every organization-owned operational record must be traceable to its organization.

---

# 10. User vs Athlete vs Staff vs Guardian

These are different concepts.

## User

A global login identity.

A User may belong to one or more organizations.

## OrganizationMembership

Connects:

```text
User ↔ Organization
```

and defines the user's role within that organization.

Example:

```text
Gowreesh
    ↓
Chola FC
    ↓
Admin
```

## AthleteProfile

Represents the actual athlete in an organization's operational system.

An athlete may have no login.

This is important for minors.

Example:

```text
Athlete
    ↓
Guardian
```

Later, an adult athlete can receive/link a User account.

## StaffProfile

Represents coaches, managers and other staff.

## GuardianProfile

Represents parents/guardians responsible for one or more athletes.

---

# 11. AthleteSportProfile

Sport-specific athlete information should not be placed directly into the generic AthleteProfile.

Use a relationship conceptually equivalent to:

```text
Athlete
    +
Sport
    +
Organization
    +
Sport-specific attributes
```

Example:

```text
Athlete
 ├── Football profile
 │     position = goalkeeper
 │     preferred_foot = right
 │
 └── Cricket profile
       batting_style = right-hand
       bowling_style = fast
```

Flexible sport-specific attributes may use JSONB, but the backend must validate the structure.

Do not create arbitrary unvalidated JSON that the frontend controls.

---

# 12. Program, Batch and Team

These are intentionally separate.

## Program

A structured training/development offering.

Example:

```text
Junior Football Development
```

## Batch

A scheduled group within a program.

Example:

```text
Junior Football Development
    ↓
Saturday Morning Batch
    6:00 AM – 8:00 AM
```

## Team

An operational/competitive roster.

Example:

```text
Chola FC U15
```

A team may exist independently of a program.

Do not permanently couple:

```text
Program = Team
```

because that will restrict future use cases.

---

# 13. Team Membership

Do not store only a permanent `team_id` on AthleteProfile.

Use a membership/enrollment record.

It should support history such as:

- athlete
- team
- start date
- end date
- status

This allows:

```text
U13 → U15 → U17
```

without destroying historical records.

---

# 14. Training Sessions

A TrainingSession represents an actual scheduled training event.

Example:

```text
Chola FC U15
07 Oct 2026
06:00 – 08:00
Venue: Chola Ground
```

A session may belong to a team and/or batch depending on the actual use case.

---

# 15. Attendance

Attendance is one of the first high-value features.

Example:

```text
Training Session
        ↓
Athletes
        ↓
PRESENT
ABSENT
LATE
EXCUSED
```

The system must preserve:

- who marked attendance
- when it was marked
- athlete
- session
- status

A session should not have duplicate attendance records for the same athlete.

---

# 16. Chola FC MVP

The first production MVP is:

```text
Authentication
      ↓
Organization
      ↓
Membership / Roles
      ↓
Athletes
      ↓
Guardians
      ↓
Staff
      ↓
Sport
      ↓
Program
      ↓
Batch
      ↓
Team
      ↓
Team Membership
      ↓
Training Session
      ↓
Attendance
```

## MVP user workflows

### Admin

Admin can:

- log in
- manage organization information
- manage athletes
- manage guardians
- manage staff
- create programs
- create batches
- create teams
- assign athletes
- create training sessions
- view attendance

### Coach

Coach can:

- log in
- see assigned teams
- see roster
- open today's training session
- mark attendance
- edit attendance when permitted
- see basic attendance summary

### Parent/Guardian

Parent/guardian can:

- log in
- see linked children
- see upcoming/recent sessions
- see attendance history

---

# 17. MVP Definition of Done

The MVP is successful when a real Chola FC workflow works end-to-end.

### Coach workflow

```text
Login
 ↓
Open Team
 ↓
Open Training Session
 ↓
View Roster
 ↓
Mark Attendance
 ↓
Save
 ↓
Attendance persists in PostgreSQL
```

### Parent workflow

```text
Login
 ↓
Select Child
 ↓
View Sessions
 ↓
View Attendance History
```

### Admin workflow

```text
Login
 ↓
Create Athlete
 ↓
Create Program/Batch/Team
 ↓
Assign Athlete
 ↓
Create Training Session
 ↓
Coach can use it
```

If these workflows work reliably, the first MVP has real value.

---

# 18. Backend Technology

## Required

- Python
- Django 5.x
- Django REST Framework
- PostgreSQL
- environment-based configuration
- automated tests

## Authentication

Use a secure token-based API authentication approach appropriate for the React SPA.

JWT may be used if it fits the implementation.

Do not add OAuth/social login until there is a real requirement.

## Redis / Celery

Do NOT add Redis/Celery merely because the long-term architecture mentions them.

Introduce them only when a real background-job requirement exists.

Examples:

- scheduled notifications
- large report generation
- asynchronous integrations

---

# 19. Django App Structure

Recommended:

```text
apps/backend/
│
├── config/
│
├── apps/
│   ├── core/
│   ├── authentication/
│   ├── organizations/
│   ├── sports/
│   ├── facilities/
│   ├── members/
│   ├── teams/
│   ├── schedules/
│   └── attendance/
│
├── tests/
│
├── manage.py
└── requirements/
```

Keep app boundaries meaningful.

Do not create dozens of tiny Django apps without a reason.

---

# 20. Database Principles

Use PostgreSQL.

Major domain entities should use UUIDs where appropriate.

Use:

- foreign keys
- unique constraints
- indexes
- timestamps
- appropriate deletion behavior
- historical records where required

Never destroy historical operational data merely to simplify implementation.

---

# 21. Multi-Tenant Security

This is a foundational requirement.

Every organization-owned record must be scoped to an organization.

The frontend must never be trusted to decide which organization a user is allowed to access.

The security chain should be conceptually:

```text
Authentication
      ↓
User
      ↓
Organization Membership
      ↓
Active Organization
      ↓
Permission Check
      ↓
Tenant-Scoped Query
      ↓
Resource Access
```

Never rely only on:

```text
request.data["organization_id"]
```

Never trust a frontend-supplied organization ID.

Never allow:

```text
User from Organization A
       ↓
access Organization B data
```

This must have automated tests.

---

# 22. Mandatory Tenant Isolation Tests

At minimum test:

```text
Organization A user
    cannot read
Organization B athletes
```

```text
Organization A user
    cannot modify
Organization B teams
```

```text
Organization A user
    cannot access
Organization B attendance
```

```text
Organization A API request
    cannot create data
    under Organization B
```

Tenant isolation is more important than adding another feature.

---

# 23. Frontend Strategy

Do not rewrite the existing frontend unnecessarily.

Gradually evolve it into:

```text
Public Website
    ↓
Authentication
    ↓
Application Dashboard
       ├── Admin
       ├── Coach
       └── Parent
```

Keep:

- React
- Vite
- React Router
- Tailwind
- Radix/shadcn-style primitives where useful

For server state, use a proper query/data-fetching approach when the application grows.

For forms, standardize validation rather than duplicating validation logic across pages.

---

# 24. Chola-Specific vs Generic Frontend

It is completely acceptable for the public website to be Chola FC-specific.

For example:

```text
/chola-fc
```

branding and marketing content can remain Chola-specific.

But the application data layer should not be.

Bad:

```text
CholaFCPlayers
CholaFCTeams
CholaFCAttendance
```

Good:

```text
organizations
athletes
teams
attendance
```

The application can display:

```text
Chola FC
```

because the current tenant is Chola FC.

---

# 25. API Principles

Use versioned APIs:

```text
/api/v1/
```

Initial conceptual endpoints:

```text
/api/v1/auth/
/api/v1/me/
/api/v1/organizations/current/
/api/v1/sports/
/api/v1/programs/
/api/v1/batches/
/api/v1/teams/
/api/v1/teams/{id}/roster/
/api/v1/athletes/
/api/v1/guardians/
/api/v1/staff/
/api/v1/sessions/
/api/v1/sessions/{id}/attendance/
```

Exact endpoint design may evolve during implementation.

Do not freeze every URL before implementation experience exists.

---

# 26. What We Are NOT Building Now

Explicitly postpone:

- payment gateway
- subscription billing
- automated invoices
- e-commerce
- jersey store redesign
- advanced player analytics
- AI scouting
- video analysis
- tournament generator
- social feed
- chat
- livestreaming
- native mobile application
- advanced facility management
- multi-branch enterprise management
- self-service organization onboarding
- automated SaaS billing
- custom domains
- complex notification infrastructure
- additional sports modules

These can be added when justified.

---

# 27. Existing Jersey / Registration Features

The current Chola frontend already contains registration and jersey-order functionality.

Do not blindly delete them.

First determine whether they should become:

1. backend-managed workflows, or
2. remain temporary integrations during the MVP.

Registration is closer to the core product and may eventually create an Athlete/Guardian record.

Jersey/e-commerce should remain separate from the core operational domain until there is a clear business reason to integrate it.

Do not allow jersey ordering to delay the core athlete/team/attendance system.

---

# 28. Execution Roadmap

## Phase 0 — Backend Foundation

**Current phase.**

Build only:

- Django project
- PostgreSQL configuration
- environment configuration
- DRF setup
- project structure
- custom User foundation
- health endpoint
- basic test setup
- development documentation

Do not build the full domain model in Phase 0.

Do not redesign the frontend.

### Definition of Done

Backend starts correctly, connects to PostgreSQL, tests run, health endpoint works, environment configuration is clean, and the repository structure is ready.

---

# 29. Phase 1 — Identity and Organization

Build:

- User
- Organization
- OrganizationMembership
- roles
- authentication
- current-user endpoint
- current-organization context
- permission foundation
- tenant isolation tests

### Definition of Done

Gowreesh can log in and access Chola FC only through a valid membership.

---

# 30. Phase 2 — Chola FC Operational Core

Build:

- Sport
- AthleteProfile
- AthleteSportProfile
- GuardianProfile
- Guardian-Athlete relationship
- StaffProfile
- Program
- Batch
- Team
- TeamMembership

Seed:

```text
Organization = Chola FC
Sport = Football
```

Do not create cricket/basketball functionality yet.

### Definition of Done

Chola FC's real athletes, coaches, programs, batches and teams can be represented correctly.

---

# 31. Phase 3 — Training and Attendance

Build:

- TrainingSession
- AttendanceRecord
- coach access
- roster view
- attendance marking
- attendance history
- basic summaries

### Definition of Done

A coach can use a phone/browser during a real training session and complete attendance without needing manual database work.

---

# 32. Phase 4 — Frontend Integration

Connect the existing React application to the Django API.

Build:

- login
- admin dashboard
- coach dashboard
- parent dashboard
- athlete management
- team management
- session management
- attendance UI

Do not rewrite the public Chola website unless necessary.

---

# 33. Phase 5 — Chola FC Pilot

Use the system with real Chola FC operations.

Do not immediately start selling it.

Observe:

- what coaches actually use
- what admins actually use
- where users get confused
- what data is missing
- what workflows are slow
- what users still do through WhatsApp/Excel/manual records

Fix those problems.

---

# 34. Customer #2

Only after Chola FC has been used successfully should we actively onboard another organization.

Preferably start with another:

- football academy
- football club
- sports academy

Compare:

```text
Chola FC requirement
+
Customer #2 requirement
```

Anything common should become stronger platform functionality.

Anything truly organization-specific should remain configurable or organization-specific.

---

# 35. Multi-Sport Expansion

Only after the core has been validated with multiple organizations should we add additional sports.

Potential sports:

- Cricket
- Basketball
- Badminton
- Tennis
- Athletics

The core should remain:

```text
Organization
Athlete
Staff
Program
Batch
Team
Session
Attendance
```

Sport-specific functionality should extend the core instead of polluting it.

---

# 36. Feature Decision Framework

Before building a feature, ask:

### 1. Does Chola FC actually need it?

If no, don't prioritize it.

### 2. Does it solve a real operational problem?

If no, don't build it.

### 3. Is it common across sports organizations?

If yes, consider making it core.

### 4. Is it specific to one sport?

If yes, keep it outside the generic core.

### 5. Is it specific to Chola FC?

If yes, don't force it into the generic architecture.

### 6. Does it introduce tenant-security risk?

If yes, review security before implementation.

### 7. Does it require a new domain concept?

If yes, review the data model before coding.

### 8. Can the feature wait?

If yes, postpone it.

---

# 37. Architecture Red Flags

Agents must stop and flag these patterns:

```python
if organization.name == "Chola FC":
```

inside generic business logic.

Also flag:

```python
if sport == "football":
```

inside generic models/services where a sport-specific extension would be more appropriate.

Other red flags:

- trusting frontend organization IDs
- forcing every athlete to have a login
- putting `team_id` permanently on AthleteProfile
- coupling Program and Team
- putting football-specific columns in generic AthleteProfile
- business logic inside React components
- duplicate backend/frontend validation with conflicting rules
- deleting historical attendance/team membership records
- adding dependencies without a clear reason
- adding infrastructure merely because it may be useful someday
- silently changing the architecture

---

# 38. Coding Agent Rules

Every coding agent working on this project must follow these rules.

## Rule 1 — Read before editing

Inspect:

- repository structure
- existing implementation
- relevant models
- existing APIs
- existing frontend flow
- this document

before making changes.

## Rule 2 — Do the smallest safe change

Do not refactor unrelated code.

## Rule 3 — Do not silently change architecture

If a task conflicts with this document:

**STOP and explain the conflict before implementing.**

## Rule 4 — Chola-specific requirements are allowed

Chola FC is the current customer.

A feature can be built specifically for Chola FC when the requirement is genuinely customer-specific.

But do not contaminate reusable core models/services unnecessarily.

## Rule 5 — Do not over-generalize

Do not build abstractions just because they might be useful in five years.

## Rule 6 — Security first

Any change involving:

- organization
- membership
- permissions
- users
- athletes
- guardians
- API access

must consider tenant isolation.

## Rule 7 — Test the actual workflow

Do not only test individual functions.

Where appropriate test:

```text
login
→ organization
→ team
→ session
→ attendance
→ saved data
```

## Rule 8 — Preserve historical data

Attendance, team membership and operational history should not be casually deleted.

## Rule 9 — Explain assumptions

If a requirement is ambiguous, state the assumption.

## Rule 10 — Report exactly what changed

Every agent task should end with:

- files changed
- models/API changed
- migrations created
- tests added
- tests run
- known limitations
- architectural concerns
- next recommended step

---

# 39. Master Prompt for Coding Agents

Use the following prompt when giving work to a coding agent:

---

## CHOLA SPORTS PLATFORM — MASTER AGENT INSTRUCTION

You are working on the Chola Sports Platform.

Read and follow the project's **Product, Architecture & Execution Master Plan** before making changes.

### Product strategy

Chola FC is the first and currently only customer.

Football is the first sport.

The immediate objective is to build a useful production system for Chola FC.

The long-term objective is a multi-tenant, multi-sport sports-management SaaS platform.

Therefore:

> Build for Chola FC now, but architect reusable foundations so future organizations can use the same system without a major rewrite.

Do NOT build the entire future SaaS now.

Do NOT build hypothetical features without a real requirement.

Do NOT hardcode Chola FC into generic business logic.

### Current technology

Backend:

- Django 5.x
- Django REST Framework
- PostgreSQL

Frontend:

- React
- Vite
- React Router
- Tailwind

### Core domain

Use these concepts where applicable:

- User
- Organization
- OrganizationMembership
- Sport
- AthleteProfile
- AthleteSportProfile
- GuardianProfile
- StaffProfile
- Program
- Batch
- Team
- TeamMembership
- TrainingSession
- AttendanceRecord
- Facility

### Important domain rules

1. Organization is the tenant.
2. Users and organizational roles are separate concepts.
3. Athletes do not have to have login accounts.
4. Guardians can manage/link minor athletes.
5. Sport-specific athlete data must not pollute the generic athlete model.
6. Program, Batch and Team are different concepts.
7. Team membership must preserve history.
8. Backend is the source of truth.
9. Tenant isolation is mandatory.
10. Chola FC-specific functionality is allowed when genuinely required.

### Before coding

1. Inspect the repository.
2. Inspect relevant existing code.
3. Identify the exact files affected.
4. Explain the implementation approach.
5. Identify security and tenant-isolation implications.
6. Identify whether the change is:
   - core
   - Chola-specific
   - sport-specific
   - future-only

Do not make unrelated changes.

### While coding

- Make the smallest safe implementation.
- Follow existing project conventions where they are sound.
- Do not introduce unnecessary dependencies.
- Do not add Redis/Celery/microservices unless required.
- Do not redesign the frontend unless the task requires it.
- Do not hardcode Chola FC into generic domain logic.
- Do not trust frontend tenant identifiers.
- Preserve historical data.
- Add appropriate tests.

### Before finishing

Run appropriate:

- unit tests
- API tests
- migration checks
- lint/type checks where available
- tenant-isolation tests for relevant changes

Then report:

1. What was changed
2. Why it was changed
3. Files changed
4. Database/migration changes
5. API changes
6. Tests added/run
7. Security considerations
8. Known limitations
9. Recommended next step

If the requested implementation conflicts with this Master Plan, **do not silently choose a new architecture. Stop and explain the conflict.**

---

# 40. Immediate Agent Task

The next agent task should be small.

## Task: Initialize Django Backend

Requirements:

- create `apps/backend/`
- initialize Django 5.x
- configure Django REST Framework
- configure PostgreSQL through environment variables
- establish environment configuration
- create custom User foundation
- create health-check endpoint
- establish test structure
- establish clean Django app boundaries
- do not modify the frontend
- do not implement the entire domain
- do not implement payments
- do not implement attendance yet
- do not add Redis/Celery
- do not add unnecessary dependencies

At the end, the agent must report:

```text
Backend created
Database configuration ready
Custom User foundation ready
Health endpoint ready
Tests ready
Frontend untouched
Next step: Identity & Organization
```

---

# 41. What Success Looks Like

Do not measure success by:

- number of Django models
- number of API endpoints
- number of pages
- number of sports supported
- number of features

Measure success by whether real users can complete useful workflows.

The first three workflows are:

### Workflow 1 — Coach

```text
Login
→ Team
→ Training Session
→ Roster
→ Attendance
→ Save
```

### Workflow 2 — Parent

```text
Login
→ Child
→ Schedule
→ Attendance History
```

### Workflow 3 — Admin

```text
Login
→ Athlete
→ Program
→ Batch
→ Team
→ Session
→ Attendance
```

If these work reliably for Chola FC, the product is moving in the right direction.

---

# 42. Long-Term Business Direction

The eventual business should not be:

> "Software for Chola FC."

It should become:

> **Sports management software for clubs, academies, schools, colleges and sports organizations.**

Chola FC is the first customer and real-world testing environment.

The correct progression is:

```text
Chola FC
   ↓
Real operational usage
   ↓
Product improvements
   ↓
Second organization
   ↓
Validated common workflows
   ↓
Multi-organization platform
   ↓
Additional sports
   ↓
SaaS business
```

Do not attempt to reach the final stage before validating the earlier stages.

---

# 43. Architecture Change Policy

Architecture can change.

This document is a source of truth, not a prison.

If a better architecture becomes necessary, document:

1. Current architecture
2. Problem with current approach
3. Proposed approach
4. Benefits
5. Migration cost
6. Security implications
7. Tenant implications
8. Effect on current Chola FC workflows
9. Effect on future customers
10. Decision

Only then implement the architectural change.

---

# 44. Final Rules

Remember these above everything else:

### Rule 1

**Chola FC comes first.**

The product must provide real value to them now.

### Rule 2

**Do not hardcode Chola FC into the reusable core.**

### Rule 3

**Do not build the future SaaS before the current product works.**

### Rule 4

**Generalize foundations, not fantasies.**

### Rule 5

**Use real Chola FC usage to decide what to build next.**

### Rule 6

**A second customer is more valuable than ten hypothetical features.**

### Rule 7

**Tenant isolation and data integrity are non-negotiable.**

### Rule 8

**Keep the architecture simple until complexity is justified.**

### Rule 9

**The backend is the source of truth.**

### Rule 10

> **Build a useful product for Chola FC today, without making Chola FC the reason the product cannot serve anyone else tomorrow.**

---

# 45. Current Execution Checklist

## NOW

- [ ] Create Django backend
- [ ] Configure PostgreSQL
- [ ] Configure environment variables
- [ ] Create custom User
- [ ] Health endpoint
- [ ] Test foundation

## NEXT

- [ ] Organization
- [ ] OrganizationMembership
- [ ] Authentication
- [ ] Roles
- [ ] Tenant isolation

## THEN

- [ ] Sport
- [ ] AthleteProfile
- [ ] AthleteSportProfile
- [ ] GuardianProfile
- [ ] StaffProfile
- [ ] Program
- [ ] Batch
- [ ] Team
- [ ] TeamMembership

## THEN

- [ ] TrainingSession
- [ ] AttendanceRecord
- [ ] Coach workflow
- [ ] Parent workflow
- [ ] Admin workflow

## THEN

- [ ] Connect React frontend
- [ ] Test with Chola FC
- [ ] Fix real-world problems
- [ ] Deploy pilot

## ONLY AFTER VALIDATION

- [ ] Customer #2
- [ ] Generalize validated workflows
- [ ] Multi-sport expansion
- [ ] SaaS billing
- [ ] Commercial onboarding

---

# Final Product Rule

> **Do not optimize for the number of features. Optimize for a small number of workflows that real sports organizations use every day.**

The first goal is not to build a huge sports platform.

The first goal is:

> **Make Chola FC's daily operations meaningfully easier.**

If we do that with a clean multi-tenant foundation, the same product can grow into the sports platform we envisioned.
