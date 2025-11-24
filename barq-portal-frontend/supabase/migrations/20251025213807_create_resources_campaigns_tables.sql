/*
  # Create Resources and Campaigns Tables

  1. New Tables
    - `resource_campaigns`
      - Campaign information with type (campaign1, campaign2, campaign3)
      - Title, subtitle, descriptions, images/videos
    
    - `resource_campaign_features`
      - Features list for campaigns (bullets, icons)
    
    - `resource_submissions`
      - Form submissions from resource downloads

  2. Security
    - Enable RLS on all tables
    - Public read for campaigns
    - Public insert for submissions
    - Authenticated full access
*/

-- Resource Campaigns
CREATE TABLE IF NOT EXISTS resource_campaigns (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_type text NOT NULL CHECK (campaign_type IN ('campaign1', 'campaign2', 'campaign3')),
  title_en text NOT NULL,
  title_ar text,
  subtitle_en text,
  subtitle_ar text,
  description_en text,
  description_ar text,
  hero_image text,
  hero_video text,
  content_image text,
  cta_text_en text,
  cta_text_ar text,
  is_published boolean DEFAULT false,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE resource_campaigns ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public to read published campaigns"
  ON resource_campaigns FOR SELECT
  TO public
  USING (is_published = true);

CREATE POLICY "Allow authenticated users to manage campaigns"
  ON resource_campaigns FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Campaign Features/Bullets
CREATE TABLE IF NOT EXISTS resource_campaign_features (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id uuid REFERENCES resource_campaigns(id) ON DELETE CASCADE,
  title_en text NOT NULL,
  title_ar text,
  icon_url text,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE resource_campaign_features ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public to read features"
  ON resource_campaign_features FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow authenticated users to manage features"
  ON resource_campaign_features FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Resource Submissions (Form Data)
CREATE TABLE IF NOT EXISTS resource_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id uuid REFERENCES resource_campaigns(id) ON DELETE SET NULL,
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL,
  phone_country_code text NOT NULL,
  phone_number text NOT NULL,
  organization_name text NOT NULL,
  position text NOT NULL,
  resource_title text,
  submission_date timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE resource_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public to create submissions"
  ON resource_submissions FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to read submissions"
  ON resource_submissions FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to manage submissions"
  ON resource_submissions FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_campaigns_type ON resource_campaigns(campaign_type, is_published);
CREATE INDEX IF NOT EXISTS idx_campaigns_published ON resource_campaigns(is_published, display_order);
CREATE INDEX IF NOT EXISTS idx_features_campaign ON resource_campaign_features(campaign_id, display_order);
CREATE INDEX IF NOT EXISTS idx_submissions_campaign ON resource_submissions(campaign_id, submission_date DESC);
CREATE INDEX IF NOT EXISTS idx_submissions_email ON resource_submissions(email);
