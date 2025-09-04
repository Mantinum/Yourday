# Security

## Supabase JWT
Auth tokens should be verified against Supabase JWKS (`SUPABASE_JWKS_URL`). In development the API accepts an `X-User-Id` header and defaults to a stubbed user id when none is provided.

## Job idempotence
Worker jobs are queued with deterministic ids (`reco:${eventId}:${yyyy-mm-dd}`) and each execution is recorded in `AuditLog` to prevent duplicates.

## Row Level Security
All tables include a `userId` column and are protected by RLS policies isolating data per user. Draft policies are available in `docs/RLS.sql`.

## PII encryption
Future work will encrypt personally identifiable information such as emails and addresses.
