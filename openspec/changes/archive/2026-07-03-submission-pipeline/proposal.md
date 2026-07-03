# Proposal: Registration Submission Pipeline

## Summary
Add a serverless backend pipeline for the Chola FC registration form that stores submissions in Zoho CRM and uses Zoho workflows for automated email notifications.

## Motivation
The registration form currently operates entirely client-side with no data persistence. Form data is discarded on submission, making it impossible for the Chola FC team to receive or process athlete applications.

## Goals
- Persist registration submissions to Zoho CRM for centralized management
- Use Zoho Auto Number for Application IDs (no race conditions)
- Prevent duplicate registrations by phone or email (409 Conflict)
- Send applicant confirmation email via Zoho workflow
- Notify academy staff via Zoho workflow
- Log submission activity in Zoho CRM
- Provide loading state, validation, and error handling during submission
- Keep the API independent of Zoho — swap CRM by rewriting one service file

## Non-goals
- Not building a full dashboard or admin UI (Zoho CRM handles that)
- Not modifying the existing contact form
- Not adding user authentication or login
- Not implementing payments or trial scheduling (future scope)

## Key Decisions
- Use Zoho Auto Number for Application ID (avoids race conditions from counting records)
- Store DOB only, not computed age
- No custom submission timestamp — use Zoho's Created Time
- Source field as enum for marketing channel tracking
- Multi-stage status pipeline in Zoho CRM
- Separate Zoho service layer (`services/zoho.ts`) from route handler
- OAuth endpoints (`api/auth/zoho/`) for one-time token setup; runtime uses refresh token directly
- Use Vercel serverless functions (matching existing Vercel deployment)
- API endpoint at `/api/v1/registrations` for future extensibility
