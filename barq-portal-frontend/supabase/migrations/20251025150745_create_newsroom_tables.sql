/*
  # Create Newsroom Tables

  1. New Tables
    - `newsroom_categories`
      - Categories for news items (News, Press Release, Interviews)
    
    - `newsroom_articles`
      - Main newsroom articles with title, description, dates
      - Media type (image, horizontal-video, vertical-video)
      - Links to images and videos
    
    - `newsroom_article_content`
      - Full article content sections with subtitle and paragraphs
      - Supports multiple content blocks per article

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated access
*/

-- Newsroom Categories
CREATE TABLE IF NOT EXISTS newsroom_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name_en text UNIQUE NOT NULL,
  name_ar text UNIQUE NOT NULL,
  slug text UNIQUE NOT NULL,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE newsroom_categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated users to read categories"
  ON newsroom_categories FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to manage categories"
  ON newsroom_categories FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Newsroom Articles
CREATE TABLE IF NOT EXISTS newsroom_articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id uuid REFERENCES newsroom_categories(id) ON DELETE SET NULL,
  title_en text NOT NULL,
  title_ar text,
  description_en text,
  description_ar text,
  slug text UNIQUE NOT NULL,
  publish_date date NOT NULL,
  media_type text DEFAULT 'image' CHECK (media_type IN ('image', 'horizontal-video', 'vertical-video')),
  thumbnail_image text,
  main_image text,
  video_url text,
  is_published boolean DEFAULT false,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE newsroom_articles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated users to read articles"
  ON newsroom_articles FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to manage articles"
  ON newsroom_articles FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Newsroom Article Content (subtitle + multiple paragraphs)
CREATE TABLE IF NOT EXISTS newsroom_article_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  article_id uuid REFERENCES newsroom_articles(id) ON DELETE CASCADE,
  subtitle_en text,
  subtitle_ar text,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE newsroom_article_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated users to read article content"
  ON newsroom_article_content FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to manage article content"
  ON newsroom_article_content FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Article Content Paragraphs
CREATE TABLE IF NOT EXISTS newsroom_content_paragraphs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  content_id uuid REFERENCES newsroom_article_content(id) ON DELETE CASCADE,
  paragraph_en text NOT NULL,
  paragraph_ar text,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE newsroom_content_paragraphs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated users to read paragraphs"
  ON newsroom_content_paragraphs FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to manage paragraphs"
  ON newsroom_content_paragraphs FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_articles_category ON newsroom_articles(category_id);
CREATE INDEX IF NOT EXISTS idx_articles_published ON newsroom_articles(is_published, publish_date DESC);
CREATE INDEX IF NOT EXISTS idx_articles_slug ON newsroom_articles(slug);
CREATE INDEX IF NOT EXISTS idx_article_content_article ON newsroom_article_content(article_id);
CREATE INDEX IF NOT EXISTS idx_paragraphs_content ON newsroom_content_paragraphs(content_id);

-- Insert default categories
INSERT INTO newsroom_categories (name_en, name_ar, slug, display_order)
VALUES 
  ('News', 'أخبار', 'news', 1),
  ('Press Release', 'بيان صحفي', 'press-release', 2),
  ('Interviews', 'مقابلات', 'interviews', 3)
ON CONFLICT (slug) DO NOTHING;
