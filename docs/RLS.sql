alter table "User" enable row level security;
alter table "Recipient" enable row level security;
alter table "Event" enable row level security;
alter table "Recommendation" enable row level security;
alter table "RecommendationItem" enable row level security;
alter table "Order" enable row level security;
alter table "PaymentMethod" enable row level security;
alter table "Job" enable row level security;

create policy "user_isolation_user"
on "User" for select using (id::text = auth.uid()::text);

create policy "user_isolation_fk_referencing_user"
on "Recipient" for all using (userId::text = auth.uid()::text) with check (userId::text = auth.uid()::text);
-- TODO: replicate for other tables
