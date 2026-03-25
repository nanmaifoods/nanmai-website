import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import { createAdminClient } from '@/lib/supabase';

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req: NextRequest) {
  try {
    const { amount, currency = 'INR', customerInfo, items } = await req.json();

    if (!amount || amount < 1) {
      return NextResponse.json({ error: 'Invalid amount' }, { status: 400 });
    }

    const receipt = `NM-${Date.now()}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;

    const order = await razorpay.orders.create({
      amount: Math.round(amount * 100), // paise
      currency,
      receipt,
      notes: {
        customer_name: customerInfo.name,
        customer_email: customerInfo.email,
      },
    });

    return NextResponse.json(order);
  } catch (error: any) {
    console.error('Create order error:', error);
    return NextResponse.json({ error: error.message || 'Failed to create order' }, { status: 500 });
  }
}
