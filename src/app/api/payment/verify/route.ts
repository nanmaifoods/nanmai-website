import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { createAdminClient } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderData,
    } = await req.json();

    // Verify signature
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json({ success: false, error: 'Invalid payment signature' }, { status: 400 });
    }

    // Save order to Supabase
    const supabase = createAdminClient();
    const subtotal = orderData.items.reduce((sum: number, item: any) => sum + item.product.price * item.quantity, 0);
    const shipping = subtotal >= 499 ? 0 : 60;
    const tax = Math.round(subtotal * 0.05);

    const { data: order, error } = await supabase
      .from('orders')
      .insert({
        order_number: orderData.orderId,
        customer_name: orderData.name,
        customer_email: orderData.email,
        customer_phone: orderData.phone,
        shipping_address: {
          address: orderData.address,
          city: orderData.city,
          state: orderData.state,
          pincode: orderData.pincode,
        },
        items: orderData.items,
        subtotal,
        shipping,
        tax,
        total: orderData.total,
        status: 'confirmed',
        payment_status: 'paid',
        razorpay_order_id,
        razorpay_payment_id,
      })
      .select('id')
      .single();

    if (error) {
      console.error('Supabase order save error:', error);
      // Payment is verified even if DB save fails – return success with warning
      return NextResponse.json({ success: true, orderId: orderData.orderId, warning: 'Order saved partially' });
    }

    // Update stock for each product
    for (const item of orderData.items) {
      await supabase.rpc('decrement_stock', { product_id: item.product.id, qty: item.quantity });
    }

    return NextResponse.json({ success: true, orderId: order.id });
  } catch (error: any) {
    console.error('Verify payment error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
