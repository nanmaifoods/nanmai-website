-- ============================================================
-- FIX SCRIPT: Ensure all products are active and visible
-- Run this in your Supabase SQL Editor
-- ============================================================

-- Check current products status
SELECT id, name, is_active FROM products;

-- Activate all products (if you want to make all visible)
UPDATE products SET is_active = TRUE WHERE is_active IS NULL OR is_active = FALSE;

-- OR set specific products active (replace 'your-product-id' with actual ID)
-- UPDATE products SET is_active = TRUE WHERE id = 'your-product-id';

-- Verify the fix
SELECT id, name, is_active, is_featured FROM products ORDER BY created_at DESC;
