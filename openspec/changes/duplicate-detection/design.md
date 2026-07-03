# Design Document: Duplicate Detection

## Context
We are implementing duplicate detection to prevent users from submitting multiple registrations for the Chola FC academy if they have already registered with the same Email or Phone number.

## Architecture
We will use Zoho CRM's Search API (`/crm/v8/Leads/search`) via a new helper function in `services/zoho.ts`. This search will be executed before attempting to create the Lead in `api/v1/registrations.ts`.

## Implementation Details

### Zoho Search API Integration
The Search API allows querying using the `criteria` query parameter.
```
((Email:equals:example@domain.com)or(Phone:equals:1234567890))
```
If the API returns HTTP 204 No Content, no duplicates exist.
If the API returns HTTP 200 OK with data, a duplicate exists.

### Serverless Function Updates
In `api/v1/registrations.ts`, after basic input validation but before `createLead`, we will call `checkDuplicateLead`.
If true, we respond immediately with `409 Conflict` and a JSON error message indicating a duplicate was found.

## Alternatives Considered
- **Upsert API**: We considered using Zoho's Upsert API to overwrite the existing Lead. However, the requirement is strictly to block and reject duplicates, so Search is the correct approach.
- **Unique Fields in Zoho**: We could configure Zoho CRM to enforce uniqueness on Email/Phone and just parse the 400 error. However, a proactive Search provides a cleaner error handling flow in our API layer without relying on Zoho layout constraints.
