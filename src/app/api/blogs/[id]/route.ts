import { createAdminClient } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

interface BlogData {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image: string;
  category: string;
  tags: string[];
  is_published: boolean;
  read_time: number;
  views: number;
}

// GET - Fetch single blog by ID or slug
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const supabase = createAdminClient();
    const { id } = params;

    // Try to find by ID first, then by slug
    let { data, error } = await supabase
      .from("blogs")
      .select("*")
      .eq("id", id)
      .single();

    // If not found by ID, try by slug
    if (error || !data) {
      const result = await supabase
        .from("blogs")
        .select("*")
        .eq("slug", id)
        .single();
      data = result.data;
      error = result.error;
    }

    if (error || !data) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    const blogData = data as unknown as BlogData;

    // Increment views
    await (supabase as any)
      .from("blogs")
      .update({ views: (blogData.views || 0) + 1 })
      .eq("id", blogData.id);

    return NextResponse.json({ blog: data });
  } catch (err) {
    console.error("Server error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

// PUT - Update a blog
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const body = await request.json();
    const supabase = createAdminClient();
    const { id } = params;

    const updateData: Record<string, any> = {};

    if (body.title !== undefined) {
      updateData.title = body.title;
      // Only regenerate slug if explicitly requested or if it's a new slug
      // We check if title actually changed from original
      if (body.regenerate_slug && body.regenerate_slug === true) {
        updateData.slug = body.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, "");
      }
    }
    if (body.excerpt !== undefined) updateData.excerpt = body.excerpt;
    if (body.content !== undefined) updateData.content = body.content;
    if (body.cover_image !== undefined)
      updateData.cover_image = body.cover_image;
    if (body.category !== undefined) updateData.category = body.category;
    if (body.tags !== undefined) updateData.tags = body.tags;
    if (body.is_published !== undefined)
      updateData.is_published = body.is_published;
    if (body.read_time !== undefined) updateData.read_time = body.read_time;

    const { data, error } = await (supabase as any)
      .from("blogs")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!data) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json({ blog: data });
  } catch (err) {
    console.error("Server error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

// DELETE - Delete a blog
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const supabase = createAdminClient();
    const { id } = params;

    const { error } = await supabase.from("blogs").delete().eq("id", id);

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
