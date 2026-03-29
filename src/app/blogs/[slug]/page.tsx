import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Clock, Calendar, Tag, ArrowLeft, Share2, ChevronRight } from 'lucide-react';

const BLOG_CONTENT: Record<string, {
  title: string; excerpt: string; category: string; date: string; readTime: number; cover: string; tags: string[];
  author: string; authorRole: string; content: string;
}> = {
  'health-benefits-of-appalam': {
    title: 'Health Benefits of Eating Appalam', excerpt: 'Discover the surprising nutritional benefits of this crispy South Indian delight.',
    category: 'Health', date: 'March 10, 2025', readTime: 4, cover: '🌿', tags: ['health', 'nutrition'],
    author: 'Dr. Meena Rajan', authorRole: 'Nutritionist',
    content: `
## Introduction

When most people think of appalam (also known as papad), they think of a crispy, delicious accompaniment to rice and curry. But beyond its irresistible crunch, appalam — especially the traditional urad dal variety — packs some surprising nutritional benefits.

## Rich in Plant Protein

Urad dal, the primary ingredient in traditional appalam, is an excellent source of plant-based protein. A 100g serving can contain up to 25g of protein, making it a valuable addition to vegetarian and vegan diets. Protein is essential for muscle repair, immune function, and overall cellular health.

## Supports Digestive Health

Urad dal is high in dietary fibre, which promotes healthy digestion and regular bowel movements. The fibre content helps prevent constipation, feeds beneficial gut bacteria, and can reduce the risk of digestive disorders over time.

## Low in Calories (When Prepared Right)

A single appalam contains roughly 35-50 calories depending on size and preparation method. When roasted or air-fried instead of deep-fried, appalam is an impressively low-calorie snack that satisfies cravings without the guilt.

## Packed with Minerals

Urad dal is rich in essential minerals:
- **Iron** – crucial for blood health and preventing anaemia
- **Magnesium** – supports bone health and muscle function
- **Phosphorus** – vital for energy production
- **Potassium** – helps regulate blood pressure

## Naturally Gluten-Free

Traditional urad dal appalam is naturally gluten-free, making it a safe and delicious option for people with gluten sensitivity or coeliac disease.

## The Best Way to Eat It

To maximise health benefits, opt for roasting or microwaving your appalam rather than deep frying. You get all the crunch and flavour with a fraction of the oil and calories.

## Conclusion

Appalam is far more than a simple side dish. When made with quality ingredients like Nanmai Appalam uses, it's a nutritious, flavourful addition to any meal. Enjoy it guilt-free, knowing every crispy bite is doing your body good!
    `,
  },
  'traditional-south-indian-cooking': {
    title: 'Traditional South Indian Cooking Tips', excerpt: 'Master authentic South Indian cooking with these time-honoured techniques.',
    category: 'Recipes', date: 'March 5, 2025', readTime: 6, cover: '🍲', tags: ['cooking', 'tips'],
    author: 'Chef Subramanian', authorRole: 'Head Chef',
    content: `
## The Soul of South Indian Cooking

South Indian cuisine is one of the world's most vibrant, flavourful, and diverse culinary traditions. From the tangy rasam of Tamil Nadu to the coconut-rich curries of Kerala, each dish tells a story of culture, climate, and centuries of refinement.

## Essential Spices to Stock

Before you begin cooking South Indian food, make sure your pantry includes:
- **Mustard seeds** – the backbone of tempering
- **Curry leaves** – aromatic and irreplaceable
- **Dried red chillies** – for heat and depth
- **Asafoetida (hing)** – a small amount transforms the flavour
- **Turmeric** – colour, flavour, and anti-inflammatory benefits

## Mastering the Tempering (Tadka)

The tempering — called *thalippu* in Tamil — is the foundation of South Indian cooking. Heat oil until it shimmers (not smoking), add mustard seeds and wait for them to splutter, then add curry leaves, dried chillies, and asafoetida in quick succession. This takes only 30-45 seconds but creates an extraordinary base of flavour.

## The Rice Rule

Always rinse your rice 2-3 times before cooking. For fluffy, separated grains, use a 1:1.5 rice-to-water ratio for regular rice, or follow your cooker's instructions. Never stir rice while cooking — it breaks the starch structure.

## Tamarind: Use the Right Amount

Tamarind is central to rasam, sambar, and many chutneys. Always soak tamarind in warm water for 15 minutes and strain before using. Start with less than you think you need — it's easier to add than to correct an overly sour dish.

## Serving with Appalam

A traditional South Indian meal is never complete without crispy appalam. Serve it alongside sambar, rasam, and curd rice for the perfect complement of textures and flavours. At Nanmai, we craft our appalams specifically to complement these traditional dishes.

## Conclusion

South Indian cooking rewards patience and attention to detail. Master these foundational techniques and you'll find the rest comes naturally. Happy cooking!
    `,
  },
  'how-appalam-is-made': {
    title: 'How Our Appalam Is Made', excerpt: 'A behind-the-scenes look at our traditional manufacturing process.',
    category: 'Behind The Scenes', date: 'Feb 28, 2025', readTime: 5, cover: '🏭', tags: ['process', 'quality'],
    author: 'Nanmai Team', authorRole: 'Quality Team',
    content: `
## From Seed to Crunch

Every Nanmai Appalam begins its journey in the fields of Tamil Nadu, where we source the finest urad dal from trusted farmers who share our commitment to quality. Here's how your favourite appalam goes from raw ingredient to crispy perfection.

## Step 1: Ingredient Selection

We source Grade A urad dal and subject it to rigorous quality checks. Only dal that meets our exacting standards for colour, purity, moisture content, and protein levels makes it into our appalams. We reject anything that doesn't pass inspection.

## Step 2: Washing & Soaking

The dal is thoroughly washed multiple times to remove impurities, then soaked for several hours to soften it for grinding. The soaking time is carefully calibrated — too little and the dough is tough, too much and the texture suffers.

## Step 3: Stone Grinding

We use traditional stone grinding methods for our base dough. Stone grinding preserves the natural oils and nutrients in the dal that modern steel grinding destroys. The result is a smoother, more flavourful dough.

## Step 4: Spice Blending

Our master blender combines the dough with our secret spice blend — a recipe that has been refined over 15 years. The spices are added in a specific sequence and mixed for a precise duration to ensure even distribution.

## Step 5: Shaping

The dough is hand-shaped and rolled into thin, uniform discs. The thinness is critical — too thick and the appalam won't fry or roast evenly; too thin and it becomes brittle.

## Step 6: Drying

Each appalam is sun-dried on clean trays for the perfect duration. The drying process removes moisture while preserving the structure. Weather conditions are monitored closely during this stage.

## Step 7: Quality Inspection & Packaging

Before packaging, every batch is inspected for size, thickness, colour, and aroma. Only appalams that pass this final check are packed in our signature boxes and sealed for freshness.

## Our Promise

This entire process is FSSAI certified and conducted in hygienic, food-safe conditions. When you open a packet of Nanmai Appalam, you're experiencing the result of 15+ years of craft and care.
    `,
  },
  'best-ways-to-cook-appalam': {
    title: '5 Best Ways to Cook Your Appalam', excerpt: 'From deep frying to air frying — find the perfect cooking method for you.',
    category: 'How-To', date: 'Feb 20, 2025', readTime: 5, cover: '🔥', tags: ['cooking', 'tips'],
    author: 'Nanmai Kitchen', authorRole: 'Recipe Team',
    content: `
## The Great Appalam Debate

Ask ten South Indians how to cook appalam and you'll get ten different answers — all passionate. The truth is, there's no single "best" method. Each technique produces a different texture and flavour profile. Here's our breakdown of the top five methods.

## 1. Deep Frying (The Classic)

**Best for**: Maximum puff and crispiness
**How**: Heat oil to 180°C. Drop in appalam and press gently with a spatula. It puffs up in 10-15 seconds. Flip once. Remove and drain on paper towel.
**Result**: Golden, perfectly puffed, melt-in-mouth crispy
**Tip**: The oil must be at the right temperature — too cool and the appalam absorbs oil; too hot and it burns.

## 2. Roasting on Open Flame

**Best for**: Authentic flavour with no oil
**How**: Hold appalam with tongs directly over a medium gas flame. Rotate constantly until white spots appear and the whole appalam turns lightly golden and crispy.
**Result**: Smoky, charred edges, rustic flavour
**Tip**: Keep moving — sections can burn in under a second.

## 3. Microwave

**Best for**: Quick, healthy, hands-free
**How**: Place on a microwave-safe plate. Microwave on high for 30-45 seconds (may vary by wattage). No oil needed.
**Result**: Crispy with a slightly different texture than fried
**Tip**: Do one at a time for even cooking. Watch it — microwaves vary greatly.

## 4. Air Fryer

**Best for**: Healthy, consistent results
**How**: Preheat air fryer to 200°C. Place appalam flat (may need to break if too large). Cook for 2-3 minutes.
**Result**: Crispy, healthy, minimal oil needed
**Tip**: Light spray of oil can improve texture.

## 5. Tawa / Dry Pan

**Best for**: Easy, no-oil stovetop method
**How**: Heat a dry tawa to medium-high. Place appalam flat and press with a cloth or spatula. Flip when white spots appear. Remove when evenly crispy.
**Result**: Flat, even crisp with subtle char
**Tip**: Good for even cooking without a gas flame.

## Our Recommendation

For everyday health-conscious eating, we recommend the **microwave or air fryer** method. For special occasions and the most authentic experience, nothing beats a **deep-fried** Nanmai Appalam.
    `,
  },
  'papad-in-indian-cuisine-history': {
    title: 'The History of Papad in Indian Cuisine', excerpt: 'A 2,000-year journey of India\'s most beloved crispy flatbread.',
    category: 'Culture', date: 'Feb 12, 2025', readTime: 7, cover: '📜', tags: ['history', 'culture'],
    author: 'Prof. K. Sundaram', authorRole: 'Food Historian',
    content: `
## Ancient Origins

The history of papad in Indian cuisine stretches back over 2,000 years. Ancient Sanskrit texts including the *Arthashastra* (c. 300 BCE) contain references to thin lentil wafers that scholars believe are precursors to the modern papad. These early versions were likely simpler — just lentil flour and water — but the fundamental concept has remained remarkably stable.

## Regional Variations Emerge

As Indian cuisine diversified across its vast geography, so did papad. Different regions developed distinctly different styles:
- **Tamil Nadu & South India**: Urad dal-based, thin and crispy (our appalam)
- **Rajasthan**: Thick moong dal or wheat papads, often sun-dried in the desert heat
- **Maharashtra**: Sabudana (sago) papads with cumin
- **Gujarat**: Rice flour papads, often flavoured with sesame seeds
- **Punjab**: Hearty whole wheat papads with chilli

## The Mughal Influence

During the Mughal era (1526-1858), papad evolved in North India, becoming more refined and spiced. The imperial courts of Delhi and Agra reportedly served multiple varieties of papad as part of elaborate multi-course feasts. This period saw the development of many flavoured varieties.

## Papad in Trade

Papad became one of India's earliest exported food products. Maritime records from the 16th and 17th centuries document traders carrying dried papads on ships as provisions and trade goods. Indian merchants introduced papad to Southeast Asia, parts of Africa, and the Caribbean, where diaspora communities maintain traditions of papad-making to this day.

## The Modern Era

The 20th century saw papad transition from a home-made staple to a commercial product. The cooperative movement — most famously Lijjat Papad, founded in 1959 by seven women in Mumbai — transformed the industry and created economic opportunities for thousands of women across India.

## South Indian Appalam: A Special Heritage

In Tamil Nadu, appalam has always been more than food — it's part of ritual and celebration. Traditional Tamil weddings serve appalam as part of the feast. The crinkling sound of a freshly fried appalam is inseparable from the sensory memory of a Tamil grandmother's kitchen.

At Nanmai Appalam, we see ourselves as custodians of this rich tradition — making the same authentic appalam that families have loved for generations, with the quality standards of today.
    `,
  },
  'appalam-recipes-beyond-the-side-dish': {
    title: 'Creative Appalam Recipes Beyond the Side Dish', excerpt: 'Discover inventive ways to use crispy appalam in everyday cooking.',
    category: 'Recipes', date: 'Feb 5, 2025', readTime: 6, cover: '👨‍🍳', tags: ['recipes', 'creative'],
    author: 'Chef Priya Krishnan', authorRole: 'Recipe Developer',
    content: `
## Thinking Outside the Bowl

Most of us grew up eating appalam as a side dish alongside rice, dal, and sambar. But this incredibly versatile ingredient can be used in so many more creative ways. Here are our favourite innovative appalam recipes.

## 1. Appalam Chaat

**What you need**: Crushed appalam, boiled chickpeas, diced onion, tomato, green chutney, tamarind chutney, sev, coriander.
**How**: Arrange crushed appalam pieces as the base. Layer with chickpeas, vegetables, and chutneys. Top with sev and coriander. Serve immediately.
**Why it works**: The appalam adds crunch and substance that regular chaat bases lack.

## 2. Appalam Crusted Fish / Paneer

**What you need**: Fish fillets or paneer, crushed appalam, eggs, salt, pepper, oil.
**How**: Crush appalam to a coarse powder. Dip protein in egg wash, coat with appalam crumbs, and shallow fry until golden.
**Why it works**: Creates the crispiest, most flavourful coating you've ever tasted.

## 3. Appalam Nachos

**What you need**: Mini appalams, refried beans or rajma, cheese, jalapeños, sour cream, salsa.
**How**: Arrange appalams on a baking tray. Top with beans and cheese. Bake at 180°C for 5 minutes. Add toppings and serve.
**Why it works**: A fusion snack that's genuinely better than tortilla chips for this application.

## 4. Appalam Sandwich Crunch

**What you need**: Your favourite sandwich fillings, a small sheet of appalam.
**How**: Build your sandwich as usual. Just before eating, insert a piece of appalam inside for an extra crunch layer.
**Why it works**: Adds textural excitement to any sandwich without any additional flavour disruption.

## 5. Appalam Soup Croutons

**What you need**: Crushed appalam pieces, your favourite soup.
**How**: Break appalam into rough pieces. Use as you would croutons — float on top of soup just before serving.
**Why it works**: Adds a savoury, spiced crunch that elevates even a simple lentil soup.

## Final Thoughts

Appalam's neutral-yet-complex flavour profile makes it extraordinarily versatile. The key is to use it at the last moment to preserve its crunch. We'd love to see your creations — share them with us on Instagram @NanmaiAppalam!
    `,
  },
};

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = BLOG_CONTENT[params.slug];
  if (!post) return { title: 'Blog Not Found' };
  return { title: post.title, description: post.excerpt };
}

