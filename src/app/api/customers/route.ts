import { createAdminClient } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

// GET - Fetch unique customers from orders
export async function GET() {
  try {
    const supabase = createAdminClient();

    // Get unique customers from orders
    const { data: orders, error } = await supabase
      .from("orders")
      .select("customer_name, customer_email, customer_phone, created_at")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Get unique customers
    const typedOrders = orders as Array<{
      customer_name: string;
      customer_email: string;
      customer_phone: string;
      created_at: string;
    }> | null;

    const uniqueEmails = new Set<string>();
    const customers = [];

    for (const order of typedOrders || []) {
      if (order.customer_email && !uniqueEmails.has(order.customer_email)) {
        uniqueEmails.add(order.customer_email);
        customers.push({
          email: order.customer_email,
          name: order.customer_name,
          phone: order.customer_phone,
          first_order: order.created_at,
          total_orders:
            typedOrders?.filter(
              (o) => o.customer_email === order.customer_email,
            ).length || 1,
        });
      }
    }

    return NextResponse.json({ customers });
  } catch (err) {
    console.error("Server error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
