/*
  # Create Managed Services Tables

  1. New Tables
    - `managed_services_hero`
      - Hero section content with title, subtitle, description, and images
    
    - `managed_security_services`
      - Main security services (SOC, Cybersecurity, GRC)
      - Includes icon, title, image, description
    
    - `managed_security_service_sections`
      - Sub-sections for each security service (modal content)
    
    - `managed_security_service_items`
      - List items for service sections
    
    - `managed_security_service_countries`
      - Country/regulator information for GRC
    
    - `more_services`
      - Additional services (NOC, SLA, PMO, etc.)
    
    - `more_service_items`
      - Bullet points for each service

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated access
*/

-- Managed Services Hero Section
CREATE TABLE IF NOT EXISTS managed_services_hero (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  subtitle_en text NOT NULL,
  subtitle_ar text,
  title_en text NOT NULL,
  title_ar text,
  description_en text NOT NULL,
  description_ar text,
  hero_image text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE managed_services_hero ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated users to read hero"
  ON managed_services_hero FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to update hero"
  ON managed_services_hero FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Managed Security Services (SOC, Cybersecurity, GRC)
CREATE TABLE IF NOT EXISTS managed_security_services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  service_key text UNIQUE NOT NULL,
  icon_image text,
  title_en text NOT NULL,
  title_ar text,
  main_image text,
  description_en text NOT NULL,
  description_ar text,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE managed_security_services ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated users to read security services"
  ON managed_security_services FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to manage security services"
  ON managed_security_services FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Security Service Sections (Modal content sections)
CREATE TABLE IF NOT EXISTS managed_security_service_sections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  service_id uuid REFERENCES managed_security_services(id) ON DELETE CASCADE,
  section_icon text,
  title_en text NOT NULL,
  title_ar text,
  description_en text,
  description_ar text,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE managed_security_service_sections ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated users to read service sections"
  ON managed_security_service_sections FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to manage service sections"
  ON managed_security_service_sections FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Security Service Items (List items in sections)
CREATE TABLE IF NOT EXISTS managed_security_service_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  section_id uuid REFERENCES managed_security_service_sections(id) ON DELETE CASCADE,
  item_text_en text NOT NULL,
  item_text_ar text,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE managed_security_service_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated users to read service items"
  ON managed_security_service_items FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to manage service items"
  ON managed_security_service_items FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Security Service Countries (For GRC section)
CREATE TABLE IF NOT EXISTS managed_security_service_countries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  section_id uuid REFERENCES managed_security_service_sections(id) ON DELETE CASCADE,
  country_name_en text NOT NULL,
  country_name_ar text,
  regulator_en text NOT NULL,
  regulator_ar text,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE managed_security_service_countries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated users to read service countries"
  ON managed_security_service_countries FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to manage service countries"
  ON managed_security_service_countries FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- More Services Section
CREATE TABLE IF NOT EXISTS more_services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  service_key text UNIQUE NOT NULL,
  icon_image text,
  title_en text NOT NULL,
  title_ar text,
  description_en text,
  description_ar text,
  has_bundles_link boolean DEFAULT false,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE more_services ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated users to read more services"
  ON more_services FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to manage more services"
  ON more_services FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- More Service Items (Bullet points)
CREATE TABLE IF NOT EXISTS more_service_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  service_id uuid REFERENCES more_services(id) ON DELETE CASCADE,
  item_text_en text NOT NULL,
  item_text_ar text,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE more_service_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated users to read more service items"
  ON more_service_items FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to manage more service items"
  ON more_service_items FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_security_services_order ON managed_security_services(display_order);
CREATE INDEX IF NOT EXISTS idx_security_service_sections_service ON managed_security_service_sections(service_id);
CREATE INDEX IF NOT EXISTS idx_security_service_items_section ON managed_security_service_items(section_id);
CREATE INDEX IF NOT EXISTS idx_security_service_countries_section ON managed_security_service_countries(section_id);
CREATE INDEX IF NOT EXISTS idx_more_services_order ON more_services(display_order);
CREATE INDEX IF NOT EXISTS idx_more_service_items_service ON more_service_items(service_id);
