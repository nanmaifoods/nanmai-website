import { createAdminClient } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

// GET - Fetch a single product by ID or slug
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const supabase = createAdminClient();
    const { id } = params;

    // Try to find by ID first, then by slug
    let { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .single();

    // If not found by ID, try slug
    if (error || !data) {
      const result = await supabase
        .from("products")
        .select("*")
        .eq("slug", id)
        .single();
      data = result.data;
      error = result.error;
    }

    if (error || !data) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ product: data });
  } catch (err) {
    console.error("Server error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

// PUT - Update a product
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const body = await request.json();
    const supabase = createAdminClient();
    const { id } = params;

    // Check if product exists
    const { data: existing, error: checkError } = await supabase
      .from("products")
      .select("id")
      .eq("id", id)
      .single();

    if (checkError || !existing) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Update slug if name changed
    let slug = body.slug;
    if (body.name) {
      slug = body.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
    }

    const updateData: Record<string, unknown> = {};

    if (body.name !== undefined) updateData.name = body.name;
    if (slug !== undefined) updateData.slug = slug;
    if (body.description !== undefined)
      updateData.description = body.description;
    if (body.price !== undefined) updateData.price = body.price;
    if (body.original_price !== undefined)
      updateData.original_price = body.original_price;
    if (body.images !== undefined) updateData.images = body.images;
    if (body.category !== undefined) updateData.category = body.category;
    if (body.weight !== undefined) updateData.weight = body.weight;
    if (body.stock !== undefined) updateData.stock = body.stock;
    if (body.is_active !== undefined) updateData.is_active = body.is_active;
    if (body.is_featured !== undefined)
      updateData.is_featured = body.is_featured;
    if (body.tags !== undefined) updateData.tags = body.tags;
    if (body.ingredients !== undefined)
      updateData.ingredients = body.ingredients;
    if (body.nutritional_info !== undefined)
      updateData.nutritional_info = body.nutritional_info;

    const { data, error } = await supabase
      .from("products")
      .update(updateData as never)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ product: data });
  } catch (err) {
    console.error("Server error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

// DELETE - Delete a product
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const supabase = createAdminClient();
    const { id } = params;

    const { error } = await supabase.from("products").delete().eq("id", id);

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Server error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
