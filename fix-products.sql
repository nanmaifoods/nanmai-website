-- ============================================================
-- FIX: Activate All Products in Supabase
-- ============================================================

-- Step 1: Show current status of products
SELECT id, name, is_active FROM products;

-- Step 2: Activate ALL products (this will make them visible)
UPDATE products SET is_active = TRUE WHERE is_active IS NULL OR is_active = FALSE;

-- Step 3: Verify the fix worked
SELECT id, name, is_active, is_featured FROM products ORDER BY created_at DESC;
