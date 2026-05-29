import { NextResponse } from 'next/server';
import { submitContact } from '../../../services/contact';

export async function POST(request: Request) {
  try {
    const form = await request.json();
    const result = await submitContact(form);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
