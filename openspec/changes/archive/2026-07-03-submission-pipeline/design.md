# Design: Registration Submission Pipeline

## Project Structure

```
project/
├── api/
│   ├── auth/
│   │   └── zoho/
│   │       ├── index.ts          # GET — initiates OAuth, redirects to Zoho
│   │       └── callback.ts       # GET — handles OAuth callback, exchanges code for tokens
│   └── v1/
│       └── registrations.ts      # POST — creates records in Zoho CRM
├── src/
│   └── app/
│       └── pages/
│           └── Join.tsx          # Registration form (frontend)
├── services/
│   └── zoho.ts                   # ZohoService class (OAuth, search, create)
├── package.json
└── vercel.json
```

## OAuth 2.0 Flow (One-Time Setup)

```
Browser                          Vercel                           Zoho
  │                                │                                │
  │  GET /api/auth/zoho            │                                │
  │ ──────────────────────────────→│                                │
  │                                │  Redirect to Zoho Accounts     │
  │                                │  ?client_id=...                │
  │                                │  &redirect_uri=.../callback    │
  │                                │  &response_type=code           │
  │                                │  &scope=...                    │
  │                                │────────────────────────────────→│
  │                                │                                │
  │  User logs in & authorizes     │                                │
  │ ←───────────────────────────────────────────────────────────────│
  │                                │                                │
  │  Redirect to /api/auth/zoho/callback?code=xxx                   │
  │ ──────────────────────────────→│                                │
  │                                │  POST /token                   │
  │                                │  code + client_id + secret     │
  │                                │────────────────────────────────→│
  │                                │                                │
  │                                │  ← access_token + refresh_token│
  │                                │                                │
  │  Display refresh_token         │                                │
  │ ←──────────────────────────────│                                │
```

The refresh token is added to Vercel environment variables. The `/api/auth/zoho/` endpoints are never called again after setup — the refresh token is used directly by `services/zoho.ts` to generate access tokens.

## Runtime Architecture

```
Frontend (React/Vite)           Backend (Vercel)                   External
┌─────────────────────┐    ┌───────────────────────────┐    ┌──────────────────┐
│  Join.tsx           │    │  /api/v1/registrations    │    │  Zoho CRM        │
│  ┌───────────────┐  │    │  ┌─────────────────────┐  │    │  ┌────────────┐  │
│  │ Client-side   │──┼───→│  │ Route Handler       │──┼───→│  │ Duplicate  │  │
│  │ Validation    │  │    │  │ (validate, normalize)│  │    │  │ Check      │  │
│  └───────────────┘  │    │  └─────────┬───────────┘  │    │  │ (phone OR  │  │
│  ┌───────────────┐  │    │            ↓               │    │  │  email)    │  │
│  │ Loading       │  │    │  ┌─────────────────────┐  │    │  └──────┬─────┘  │
│  │ Spinner       │  │    │  │ Zoho Service        │  │    │         ↓        │
│  └───────────────┘  │    │  │ (services/zoho.ts)  │──┼───→│  ┌────────────┐  │
│  ┌───────────────┐  │    │  │ - Access Token      │  │    │  │ Create     │  │
│  │ Success/Error │←─┼────│  │ - Search            │  │    │  │ Record     │  │
│  │ Screen        │  │    │  │ - Create Record     │  │    │  └──────┬─────┘  │
│  └───────────────┘  │    │  └─────────────────────┘  │    │         ↓        │
│  ┌───────────────┐  │    │  ┌─────────────────────┐  │    │  ┌────────────┐  │
│  │ Application   │  │    │  │ 201 Response        │  │    │  │ Zoho       │  │
│  │ ID Displayed  │  │    │  │ + appId, crmRecordId│  │    │  │ Workflow   │  │
│  └───────────────┘  │    │  └─────────────────────┘  │    │  └────────────┘  │
└─────────────────────┘    └───────────────────────────┘    └──────────────────┘
```

## Layer Separation

Route handler (`/api/v1/registrations.ts`) handles:
- Parse request body
- Validate payload and normalize inputs
- Check age for guardian enforcement
- Call Zoho service
- Return response

Zoho service (`services/zoho.ts`) handles:
- Access token generation (refresh token → access token via Zoho Accounts API)
- Duplicate search (search Zoho by phone OR email)
- Record creation
- Error mapping

This keeps Zoho-specific logic isolated. Swapping to another CRM means rewriting `services/zoho.ts` — the route handler stays unchanged.

## API Contract

### POST /api/v1/registrations

**Request Body:**
```json
{
  "firstName": "string",
  "lastName": "string",
  "dob": "string (YYYY-MM-DD)",
  "gender": "string (Male|Female|Other)",
  "email": "string",
  "phone": "string (+91XXXXXXXXXX)",
  "address": "string",
  "parentName": "string (optional, required if under 18)",
  "parentPhone": "string (optional, required if under 18)",
  "program": "string",
  "experience": "string (Beginner|Intermediate|Advanced|Expert)",
  "school": "string (optional)",
  "medicalConditions": "string (optional)",
  "statementOfPurpose": "string (optional)",
  "source": "string (optional, default: Website)"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "applicationId": "CFC-2026-000043",
  "crmRecordId": "123456789",
  "message": "Registration submitted successfully."
}
```

