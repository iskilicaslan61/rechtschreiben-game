-- ============================================================
-- RLS Policies — Rechtschreiben Spiel
-- Supabase SQL Editor'da çalıştır
-- ============================================================

-- ── 1. RLS'i etkinleştir ──────────────────────────────────

alter table "User"         enable row level security;
alter table "GameSession"  enable row level security;
alter table "Progress"     enable row level security;
alter table "Question"     enable row level security;

-- ── 2. User tablosu ──────────────────────────────────────
-- Kullanıcı kendi profilini okuyabilir
create policy "user_select_own"
  on "User" for select
  to authenticated
  using ( id = (select auth.uid()::text) );

-- Kullanıcı kendi profilini güncelleyebilir
create policy "user_update_own"
  on "User" for update
  to authenticated
  using ( id = (select auth.uid()::text) )
  with check ( id = (select auth.uid()::text) );

-- Ebeveyn, kendi çocuklarını görebilir
create policy "parent_select_children"
  on "User" for select
  to authenticated
  using ( "parentId" = (select auth.uid()::text) );

-- ── 3. GameSession tablosu ───────────────────────────────
-- Kullanıcı kendi oturumlarını okuyabilir
create policy "session_select_own"
  on "GameSession" for select
  to authenticated
  using ( "userId" = (select auth.uid()::text) );

-- Kullanıcı kendi oturumunu oluşturabilir
create policy "session_insert_own"
  on "GameSession" for insert
  to authenticated
  with check ( "userId" = (select auth.uid()::text) );

-- Ebeveyn, çocukların oturumlarını görebilir
create policy "parent_select_child_sessions"
  on "GameSession" for select
  to authenticated
  using (
    exists (
      select 1 from "User" child
      where child.id = "GameSession"."userId"
        and child."parentId" = (select auth.uid()::text)
    )
  );

-- ── 4. Progress tablosu ──────────────────────────────────
-- Kullanıcı kendi ilerlemesini okuyabilir
create policy "progress_select_own"
  on "Progress" for select
  to authenticated
  using ( "userId" = (select auth.uid()::text) );

-- Kullanıcı kendi ilerlemesini güncelleyebilir
create policy "progress_update_own"
  on "Progress" for update
  to authenticated
  using ( "userId" = (select auth.uid()::text) )
  with check ( "userId" = (select auth.uid()::text) );

-- Kullanıcı kendi ilerlemesini oluşturabilir
create policy "progress_insert_own"
  on "Progress" for insert
  to authenticated
  with check ( "userId" = (select auth.uid()::text) );

-- Ebeveyn, çocukların ilerlemesini görebilir
create policy "parent_select_child_progress"
  on "Progress" for select
  to authenticated
  using (
    exists (
      select 1 from "User" child
      where child.id = "Progress"."userId"
        and child."parentId" = (select auth.uid()::text)
    )
  );

-- ── 5. Question tablosu ──────────────────────────────────
-- Tüm giriş yapmış kullanıcılar soruları okuyabilir (oyun içeriği)
create policy "question_select_authenticated"
  on "Question" for select
  to authenticated
  using ( true );

-- Sadece service_role soruları ekleyebilir/güncelleyebilir (seed script)
-- (RLS service_role'ü bypass eder — ekstra policy gerekmez)
