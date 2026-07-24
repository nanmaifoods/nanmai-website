-- ============================================================
-- NANMAI APPALAM – Enquiries (Contact Us form submissions)
-- Run this in your Supabase SQL Editor
-- ============================================================

CREATE TABLE enquiries (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  name       TEXT NOT NULL,
  email      TEXT NOT NULL,
  phone      TEXT,
  subject    TEXT NOT NULL,
  message    TEXT NOT NULL,
  status     TEXT NOT NULL DEFAULT 'new'
             CHECK (status IN ('new', 'read', 'replied'))
);

ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;

-- Anyone can submit an enquiry (contact form is public)
CREATE POLICY "Public can insert enquiries" ON enquiries
  FOR INSERT WITH CHECK (TRUE);

-- Only service role (admin) can read/update/delete
CREATE POLICY "Service role all enquiries" ON enquiries
  USING (auth.role() = 'service_role');
