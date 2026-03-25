import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const data = await req.formData();
    const email = data.get('email') as string;

    if (!email || !email.includes('@')) {
      return NextResponse.redirect(new URL('/?subscribed=error', req.url));
    }

    const supabase = createAdminClient();
    const { error } = await supabase.from('subscribers').upsert({ email, is_active: true }, { onConflict: 'email' });

    if (error) throw error;

    return NextResponse.redirect(new URL('/?subscribed=true', req.url));
  } catch (error: any) {
    console.error('Subscribe error:', error);
    return NextResponse.redirect(new URL('/?subscribed=error', req.url));
  }
}
