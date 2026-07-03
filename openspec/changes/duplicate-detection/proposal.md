# Duplicate Detection for Registrations

We will implement a pre-check before creating a new Lead in Zoho CRM to block duplicate submissions based on Email and Phone.

## Proposed Changes

### `services/zoho.ts`
- **[MODIFY] [zoho.ts](file:///c:/Users/gowre/workspace/organisation-site/services/zoho.ts)**
  - Add a new helper function `checkDuplicateLead(email: string, phone: string)`.
  - This function will use Zoho CRM's Search API (`/crm/v8/Leads/search`) using the `criteria` parameter to check if any existing Lead has the matching `Email` or `Phone`.
  - It will return `true` if a match is found (Status 200), and `false` if no match is found (Status 204 No Content).

### `api/v1/registrations.ts`
- **[MODIFY] [registrations.ts](file:///c:/Users/gowre/workspace/organisation-site/api/v1/registrations.ts)**
  - Import the new `checkDuplicateLead` function.
  - Before calling `createLead`, invoke `checkDuplicateLead(body.email, body.phone)`.
  - If a duplicate is detected, immediately return a `409 Conflict` HTTP status code with the JSON response: `{ success: false, error: "An application with this email or phone number already exists." }`.
  - This prevents the duplicate from reaching the `createLead` function and provides a clear error message that the frontend can eventually display.

## User Review Required

> [!NOTE]
> The search criteria checks BOTH email and phone. If either one matches an existing lead in the CRM, the registration will be blocked. Does this perfectly match your expectations?

## Verification Plan
1. Send a test registration with a completely new email and phone -> Should succeed.
2. Send a test registration with the same email but a new phone -> Should fail with duplicate error.
3. Send a test registration with a new email but the same phone -> Should fail with duplicate error.
