-- ============================================================
-- NANMAI APPALAM – Supabase Database Schema
-- Run this in your Supabase SQL Editor
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ─── PRODUCTS ────────────────────────────────────────────────
CREATE TABLE products (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  name            TEXT NOT NULL,
  slug            TEXT UNIQUE NOT NULL,
  description     TEXT NOT NULL,
  price           INTEGER NOT NULL,
  original_price  INTEGER,
  images          TEXT[] DEFAULT '{}',
  category        TEXT NOT NULL CHECK (category IN ('classic','flavoured','mini','packs')),
  weight          TEXT NOT NULL,
  stock           INTEGER NOT NULL DEFAULT 0,
  is_active       BOOLEAN DEFAULT TRUE,
  is_featured     BOOLEAN DEFAULT FALSE,
  tags            TEXT[] DEFAULT '{}',
  ingredients     TEXT,
  nutritional_info JSONB
);

-- ─── ORDERS ──────────────────────────────────────────────────
CREATE TABLE orders (
  id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at          TIMESTAMPTZ DEFAULT NOW(),
  order_number        TEXT UNIQUE NOT NULL,
  user_id             UUID,
  customer_name       TEXT NOT NULL,
  customer_email      TEXT NOT NULL,
  customer_phone      TEXT NOT NULL,
  shipping_address    JSONB NOT NULL,
  items               JSONB NOT NULL,
  subtotal            INTEGER NOT NULL,
  shipping            INTEGER NOT NULL DEFAULT 0,
  tax                 INTEGER NOT NULL DEFAULT 0,
  total               INTEGER NOT NULL,
  status              TEXT NOT NULL DEFAULT 'pending'
                      CHECK (status IN ('pending','confirmed','processing','shipped','delivered','cancelled','refunded')),
  payment_status      TEXT NOT NULL DEFAULT 'pending'
                      CHECK (payment_status IN ('pending','paid','failed','refunded')),
  razorpay_order_id   TEXT,
  razorpay_payment_id TEXT,
  notes               TEXT
);

-- ─── BLOGS ───────────────────────────────────────────────────
CREATE TABLE blogs (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at   TIMESTAMPTZ DEFAULT NOW(),
  updated_at   TIMESTAMPTZ DEFAULT NOW(),
  title        TEXT NOT NULL,
  slug         TEXT UNIQUE NOT NULL,
  excerpt      TEXT NOT NULL,
  content      TEXT NOT NULL,
  cover_image  TEXT DEFAULT '',
  author       TEXT NOT NULL DEFAULT 'Nanmai Team',
  category     TEXT NOT NULL DEFAULT 'General',
  tags         TEXT[] DEFAULT '{}',
  is_published BOOLEAN DEFAULT FALSE,
  views        INTEGER DEFAULT 0,
  read_time    INTEGER DEFAULT 5
);

-- ─── SITE CONTENT (CMS) ───────────────────────────────────────
CREATE TABLE site_content (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  page       TEXT NOT NULL,
  section    TEXT NOT NULL,
  key        TEXT NOT NULL,
  value      JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (page, section, key)
);

-- ─── SUBSCRIBERS ─────────────────────────────────────────────
CREATE TABLE subscribers (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  email      TEXT UNIQUE NOT NULL,
  is_active  BOOLEAN DEFAULT TRUE
);

-- ─── REVIEWS ─────────────────────────────────────────────────
CREATE TABLE reviews (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  product_id    UUID REFERENCES products(id) ON DELETE CASCADE,
  customer_name TEXT NOT NULL,
  rating        INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment       TEXT NOT NULL,
  is_approved   BOOLEAN DEFAULT FALSE
);

-- ─── HELPER FUNCTIONS ────────────────────────────────────────
CREATE OR REPLACE FUNCTION decrement_stock(product_id UUID, qty INTEGER)
RETURNS VOID AS $$
  UPDATE products SET stock = GREATEST(0, stock - qty) WHERE id = product_id;
$$ LANGUAGE sql;

