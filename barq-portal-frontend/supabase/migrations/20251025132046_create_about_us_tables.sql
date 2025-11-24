/*
  # Create About Us Content Management Tables

  ## Overview
  Creates tables for managing the "About Us" page content with internationalization support.

  ## New Tables
  
  ### 1. `about_us_hero`
  Main hero section for About Us page
  - `id` (uuid, primary key)
  - `section_label` (text) - "Who We Are" label - Arabic
  - `headline` (text) - Main headline - Arabic
  - `description_1` (text) - First paragraph - Arabic
  - `description_2` (text) - Second paragraph - Arabic
  - `background_image_id` (bigint) - Reference to media
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 2. `about_us_hero_translations`
  - `id` (uuid, primary key)
  - `hero_id` (uuid) - Reference to about_us_hero
  - `language` (text) - Language code
  - `section_label` (text)
  - `headline` (text)
  - `description_1` (text)
  - `description_2` (text)

  ### 3. `about_us_group`
  Group section content
  - `id` (uuid, primary key)
  - `section_label` (text) - Arabic
  - `headline` (text) - Arabic
  - `description` (text) - Arabic
  - `logo_image_id` (bigint)
  - `stat_countries` (text)
  - `stat_employees` (text)
  - `stat_companies` (text)
  - `stat_portfolios` (text)

  ### 4. `about_us_group_translations`
  - Similar structure for translations

  ### 5. `about_us_mission_vision`
  Mission and Vision content
  - `id` (uuid, primary key)
  - `section_label` (text) - Arabic
  - `section_headline` (text) - Arabic
  - `mission_title` (text) - Arabic
  - `mission_description` (text) - Arabic
  - `vision_title` (text) - Arabic
  - `vision_description` (text) - Arabic

  ### 6. `about_us_mission_vision_translations`
  - Translation table

  ### 7. `about_us_core_values`
  Core values section header
  - `id` (uuid, primary key)
  - `section_label` (text) - Arabic
  - `headline` (text) - Arabic
  - `description` (text) - Arabic

  ### 8. `about_us_core_values_translations`
  - Translation table

  ### 9. `about_us_core_value_items`
  Individual core value items
  - `id` (uuid, primary key)
  - `name` (text) - Arabic
  - `icon` (text) - Icon identifier
  - `order` (integer)

  ### 10. `about_us_core_value_items_translations`
  - Translation table

  ### 11. `about_us_journey`
  Journey section header
  - `id` (uuid, primary key)
  - `section_label` (text) - Arabic
  - `headline` (text) - Arabic

  ### 12. `about_us_journey_translations`
  - Translation table

  ### 13. `about_us_journey_milestones`
  Journey milestone entries
  - `id` (uuid, primary key)
  - `year` (text)
  - `title` (text) - Arabic
  - `description` (text) - Arabic
  - `image_id` (bigint)
  - `order` (integer)

  ### 14. `about_us_journey_milestones_translations`
  - Translation table

  ## Security
  - All tables have RLS enabled
  - Public can view data
  - Only authenticated users can modify content
*/

-- About Us Hero
CREATE TABLE IF NOT EXISTS about_us_hero (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  section_label text NOT NULL DEFAULT '',
  headline text NOT NULL DEFAULT '',
  description_1 text NOT NULL DEFAULT '',
  description_2 text NOT NULL DEFAULT '',
  background_image_id bigint,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE about_us_hero ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view about us hero"
  ON about_us_hero FOR SELECT TO public USING (true);

CREATE POLICY "Authenticated users can insert about us hero"
  ON about_us_hero FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Authenticated users can update about us hero"
  ON about_us_hero FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Authenticated users can delete about us hero"
  ON about_us_hero FOR DELETE TO authenticated USING (true);

-- About Us Hero Translations
CREATE TABLE IF NOT EXISTS about_us_hero_translations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  hero_id uuid NOT NULL REFERENCES about_us_hero(id) ON DELETE CASCADE,
  language text NOT NULL DEFAULT 'en',
  section_label text NOT NULL DEFAULT '',
  headline text NOT NULL DEFAULT '',
  description_1 text NOT NULL DEFAULT '',
  description_2 text NOT NULL DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(hero_id, language)
);

ALTER TABLE about_us_hero_translations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view about us hero translations"
  ON about_us_hero_translations FOR SELECT TO public USING (true);

CREATE POLICY "Authenticated users can insert about us hero translations"
  ON about_us_hero_translations FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Authenticated users can update about us hero translations"
  ON about_us_hero_translations FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Authenticated users can delete about us hero translations"
  ON about_us_hero_translations FOR DELETE TO authenticated USING (true);

