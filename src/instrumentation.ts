import * as Sentry from "@sentry/nextjs";

export function register() {
  if (process.env.NEXT_RUNTIME === "nodejs" || process.env.NEXT_RUNTIME === "edge") {
    Sentry.init({
      dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
      tracesSampleRate: process.env.NODE_ENV === "production" ? 0.2 : 1.0,
      enabled: Boolean(process.env.NEXT_PUBLIC_SENTRY_DSN),
    });
  }
}

export const onRequestError = Sentry.captureRequestError;