function parseContent(md: string) {
  const lines = md.trim().split('\n');
  return lines.map((line, i) => {
    if (line.startsWith('## ')) return <h2 key={i} className="font-display text-2xl font-bold mt-8 mb-4 text-brand-dark">{line.slice(3)}</h2>;
    if (line.startsWith('**') && line.endsWith('**')) return <strong key={i} className="font-bold">{line.slice(2, -2)}</strong>;
    if (line.startsWith('- ')) return (
      <li key={i} className="flex gap-2 text-gray-600 leading-relaxed">
        <span className="text-brand-pink mt-1.5 shrink-0">•</span>
        <span dangerouslySetInnerHTML={{ __html: line.slice(2).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
      </li>
    );
    if (line === '') return <br key={i} />;
    return <p key={i} className="text-gray-600 leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />;
  });
}

export default function BlogDetailPage({ params }: { params: { slug: string } }) {
  const post = BLOG_CONTENT[params.slug];
  if (!post) notFound();

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-100 px-4 py-3">
        <div className="max-w-4xl mx-auto flex gap-2 text-sm text-gray-500 flex-wrap">
          <Link href="/" className="hover:text-brand-pink">Home</Link>
          <ChevronRight size={14} className="mt-0.5" />
          <Link href="/blogs" className="hover:text-brand-pink">Blogs</Link>
          <ChevronRight size={14} className="mt-0.5" />
          <span className="text-brand-dark truncate max-w-[200px]">{post.title}</span>
        </div>
      </div>

      {/* Hero */}
      <div className="bg-gradient-to-br from-brand-cream via-white to-brand-green/5 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <Link href="/blogs" className="inline-flex items-center gap-2 text-brand-pink text-sm font-medium hover:gap-3 transition-all mb-6">
            <ArrowLeft size={16} /> Back to Blogs
          </Link>
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="badge bg-brand-pink text-white">{post.category}</span>
            {post.tags.map(t => (
              <span key={t} className="badge bg-gray-100 text-gray-600 flex items-center gap-1">
                <Tag size={10} />{t}
              </span>
            ))}
          </div>
          <h1 className="font-display text-3xl md:text-5xl font-black text-brand-dark leading-tight mb-4">{post.title}</h1>
          <p className="text-gray-500 text-lg leading-relaxed mb-6 max-w-2xl">{post.excerpt}</p>
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-brand-pink/20 flex items-center justify-center text-brand-pink font-bold text-sm">
                {post.author[0]}
              </div>
              <div>
                <div className="font-semibold text-brand-dark text-sm">{post.author}</div>
                <div className="text-xs">{post.authorRole}</div>
              </div>
            </div>
            <span className="flex items-center gap-1"><Calendar size={13} />{post.date}</span>
            <span className="flex items-center gap-1"><Clock size={13} />{post.readTime} min read</span>
          </div>
        </div>
      </div>

      {/* Cover image */}
      <div className="max-w-4xl mx-auto px-4 -mt-8 mb-8">
        <div className="h-64 md:h-80 rounded-3xl bg-gradient-to-br from-brand-cream to-white shadow-card overflow-hidden">
          <img src="/images/about-img2.png" alt={post.title} className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 pb-16">
        <div className="prose prose-lg max-w-none">
          <ul className="space-y-1 list-none p-0">
            {parseContent(post.content)}
          </ul>
        </div>

        {/* Share */}
        <div className="mt-10 pt-8 border-t border-gray-100 flex items-center justify-between flex-wrap gap-4">
          <p className="font-semibold text-gray-700">Share this article:</p>
          <div className="flex gap-3">
            {['Twitter', 'Facebook', 'WhatsApp'].map(platform => (
              <button key={platform} className="px-4 py-2 rounded-full border border-gray-200 text-sm hover:border-brand-pink hover:text-brand-pink transition-colors flex items-center gap-1.5">
                <Share2 size={13} /> {platform}
              </button>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-10 p-6 rounded-3xl bg-gradient-to-r from-brand-pink/10 to-brand-green/10 text-center">
          <p className="font-display font-bold text-xl mb-2">Enjoyed this article?</p>
          <p className="text-gray-500 mb-4">Try our premium appalams and experience the taste for yourself.</p>
          <Link href="/products" className="btn-primary">Shop Nanmai Appalam</Link>
        </div>
      </article>
    </div>
  );
}