-- About Us Group
CREATE TABLE IF NOT EXISTS about_us_group (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  section_label text NOT NULL DEFAULT '',
  headline text NOT NULL DEFAULT '',
  description text NOT NULL DEFAULT '',
  logo_image_id bigint,
  stat_countries text NOT NULL DEFAULT '',
  stat_employees text NOT NULL DEFAULT '',
  stat_companies text NOT NULL DEFAULT '',
  stat_portfolios text NOT NULL DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE about_us_group ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view about us group"
  ON about_us_group FOR SELECT TO public USING (true);

CREATE POLICY "Authenticated users can insert about us group"
  ON about_us_group FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Authenticated users can update about us group"
  ON about_us_group FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Authenticated users can delete about us group"
  ON about_us_group FOR DELETE TO authenticated USING (true);

-- About Us Group Translations
CREATE TABLE IF NOT EXISTS about_us_group_translations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id uuid NOT NULL REFERENCES about_us_group(id) ON DELETE CASCADE,
  language text NOT NULL DEFAULT 'en',
  section_label text NOT NULL DEFAULT '',
  headline text NOT NULL DEFAULT '',
  description text NOT NULL DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(group_id, language)
);

ALTER TABLE about_us_group_translations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view about us group translations"
  ON about_us_group_translations FOR SELECT TO public USING (true);

CREATE POLICY "Authenticated users can insert about us group translations"
  ON about_us_group_translations FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Authenticated users can update about us group translations"
  ON about_us_group_translations FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Authenticated users can delete about us group translations"
  ON about_us_group_translations FOR DELETE TO authenticated USING (true);

-- About Us Mission Vision
CREATE TABLE IF NOT EXISTS about_us_mission_vision (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  section_label text NOT NULL DEFAULT '',
  section_headline text NOT NULL DEFAULT '',
  mission_title text NOT NULL DEFAULT '',
  mission_description text NOT NULL DEFAULT '',
  vision_title text NOT NULL DEFAULT '',
  vision_description text NOT NULL DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE about_us_mission_vision ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view about us mission vision"
  ON about_us_mission_vision FOR SELECT TO public USING (true);

CREATE POLICY "Authenticated users can insert about us mission vision"
  ON about_us_mission_vision FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Authenticated users can update about us mission vision"
  ON about_us_mission_vision FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Authenticated users can delete about us mission vision"
  ON about_us_mission_vision FOR DELETE TO authenticated USING (true);

-- About Us Mission Vision Translations
CREATE TABLE IF NOT EXISTS about_us_mission_vision_translations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  mission_vision_id uuid NOT NULL REFERENCES about_us_mission_vision(id) ON DELETE CASCADE,
  language text NOT NULL DEFAULT 'en',
  section_label text NOT NULL DEFAULT '',
  section_headline text NOT NULL DEFAULT '',
  mission_title text NOT NULL DEFAULT '',
  mission_description text NOT NULL DEFAULT '',
  vision_title text NOT NULL DEFAULT '',
  vision_description text NOT NULL DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(mission_vision_id, language)
);

ALTER TABLE about_us_mission_vision_translations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view about us mission vision translations"
  ON about_us_mission_vision_translations FOR SELECT TO public USING (true);

CREATE POLICY "Authenticated users can insert about us mission vision translations"
  ON about_us_mission_vision_translations FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Authenticated users can update about us mission vision translations"
  ON about_us_mission_vision_translations FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Authenticated users can delete about us mission vision translations"
  ON about_us_mission_vision_translations FOR DELETE TO authenticated USING (true);

-- About Us Core Values
CREATE TABLE IF NOT EXISTS about_us_core_values (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  section_label text NOT NULL DEFAULT '',
  headline text NOT NULL DEFAULT '',
  description text NOT NULL DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE about_us_core_values ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view about us core values"
  ON about_us_core_values FOR SELECT TO public USING (true);

CREATE POLICY "Authenticated users can insert about us core values"
  ON about_us_core_values FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Authenticated users can update about us core values"
  ON about_us_core_values FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Authenticated users can delete about us core values"
  ON about_us_core_values FOR DELETE TO authenticated USING (true);

-- About Us Core Values Translations
CREATE TABLE IF NOT EXISTS about_us_core_values_translations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  core_values_id uuid NOT NULL REFERENCES about_us_core_values(id) ON DELETE CASCADE,
  language text NOT NULL DEFAULT 'en',
  section_label text NOT NULL DEFAULT '',
  headline text NOT NULL DEFAULT '',
  description text NOT NULL DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(core_values_id, language)
);

ALTER TABLE about_us_core_values_translations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view about us core values translations"
  ON about_us_core_values_translations FOR SELECT TO public USING (true);

