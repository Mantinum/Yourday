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
