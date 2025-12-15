-- Ensure team_members has a name column for storing full name of team member
alter table public.team_members
  add column if not exists name text;


