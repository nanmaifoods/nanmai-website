-- ============================================================
-- SEED BLOGS DATA - Run in Supabase SQL Editor
-- ============================================================

-- Insert sample blogs (matching your actual schema)
INSERT INTO blogs (title, slug, excerpt, content, cover_image, category, tags, is_published, read_time, author, views)
VALUES
(
  'Health Benefits of Eating Appalam',
  'health-benefits-of-appalam',
  'Discover why appalam is more than just a crunchy side dish. Packed with protein from urad dal, low in calories, and naturally gluten-free.',
  '## Introduction

When most people think of appalam (also known as papad), they think of a crispy, delicious accompaniment to rice and curry. But beyond its irresistible crunch, appalam — especially the traditional urad dal variety — packs some surprising nutritional benefits.

## Rich in Plant Protein

Urad dal, the primary ingredient in traditional appalam, is an excellent source of plant-based protein. A 100g serving can contain up to 25g of protein, making it a valuable addition to vegetarian and vegan diets.

## Supports Digestive Health

Urad dal is high in dietary fibre, which promotes healthy digestion and regular bowel movements.

## Low in Calories

A single appalam contains roughly 35-50 calories depending on size and preparation method.

## Packed with Minerals

Urad dal is rich in essential minerals:
- **Iron** – crucial for blood health
- **Magnesium** – supports bone health
- **Phosphorus** – vital for energy production
- **Potassium** – helps regulate blood pressure

## Naturally Gluten-Free

Traditional urad dal appalam is naturally gluten-free.

## Conclusion

Appalam is far more than a simple side dish. Enjoy it guilt-free!',
  '',
  'Health',
  ARRAY['health', 'nutrition'],
  TRUE,
  5,
  'Dr. Meena Rajan',
  1240
),
(
  'Traditional South Indian Cooking Tips',
  'traditional-south-indian-cooking',
  'Master authentic South Indian cooking with these time-honoured techniques passed down through generations.',
  '## The Soul of South Indian Cooking

South Indian cuisine is one of the world''s most vibrant, flavourful, and diverse culinary traditions.

## Essential Spices to Stock

Before you begin cooking South Indian food, make sure your pantry includes:
- **Mustard seeds** – the backbone of tempering
- **Curry leaves** – aromatic and irreplaceable
- **Dried red chillies** – for heat and depth
- **Asafoetida (hing)** – transforms the flavour
- **Turmeric** – colour, flavour, and health benefits

## Mastering the Tempering (Tadka)

The tempering — called thalippu in Tamil — is the foundation of South Indian cooking.

## Serving with Appalam

A traditional South Indian meal is never complete without crispy appalam.',
  '',
  'Recipes',
  ARRAY['cooking', 'tips'],
  TRUE,
  6,
  'Chef Subramanian',
  890
),
(
  'How Our Appalam Is Made',
  'how-appalam-is-made',
  'A behind-the-scenes look at our traditional manufacturing process – from selecting the finest urad dal to the final crispy product.',
  '## From Seed to Crunch

Every Nanmai Appalam begins its journey in the fields of Tamil Nadu, where we source the finest urad dal from trusted farmers.

## Step 1: Ingredient Selection

We source Grade A urad dal and subject it to rigorous quality checks.

## Step 2: Washing & Soaking

The dal is thoroughly washed multiple times, then soaked for several hours.

## Step 3: Stone Grinding

We use traditional stone grinding methods for our base dough.

## Step 4: Spice Blending

Our master blender combines the dough with our secret spice blend.

## Step 5: Shaping

The dough is hand-shaped and rolled into thin, uniform discs.

## Step 6: Drying

Each appalam is sun-dried on clean trays.

## Step 7: Quality Inspection & Packaging

Every batch is inspected before packaging.

## Our Promise

This entire process is FSSAI certified.',
  '',
  'Behind The Scenes',
  ARRAY['process', 'quality'],
  TRUE,
  5,
  'Nanmai Team',
  2100
);

-- Verify
SELECT id, title, category, is_published, views FROM blogs;
