-- ============================================================
-- NANMAI APPALAM – New Product Catalog (17 Products)
-- Run this in your Supabase SQL Editor after 001_init.sql
-- ============================================================

-- Step 1: Remove old products
DELETE FROM products;

-- Step 2: Update category constraint to support new categories
ALTER TABLE products DROP CONSTRAINT IF EXISTS products_category_check;
ALTER TABLE products ADD CONSTRAINT products_category_check
  CHECK (category IN ('appalam', 'punjabi-pappad', 'appalam-snack-pack', 'appalam-chips'));

-- Step 3: Insert all 17 products
INSERT INTO products (name, slug, description, price, original_price, category, weight, stock, is_active, is_featured, tags, ingredients, nutritional_info) VALUES
  -- Appalam Products (9 variants)
  ('Party Special Appalam', 'party-special-appalam', 'Enjoy the festive crunch of Nanmai Party Special Appalam, a classic appalam papad made for family meals, celebrations, and generous serving bowls.', 160, NULL, 'appalam', '270g', 50, TRUE, TRUE, '{"festive","bestseller"}', NULL, NULL),
  ('Super Special Appalam', 'super-special-appalam', 'Experience the authentic taste of tradition with Nanmai Super Special Appalam. Made for a rich, crisp bite and a beautifully golden finish.', 148, NULL, 'appalam', '250g', 45, TRUE, TRUE, '{"premium","popular"}', NULL, NULL),
  ('Dinner Special Appalam', 'dinner-special-appalam', 'Nanmai Dinner Special Appalam is crafted to be the perfect mealtime companion, adding a light, crispy texture to everyday South Indian dinners.', 120, NULL, 'appalam', '200g', 55, TRUE, FALSE, '{"daily"}', NULL, NULL),
  ('Extra Special Appalam', 'extra-special-appalam', 'Nanmai Extra Special Appalam brings extra crunch, aroma, and satisfaction to every meal. Made for homes that love traditional taste with premium quality.', 90, NULL, 'appalam', '150g', 40, TRUE, FALSE, '{"premium"}', NULL, NULL),
  ('Classic Appalam', 'classic-appalam', 'Simple, crisp, and timeless, Nanmai Classic Appalam delivers the familiar flavor that South Indian families love. A pantry essential.', 70, NULL, 'appalam', '120g', 60, TRUE, TRUE, '{"classic","bestseller"}', NULL, NULL),
  ('Daily Dinner Appalam', 'daily-dinner-appalam', 'Nanmai Daily Dinner Appalam is made for regular family meals, offering a quick, crunchy side that pairs beautifully with rice and curries.', 59, NULL, 'appalam', '100g', 65, TRUE, FALSE, '{"daily","value"}', NULL, NULL),
  ('Medium Appalam', 'medium-appalam', 'Nanmai Medium Appalam offers the right balance of size, crunch, and convenience, making it perfect for everyday use.', 48, NULL, 'appalam', '80g', 50, TRUE, FALSE, '{"everyday"}', NULL, NULL),
  ('Simply Appalam', 'simply-appalam', 'Nanmai Simply Appalam is a light and easy choice for those who enjoy clean, honest flavor in smaller portions.', 39, NULL, 'appalam', '65g', 55, TRUE, FALSE, '{"simple","affordable"}', NULL, NULL),
  ('Crunchy Appalam', 'crunchy-appalam', 'Nanmai Crunchy Appalam is made for snack lovers who want a bold crisp texture in every bite.', 29, NULL, 'appalam', '50g', 70, TRUE, FALSE, '{"snack","crunchy"}', NULL, NULL),

  -- Punjabi Pappad Products (2 variants)
  ('Punjabi Pappad', 'punjabi-pappad', 'Nanmai Punjabi Pappad brings a spiced North Indian touch to the Nanmai range, with a robust flavor and satisfying crunch.', 110, NULL, 'punjabi-pappad', '200g', 40, TRUE, TRUE, '{"spiced","regional"}', NULL, NULL),
  ('Punjabi Special Pappad', 'punjabi-special-pappad', 'Nanmai Punjabi Special Pappad is a fuller, premium style regional papad with strong visual appeal and bold flavor.', 130, NULL, 'punjabi-pappad', '190g', 35, TRUE, FALSE, '{"premium","regional"}', NULL, NULL),

  -- Appalam Snack Pack (1 variant)
  ('Mini Appalam Snack Pack', 'mini-appalam-snack-pack', 'This compact Nanmai snack pack is made for quick cravings, lunch boxes, and convenient retail display.', 10, NULL, 'appalam-snack-pack', '20g', 100, TRUE, FALSE, '{"snack","budget"}', NULL, NULL),

  -- Appalam Chips (1 variant)
  ('Nanmai Appalam Chips', 'nanmai-appalam-chips', 'Nanmai Appalam Chips offer a ready to enjoy twist on traditional appalam, bringing crisp texture and familiar flavor in a snack friendly format.', 45, NULL, 'appalam-chips', '100g', 60, TRUE, TRUE, '{"snack","ready-to-eat"}', NULL, NULL),

  -- Additional Appalam Products (from second brochure)
  ('Nanmai Special Appalam', 'nanmai-special-appalam', 'Nanmai Special Appalam is a premium family pack created for larger servings and occasions that call for extra crunch.', 170, NULL, 'appalam', '225g', 45, TRUE, TRUE, '{"family","premium"}', NULL, NULL),
  ('Nanmai Dinner Appalam', 'nanmai-dinner-appalam', 'Nanmai Dinner Appalam is designed as a reliable mealtime staple, adding a crisp finish to everyday South Indian plates.', 138, NULL, 'appalam', '185g', 50, TRUE, FALSE, '{"daily","reliable"}', NULL, NULL),
  ('Nanmai Extra Appalam', 'nanmai-extra-appalam', 'Nanmai Extra Appalam is made for those who want more flavor, more crunch, and more serving value in one pack.', 110, NULL, 'appalam', '150g', 45, TRUE, FALSE, '{"extra","value"}', NULL, NULL),
  ('Nanmai Classic Appalam', 'nanmai-classic-appalam', 'Nanmai Classic Appalam keeps things simple and authentic, delivering the familiar taste that makes appalam in Tamil cuisine so beloved.', 90, NULL, 'appalam', '120g', 55, TRUE, FALSE, '{"classic","authentic"}', NULL, NULL);
