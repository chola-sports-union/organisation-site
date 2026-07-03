# Tasks: Registration Submission Pipeline

## Client-Side

- [ ] Change API endpoint from `/api/register` to `/api/v1/registrations`
- [ ] Add client-side validation to Join.tsx (email pattern, phone 10 digits +91, required fields)
- [ ] Add loading state to submit button (spinner + "Submitting..." text)
- [ ] Disable all form inputs during submission
- [ ] Wire form submit to POST `/api/v1/registrations` with JSON payload
- [ ] Handle 201 success response — display Application ID and crmRecordId, hide form, show success screen
- [ ] Handle 409 conflict response — show "already registered" message
- [ ] Handle 400/500 error response — show error message, keep form data intact

## OAuth Setup (One-Time)

- [ ] Create `api/auth/zoho/index.ts` — redirects to Zoho authorization URL
- [ ] Create `api/auth/zoho/callback.ts` — exchanges code for tokens, displays refresh token
- [ ] Register a Zoho Self-Client in Zoho API Console
- [ ] Set Authorized Redirect URI to `https://organisation-site-1r334f2ph-gowreesh10s-projects.vercel.app/api/auth/zoho/callback`
- [ ] Run the OAuth flow once by visiting `GET /api/auth/zoho` in browser
- [ ] Copy the displayed refresh token into Vercel environment variables

## Serverless API

- [ ] Create `api/v1/registrations.ts` Vercel serverless function (route handler)
- [ ] Create `services/zoho.ts` with ZohoService class (separate from route handler)
- [ ] Parse and validate incoming request body
- [ ] Normalize email: `trim().toLowercase()`
- [ ] Validate phone: 10 digits with `+91` country code
- [ ] Compute age from DOB for guardian enforcement (do NOT store age)
- [ ] Enforce conditional guardian requirement (required if age < 18)
- [ ] Implement Zoho OAuth 2.0 token management (refresh token → access token via Zoho Accounts API)
- [ ] Implement duplicate check: search Zoho by phone OR email before creating
- [ ] Implement Zoho record creation with field mapping
- [ ] Return 201 with `applicationId`, `crmRecordId`, and success message
- [ ] Return 409 for duplicate detection
- [ ] Return 400 for validation errors, 500 for server errors
- [ ] Log failures

## Zoho CRM Configuration

- [ ] Create custom module "Academy Registrations" in Zoho CRM (or configure Leads module with custom fields)
- [ ] Set up Zoho Auto Number field for Application ID (format: CFC-YYYY-NNNNNN)
- [ ] Configure environment variables in Vercel project:
  - [ ] `ZOHO_CLIENT_ID`
  - [ ] `ZOHO_CLIENT_SECRET`
  - [ ] `ZOHO_REFRESH_TOKEN`
  - [ ] `ZOHO_REDIRECT_URI` = https://organisation-site-1r334f2ph-gowreesh10s-projects.vercel.app/api/auth/zoho/callback
  - [ ] `ZOHO_ACCOUNTS_URL` = https://accounts.zoho.in
  - [ ] `ZOHO_ORGANIZATION_ID`
  - [ ] `ZOHO_MODULE`
- [ ] Configure Zoho Workflow to trigger on record creation:
  - [ ] Applicant confirmation email template
  - [ ] Staff notification email to cholafootballclub@gmail.com
  - [ ] Activity log entry
- [ ] Configure Zoho Mail to send from the organization domain
