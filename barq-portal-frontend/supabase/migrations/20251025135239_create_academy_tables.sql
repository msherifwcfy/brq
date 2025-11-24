/*
  # Create Academy CMS Tables

  ## Overview
  Creates tables for managing Academy page content including hero section, highlights, 
  foundation tracks, and internship programs.

  ## New Tables
  
  ### `academy_hero`
  - `id` (uuid, primary key) - Unique identifier
  - `logo_url` (text) - Academy logo image URL
  - `title_en` (text) - Hero title in English
  - `title_ar` (text) - Hero title in Arabic
  - `description_en` (text) - Hero description in English
  - `description_ar` (text) - Hero description in Arabic
  - `background_image_url` (text) - Hero background image
  - `created_at` (timestamptz) - Record creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### `academy_highlights`
  - `id` (uuid, primary key) - Unique identifier
  - `section_title_en` (text) - Section title in English
  - `section_title_ar` (text) - Section title in Arabic
  - `section_subtitle_en` (text) - Section subtitle in English
  - `section_subtitle_ar` (text) - Section subtitle in Arabic
  - `section_description_en` (text) - Section description in English
  - `section_description_ar` (text) - Section description in Arabic
  - `created_at` (timestamptz) - Record creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### `academy_highlight_cards`
  - `id` (uuid, primary key) - Unique identifier
  - `title_en` (text) - Card title in English
  - `title_ar` (text) - Card title in Arabic
  - `icon_url` (text) - Icon image URL
  - `card_type` (text) - Type: internships, trainings, seminars, graduates
  - `stat_1_value` (text) - First statistic value
  - `stat_1_label_en` (text) - First statistic label in English
  - `stat_1_label_ar` (text) - First statistic label in Arabic
  - `stat_2_value` (text) - Second statistic value
  - `stat_2_label_en` (text) - Second statistic label in English
  - `stat_2_label_ar` (text) - Second statistic label in Arabic
  - `stat_3_value` (text) - Third statistic value
  - `stat_3_label_en` (text) - Third statistic label in English
  - `stat_3_label_ar` (text) - Third statistic label in Arabic
  - `display_order` (integer) - Display order
  - `created_at` (timestamptz) - Record creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### `academy_foundation_tracks`
  - `id` (uuid, primary key) - Unique identifier
  - `title_en` (text) - Track title in English
  - `title_ar` (text) - Track title in Arabic
  - `subtitle_en` (text) - Track subtitle in English
  - `subtitle_ar` (text) - Track subtitle in Arabic
  - `description_en` (text) - Track description in English
  - `description_ar` (text) - Track description in Arabic
  - `image_url` (text) - Track image URL
  - `display_order` (integer) - Display order
  - `created_at` (timestamptz) - Record creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### `academy_internship_programs`
  - `id` (uuid, primary key) - Unique identifier
  - `title_en` (text) - Program title in English
  - `title_ar` (text) - Program title in Arabic
  - `description_en` (text) - Program description in English
  - `description_ar` (text) - Program description in Arabic
  - `image_url` (text) - Program image URL
  - `display_order` (integer) - Display order
  - `created_at` (timestamptz) - Record creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ## Security
  - RLS enabled on all tables
  - Authenticated users can view all content
  - Only authenticated users can modify content
*/

-- Academy Hero Section
CREATE TABLE IF NOT EXISTS academy_hero (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  logo_url text DEFAULT '',
  title_en text DEFAULT '',
  title_ar text DEFAULT '',
  description_en text DEFAULT '',
  description_ar text DEFAULT '',
  background_image_url text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE academy_hero ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view academy hero"
  ON academy_hero FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert academy hero"
  ON academy_hero FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update academy hero"
  ON academy_hero FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Academy Highlights Section
CREATE TABLE IF NOT EXISTS academy_highlights (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  section_title_en text DEFAULT '',
  section_title_ar text DEFAULT '',
  section_subtitle_en text DEFAULT '',
  section_subtitle_ar text DEFAULT '',
  section_description_en text DEFAULT '',
  section_description_ar text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE academy_highlights ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view academy highlights"
  ON academy_highlights FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert academy highlights"
  ON academy_highlights FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update academy highlights"
  ON academy_highlights FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Academy Highlight Cards
CREATE TABLE IF NOT EXISTS academy_highlight_cards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title_en text DEFAULT '',
  title_ar text DEFAULT '',
  icon_url text DEFAULT '',
  card_type text DEFAULT 'internships',
  stat_1_value text DEFAULT '',
  stat_1_label_en text DEFAULT '',
  stat_1_label_ar text DEFAULT '',
  stat_2_value text DEFAULT '',
  stat_2_label_en text DEFAULT '',
  stat_2_label_ar text DEFAULT '',
  stat_3_value text DEFAULT '',
  stat_3_label_en text DEFAULT '',
  stat_3_label_ar text DEFAULT '',
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE academy_highlight_cards ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view academy highlight cards"
  ON academy_highlight_cards FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert academy highlight cards"
  ON academy_highlight_cards FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update academy highlight cards"
  ON academy_highlight_cards FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete academy highlight cards"
  ON academy_highlight_cards FOR DELETE
  TO authenticated
  USING (true);

-- Academy Foundation Tracks
CREATE TABLE IF NOT EXISTS academy_foundation_tracks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title_en text DEFAULT '',
  title_ar text DEFAULT '',
  subtitle_en text DEFAULT '',
  subtitle_ar text DEFAULT '',
  description_en text DEFAULT '',
  description_ar text DEFAULT '',
  image_url text DEFAULT '',
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE academy_foundation_tracks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view academy foundation tracks"
  ON academy_foundation_tracks FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert academy foundation tracks"
  ON academy_foundation_tracks FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update academy foundation tracks"
  ON academy_foundation_tracks FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete academy foundation tracks"
  ON academy_foundation_tracks FOR DELETE
  TO authenticated
  USING (true);

-- Academy Internship Programs
CREATE TABLE IF NOT EXISTS academy_internship_programs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title_en text DEFAULT '',
  title_ar text DEFAULT '',
  description_en text DEFAULT '',
  description_ar text DEFAULT '',
  image_url text DEFAULT '',
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE academy_internship_programs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view academy internship programs"
  ON academy_internship_programs FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert academy internship programs"
  ON academy_internship_programs FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update academy internship programs"
  ON academy_internship_programs FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete academy internship programs"
  ON academy_internship_programs FOR DELETE
  TO authenticated
  USING (true);