**Duplicate Conflict Response (409):**
```json
{
  "success": false,
  "error": "An applicant with this phone or email is already registered."
}
```

**Validation Error Response (400):**
```json
{
  "success": false,
  "error": "Parent/Guardian fields are required for applicants under 18."
}
```

**Server Error Response (500):**
```json
{
  "success": false,
  "error": "An unexpected error occurred. Please try again."
}
```

## Serverless Route Handler (`/api/v1/registrations.ts`)

1. Parse request body
2. Normalize email: `email.trim().toLowerCase()`
3. Validate phone: 10 digits with `+91` prefix
4. Validate all required fields
5. Compute age from DOB (for guardian check only)
6. If under 18, require parent/guardian fields
7. Pass to `zohoService.register(data)`
8. Return 201 on success, 409 on duplicate, 400 on validation error, 500 on failure

## Zoho Service (`services/zoho.ts`)

```
class ZohoService {
  async getAccessToken(): Promise<string>
  async searchByPhoneOrEmail(phone: string, email: string): Promise<boolean>
  async createRecord(data: RegistrationData): Promise<{ applicationId, crmRecordId }>
}
```

- Uses `ZOHO_CLIENT_ID`, `ZOHO_CLIENT_SECRET`, `ZOHO_REFRESH_TOKEN` for OAuth
- Access token is generated from refresh token on each invocation (or cached with expiry check)
- Module name is read from `ZOHO_MODULE` env var (not hardcoded)

## Zoho CRM Field Mapping

| Form Field                | Zoho CRM Field       | Notes                              |
|---------------------------|----------------------|------------------------------------|
| Application ID            | Application_ID       | Zoho Auto Number field             |
| First Name                | First_Name           |                                    |
| Last Name                 | Last_Name            |                                    |
| DOB                       | Date_of_Birth        | Store DOB only, not age            |
| Gender                    | Gender               |                                    |
| Email                     | Email                | Normalized (trim, lowercase)       |
| Phone                     | Phone                | 10 digits +91                      |
| Address                   | Address              |                                    |
| Parent/Guardian Name      | Guardian_Name        | Required for minors                |
| Parent/Guardian Phone     | Guardian_Phone       | Required for minors                |
| Program                   | Program              |                                    |
| Football Experience       | Football_Experience  |                                    |
| School Name               | School_Name          |                                    |
| Medical Conditions        | Medical_Conditions   |                                    |
| Motivation                | Motivation           | Statement of Purpose               |
| Status                    | Status               | Default: "New"                     |
| Source                    | Source               | Enum (see below)                   |

## Source Enum

```
Website | Instagram | Facebook | Walk-in | Referral | Summer Camp | School Visit
```

Default: `Website`.

## Status Pipeline

```
New → Contact Attempted → Contacted → Trial Scheduled → Trial Completed → Admission Pending → Joined
                                                                                            → Rejected
                                                                                            → Closed
```

## Zoho Workflow

Configured in Zoho CRM to trigger on record creation in the configured module:

1. **Applicant Confirmation Email** — sends to the applicant's email with Application ID and thank-you message
2. **Staff Notification Email** — sends to `cholafootballclub@gmail.com` with applicant details
3. **Activity Log Entry** — creates a note/history entry in the record

## Future Extensibility

The API is designed so that without changing the frontend:
- Online payments can be added
- Trial scheduling can be added
- Attendance tracking can be added
- Student management can be added
- Zoho can be swapped for another CRM by rewriting only `services/zoho.ts`

## OAuth Endpoints

### GET /api/auth/zoho
Initiates the OAuth 2.0 flow. Redirects the browser to Zoho's authorization URL with `client_id`, `redirect_uri`, `response_type=code`, and `scope` (e.g., `ZohoCRM.modules.ALL,ZohoCRM.settings.ALL`).

### GET /api/auth/zoho/callback
Receives the `code` query parameter from Zoho, exchanges it for an access token and refresh token by POSTing to `https://accounts.zoho.in/oauth/v2/token`. Displays the refresh token so the developer can copy it into Vercel environment variables. This endpoint is only used during the one-time OAuth setup.

## Environment Variables

| Variable              | Description                                                 |
|-----------------------|-------------------------------------------------------------|
| `ZOHO_CLIENT_ID`      | Zoho API client ID (from Zoho API Console)                  |
| `ZOHO_CLIENT_SECRET`  | Zoho API client secret                                      |
| `ZOHO_REFRESH_TOKEN`  | Refresh token (obtained once via OAuth callback)            |
| `ZOHO_REDIRECT_URI`   | `https://organisation-site-1r334f2ph-gowreesh10s-projects.vercel.app/api/auth/zoho/callback` |
| `ZOHO_ACCOUNTS_URL`   | `https://accounts.zoho.in` (use `.com` for US region)       |
| `ZOHO_ORGANIZATION_ID`| Zoho organization ID                                        |
| `ZOHO_MODULE`         | Module name ("Academy_Registrations" or "Leads")            |
| `VITE_API_URL`        | Frontend API base URL (`/api/v1/registrations` in dev/prod) |
