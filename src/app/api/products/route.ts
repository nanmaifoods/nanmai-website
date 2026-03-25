import { createAdminClient } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

// GET - Fetch all products (public for active products)
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const featured = searchParams.get("featured");
  const activeOnly = searchParams.get("active") !== "false"; // Default true

  try {
    const supabase = createAdminClient();

    let query = supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (activeOnly) {
      query = query.eq("is_active", true);
    }

    if (category && category !== "all") {
      query = query.eq("category", category);
    }

    if (featured === "true") {
      query = query.eq("is_featured", true);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ products: data || [] });
  } catch (err) {
    console.error("Server error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

// POST - Create a new product
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const supabase = createAdminClient();

    // Generate slug from name
    const slug = body.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    const insertData = {
      name: body.name,
      slug: slug,
      description: body.description || "",
      price: body.price,
      original_price: body.original_price || null,
      images: body.images || [],
      category: body.category,
      weight: body.weight || "",
      stock: body.stock || 0,
      is_active: body.is_active ?? true,
      is_featured: body.is_featured ?? false,
      tags: body.tags || [],
      ingredients: body.ingredients || null,
      nutritional_info: body.nutritional_info || null,
    };

    const { data, error } = await supabase
      .from("products")
      .insert(insertData as never)
      .select()
      .single();

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ product: data }, { status: 201 });
  } catch (err) {
    console.error("Server error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
