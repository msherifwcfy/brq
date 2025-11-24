/*
  # Create Events Tables

  1. New Tables
    - `events`
      - Main event information (title, date, venue, overview)
    
    - `event_agenda_items`
      - Agenda schedule items with time slots
    
    - `event_speakers`
      - Speaker information with photos and titles
    
    - `event_partners`
      - Partner/sponsor logos and information
    
    - `event_registrations`
      - Store event registration submissions

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated access
    - Public read access for events data
    - Protected write access for registrations
*/

-- Events Table
CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title_en text NOT NULL,
  title_ar text,
  subtitle_en text,
  subtitle_ar text,
  overview_en text,
  overview_ar text,
  event_date date NOT NULL,
  venue_name_en text,
  venue_name_ar text,
  venue_address_en text,
  venue_address_ar text,
  google_maps_link text,
  hero_image text,
  is_published boolean DEFAULT false,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public to read published events"
  ON events FOR SELECT
  TO public
  USING (is_published = true);

CREATE POLICY "Allow authenticated users to manage events"
  ON events FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Event Agenda Items
CREATE TABLE IF NOT EXISTS event_agenda_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id uuid REFERENCES events(id) ON DELETE CASCADE,
  time_slot text NOT NULL,
  description_en text NOT NULL,
  description_ar text,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE event_agenda_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public to read agenda items"
  ON event_agenda_items FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow authenticated users to manage agenda items"
  ON event_agenda_items FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Event Speakers
CREATE TABLE IF NOT EXISTS event_speakers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id uuid REFERENCES events(id) ON DELETE CASCADE,
  name_en text NOT NULL,
  name_ar text,
  title_en text NOT NULL,
  title_ar text,
  bio_en text,
  bio_ar text,
  image_url text,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE event_speakers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public to read speakers"
  ON event_speakers FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow authenticated users to manage speakers"
  ON event_speakers FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Event Partners
CREATE TABLE IF NOT EXISTS event_partners (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id uuid REFERENCES events(id) ON DELETE CASCADE,
  name_en text NOT NULL,
  name_ar text,
  logo_url text NOT NULL,
  website_url text,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE event_partners ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public to read partners"
  ON event_partners FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow authenticated users to manage partners"
  ON event_partners FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Event Registrations
CREATE TABLE IF NOT EXISTS event_registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id uuid REFERENCES events(id) ON DELETE CASCADE,
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL,
  phone_country_code text NOT NULL,
  phone_number text NOT NULL,
  organization_name text NOT NULL,
  position text NOT NULL,
  registration_date timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE event_registrations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public to create registrations"
  ON event_registrations FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to read registrations"
  ON event_registrations FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to manage registrations"
  ON event_registrations FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_events_published ON events(is_published, event_date DESC);
CREATE INDEX IF NOT EXISTS idx_agenda_event ON event_agenda_items(event_id, display_order);
CREATE INDEX IF NOT EXISTS idx_speakers_event ON event_speakers(event_id, display_order);
CREATE INDEX IF NOT EXISTS idx_partners_event ON event_partners(event_id, display_order);
CREATE INDEX IF NOT EXISTS idx_registrations_event ON event_registrations(event_id, registration_date DESC);
CREATE INDEX IF NOT EXISTS idx_registrations_email ON event_registrations(email);