-- Auto-update updated_at for blogs
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER blogs_updated_at
  BEFORE UPDATE ON blogs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER site_content_updated_at
  BEFORE UPDATE ON site_content
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ─── ROW LEVEL SECURITY ──────────────────────────────────────
ALTER TABLE products    ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders      ENABLE ROW LEVEL SECURITY;
ALTER TABLE blogs       ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews     ENABLE ROW LEVEL SECURITY;

-- Products: public read for active products
CREATE POLICY "Public can read active products" ON products
  FOR SELECT USING (is_active = TRUE);

-- Service role can do everything (admin)
CREATE POLICY "Service role all products" ON products
  USING (auth.role() = 'service_role');

-- Blogs: public read for published
CREATE POLICY "Public can read published blogs" ON blogs
  FOR SELECT USING (is_published = TRUE);

CREATE POLICY "Service role all blogs" ON blogs
  USING (auth.role() = 'service_role');

-- Orders: only service role
CREATE POLICY "Service role all orders" ON orders
  USING (auth.role() = 'service_role');

-- Site Content: public read
CREATE POLICY "Public can read site content" ON site_content
  FOR SELECT USING (TRUE);

CREATE POLICY "Service role all site_content" ON site_content
  USING (auth.role() = 'service_role');

-- ─── SEED PRODUCTS ────────────────────────────────────────────
INSERT INTO products (name, slug, description, price, original_price, category, weight, stock, is_active, is_featured, tags, ingredients, nutritional_info) VALUES
  ('Classic Appalam',    'classic-appalam',    'The original crispy traditional South Indian papad.', 149, 199, 'classic',   '200g', 50, TRUE, TRUE,  '{"bestseller"}', 'Urad Dal Flour, Salt, Black Pepper, Asafoetida', '{"calories":45,"protein":2.1,"carbs":8.5,"fat":0.8}'),
  ('Garlic Appalam',     'garlic-appalam',     'Infused with the rich aroma of fresh garlic.',        179, 229, 'flavoured', '200g', 40, TRUE, TRUE,  '{"popular"}',    'Urad Dal Flour, Garlic Flakes, Salt',            '{"calories":48,"protein":2.3,"carbs":8.7,"fat":0.9}'),
  ('Pepper Appalam',     'pepper-appalam',     'Studded with coarsely ground black pepper.',          179, 219, 'flavoured', '200g', 35, TRUE, FALSE, '{"spicy"}',      'Urad Dal Flour, Black Pepper, Salt',             '{"calories":46,"protein":2.2,"carbs":8.6,"fat":0.8}'),
  ('Cumin Appalam',      'cumin-appalam',      'Fragrant with roasted cumin seeds.',                  169, 209, 'flavoured', '200g', 45, TRUE, FALSE, '{"aromatic"}',   'Urad Dal Flour, Cumin Seeds, Salt',              '{"calories":47,"protein":2.2,"carbs":8.7,"fat":0.9}'),
  ('Mini Appalam',       'mini-appalam',       'Bite-sized minis, perfect for snacking.',             129, 159, 'mini',      '150g', 60, TRUE, FALSE, '{"snack"}',      'Urad Dal Flour, Salt, Spices',                   '{"calories":40,"protein":1.8,"carbs":7.9,"fat":0.7}'),
  ('Jumbo Pack',         'jumbo-pack',         'Our biggest pack – great value for large families.',  449, 599, 'packs',     '1kg',  20, TRUE, TRUE,  '{"value"}',      'Urad Dal Flour, Salt, Spices',                   '{"calories":45,"protein":2.1,"carbs":8.5,"fat":0.8}'),
  ('Mixed Flavour Pack', 'mixed-flavour-pack', 'Sample all our flavours in one combo pack.',          349, 449, 'packs',     '600g', 30, TRUE, FALSE, '{"combo"}',      'Urad Dal Flour, Spices, Salt',                   '{"calories":46,"protein":2.2,"carbs":8.6,"fat":0.8}'),
  ('Chilli Appalam',     'chilli-appalam',     'Extra fiery red chilli infused papad.',               189, 229, 'flavoured', '200g', 25, TRUE, FALSE, '{"spicy","new"}', 'Urad Dal Flour, Red Chilli, Salt',              '{"calories":49,"protein":2.3,"carbs":8.8,"fat":1.0}');
