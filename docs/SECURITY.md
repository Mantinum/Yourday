# Security

## Supabase JWT
Auth tokens are verified against Supabase JWKS. In development the middleware falls back to a stubbed user id.

## Row Level Security
All tables include a `userId` column and are protected by RLS policies isolating data per user. Draft policies are available in `docs/RLS.sql`.

## PII encryption
Future work will encrypt personally identifiable information such as emails and addresses.
