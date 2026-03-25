import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { createAdminClient } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const signature = req.headers.get('x-razorpay-signature');

    if (!signature) return NextResponse.json({ error: 'No signature' }, { status: 400 });

    const expectedSig = crypto
      .createHmac('sha256', process.env.RAZORPAY_WEBHOOK_SECRET!)
      .update(body)
      .digest('hex');

    if (expectedSig !== signature) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    const event = JSON.parse(body);
    const supabase = createAdminClient();

    switch (event.event) {
      case 'payment.captured':
        await supabase.from('orders')
          .update({ payment_status: 'paid', status: 'confirmed' })
          .eq('razorpay_payment_id', event.payload.payment.entity.id);
        break;
      case 'payment.failed':
        await supabase.from('orders')
          .update({ payment_status: 'failed', status: 'cancelled' })
          .eq('razorpay_order_id', event.payload.payment.entity.order_id);
        break;
      case 'refund.created':
        await supabase.from('orders')
          .update({ payment_status: 'refunded', status: 'refunded' })
          .eq('razorpay_payment_id', event.payload.refund.entity.payment_id);
        break;
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