CREATE POLICY "Authenticated users can insert about us core values translations"
  ON about_us_core_values_translations FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Authenticated users can update about us core values translations"
  ON about_us_core_values_translations FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Authenticated users can delete about us core values translations"
  ON about_us_core_values_translations FOR DELETE TO authenticated USING (true);

-- About Us Core Value Items
CREATE TABLE IF NOT EXISTS about_us_core_value_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL DEFAULT '',
  icon text NOT NULL DEFAULT '',
  "order" integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE about_us_core_value_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view about us core value items"
  ON about_us_core_value_items FOR SELECT TO public USING (true);

CREATE POLICY "Authenticated users can insert about us core value items"
  ON about_us_core_value_items FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Authenticated users can update about us core value items"
  ON about_us_core_value_items FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Authenticated users can delete about us core value items"
  ON about_us_core_value_items FOR DELETE TO authenticated USING (true);

-- About Us Core Value Items Translations
CREATE TABLE IF NOT EXISTS about_us_core_value_items_translations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  item_id uuid NOT NULL REFERENCES about_us_core_value_items(id) ON DELETE CASCADE,
  language text NOT NULL DEFAULT 'en',
  name text NOT NULL DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(item_id, language)
);

ALTER TABLE about_us_core_value_items_translations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view about us core value items translations"
  ON about_us_core_value_items_translations FOR SELECT TO public USING (true);

CREATE POLICY "Authenticated users can insert about us core value items translations"
  ON about_us_core_value_items_translations FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Authenticated users can update about us core value items translations"
  ON about_us_core_value_items_translations FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Authenticated users can delete about us core value items translations"
  ON about_us_core_value_items_translations FOR DELETE TO authenticated USING (true);

-- About Us Journey
CREATE TABLE IF NOT EXISTS about_us_journey (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  section_label text NOT NULL DEFAULT '',
  headline text NOT NULL DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE about_us_journey ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view about us journey"
  ON about_us_journey FOR SELECT TO public USING (true);

CREATE POLICY "Authenticated users can insert about us journey"
  ON about_us_journey FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Authenticated users can update about us journey"
  ON about_us_journey FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Authenticated users can delete about us journey"
  ON about_us_journey FOR DELETE TO authenticated USING (true);

-- About Us Journey Translations
CREATE TABLE IF NOT EXISTS about_us_journey_translations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  journey_id uuid NOT NULL REFERENCES about_us_journey(id) ON DELETE CASCADE,
  language text NOT NULL DEFAULT 'en',
  section_label text NOT NULL DEFAULT '',
  headline text NOT NULL DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(journey_id, language)
);

ALTER TABLE about_us_journey_translations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view about us journey translations"
  ON about_us_journey_translations FOR SELECT TO public USING (true);

CREATE POLICY "Authenticated users can insert about us journey translations"
  ON about_us_journey_translations FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Authenticated users can update about us journey translations"
  ON about_us_journey_translations FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Authenticated users can delete about us journey translations"
  ON about_us_journey_translations FOR DELETE TO authenticated USING (true);

-- About Us Journey Milestones
CREATE TABLE IF NOT EXISTS about_us_journey_milestones (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  year text NOT NULL DEFAULT '',
  title text NOT NULL DEFAULT '',
  description text NOT NULL DEFAULT '',
  image_id bigint,
  "order" integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE about_us_journey_milestones ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view about us journey milestones"
  ON about_us_journey_milestones FOR SELECT TO public USING (true);

CREATE POLICY "Authenticated users can insert about us journey milestones"
  ON about_us_journey_milestones FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Authenticated users can update about us journey milestones"
  ON about_us_journey_milestones FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Authenticated users can delete about us journey milestones"
  ON about_us_journey_milestones FOR DELETE TO authenticated USING (true);

-- About Us Journey Milestones Translations
CREATE TABLE IF NOT EXISTS about_us_journey_milestones_translations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  milestone_id uuid NOT NULL REFERENCES about_us_journey_milestones(id) ON DELETE CASCADE,
  language text NOT NULL DEFAULT 'en',
  title text NOT NULL DEFAULT '',
  description text NOT NULL DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(milestone_id, language)
);

ALTER TABLE about_us_journey_milestones_translations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view about us journey milestones translations"
  ON about_us_journey_milestones_translations FOR SELECT TO public USING (true);

CREATE POLICY "Authenticated users can insert about us journey milestones translations"
  ON about_us_journey_milestones_translations FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Authenticated users can update about us journey milestones translations"
  ON about_us_journey_milestones_translations FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Authenticated users can delete about us journey milestones translations"
  ON about_us_journey_milestones_translations FOR DELETE TO authenticated USING (true);