# Tasks: Duplicate Detection

- [x] Implement `checkDuplicateLead(email: string, phone: string)` in `services/zoho.ts` using the Zoho CRM Search API (`/crm/v8/Leads/search`).
- [x] Export `checkDuplicateLead` from `services/zoho.ts`.
- [x] Import `checkDuplicateLead` in `api/v1/registrations.ts`.
- [x] Add the duplicate check logic in `api/v1/registrations.ts` before calling `createLead`.
- [x] Ensure the endpoint returns a `409 Conflict` status with JSON `{ success: false, error: "An application with this email or phone number already exists." }` if a duplicate is detected.
- [ ] (Optional) Update `Join.tsx` to explicitly handle the `409 Conflict` response by displaying the error message gracefully to the user.
