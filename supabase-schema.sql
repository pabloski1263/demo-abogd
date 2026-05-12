-- Run this in the Supabase SQL Editor to set up the database

-- Table: site_content (single row storing all content as JSON)
CREATE TABLE IF NOT EXISTS site_content (
  id integer PRIMARY KEY DEFAULT 1,
  data jsonb NOT NULL,
  updated_at timestamptz DEFAULT now()
);

-- Insert initial content from data/content.json
-- (You can also import via the Supabase dashboard)
INSERT INTO site_content (id, data, updated_at)
VALUES (1, '{}', now())
ON CONFLICT (id) DO NOTHING;

-- Storage bucket for images
-- Create via Supabase Dashboard > Storage > New Bucket
-- Name: images
-- Public: true

-- Enable Row Level Security (optional, content is public-read)
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Public read access" ON site_content
  FOR SELECT USING (true);

-- Allow service role admin access
CREATE POLICY "Service role full access" ON site_content
  FOR ALL USING (auth.role() = 'service_role');
