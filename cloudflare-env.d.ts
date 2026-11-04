declare namespace Cloudflare {
  interface Env {
    DB?: D1Database;
    BUCKET?: R2Bucket;
    RESEND_API_KEY?: string;
    resend_api_key?: string;
    NOTIFICATION_FROM?: string;
    NOTIFICATION_TEMPLATE_ID?: string;
    NOTIFICATION_ENABLED?: string;
    NOTIFICATION_JOB_SECRET?: string;
  }
}
