/**
 * Centralized Application Environment Configuration
 * Reads strictly from environment variables (.env) without hardcoding private URLs in source code.
 */
export const ENV = {
  JERSEY_ORDER_WEBHOOK_URL:
    import.meta.env.VITE_JERSEY_ORDER_WEBHOOK_URL || "",
  SITE_URL: import.meta.env.VITE_SITE_URL || "https://www.cholafc.com",
  API_URL: import.meta.env.VITE_API_URL || "/api/v1",
} as const;
