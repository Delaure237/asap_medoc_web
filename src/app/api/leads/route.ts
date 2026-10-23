import { NextResponse, type NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const backendUrl =
      process.env.BACKEND_API_URL ||
      process.env.NEXT_PUBLIC_API_URL ||
      'http://localhost:3000';

    const res = await fetch(`${backendUrl}/api/leads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await res.json().catch(() => null);
    return NextResponse.json(data ?? { message: res.statusText }, { status: res.status });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Erreur de connexion au backend';
    return NextResponse.json(
      { error: 'Impossible de contacter le serveur backend.', details: message },
      { status: 502 }
    );
  }
}
