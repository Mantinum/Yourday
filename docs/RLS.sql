-- Draft RLS policies
ALTER TABLE "Recipient" ENABLE ROW LEVEL SECURITY;
CREATE POLICY "recipients_isolation" ON "Recipient"
  USING ("userId" = current_setting('request.jwt.claims.sub', true));

ALTER TABLE "Event" ENABLE ROW LEVEL SECURITY;
CREATE POLICY "events_isolation" ON "Event"
  USING ("userId" = current_setting('request.jwt.claims.sub', true));

ALTER TABLE "Recommendation" ENABLE ROW LEVEL SECURITY;
CREATE POLICY "reco_isolation" ON "Recommendation"
  USING ("userId" = current_setting('request.jwt.claims.sub', true));

ALTER TABLE "Order" ENABLE ROW LEVEL SECURITY;
CREATE POLICY "orders_isolation" ON "Order"
  USING ("userId" = current_setting('request.jwt.claims.sub', true));

ALTER TABLE "PaymentMethod" ENABLE ROW LEVEL SECURITY;
CREATE POLICY "pm_isolation" ON "PaymentMethod"
  USING ("userId" = current_setting('request.jwt.claims.sub', true));

ALTER TABLE "Job" ENABLE ROW LEVEL SECURITY;
CREATE POLICY "jobs_isolation" ON "Job"
  USING ("userId" = current_setting('request.jwt.claims.sub', true));

ALTER TABLE "AuditLog" ENABLE ROW LEVEL SECURITY;
CREATE POLICY "audit_isolation" ON "AuditLog"
  USING ("userId" = current_setting('request.jwt.claims.sub', true));
