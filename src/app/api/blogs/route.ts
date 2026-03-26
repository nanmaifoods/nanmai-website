import { createAdminClient } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

// GET - Fetch all blogs (public for published)
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const publishedOnly = searchParams.get("published") !== "false"; // Default true

  try {
    const supabase = createAdminClient();
    let query = supabase
      .from("blogs")
      .select("*")
      .order("created_at", { ascending: false });

    if (publishedOnly) {
      query = query.eq("is_published", true);
    }

    if (category && category !== "all") {
      query = query.eq("category", category);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ blogs: data || [] });
  } catch (err) {
    console.error("Server error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

// POST - Create a new blog
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const supabase = createAdminClient();

    // Generate slug from title
    const slug = body.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    const insertData = {
      title: body.title,
      slug: slug,
      excerpt: body.excerpt || "",
      content: body.content || "",
      cover_image: body.cover_image || "",
      category: body.category || "General",
      tags: body.tags || [],
      is_published: body.is_published ?? false,
      read_time: body.read_time || 5,
    };

    const { data, error } = await supabase
      .from("blogs")
      .insert(insertData as never)
      .select()
      .single();

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ blog: data }, { status: 201 });
  } catch (err) {
    console.error("Server error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
