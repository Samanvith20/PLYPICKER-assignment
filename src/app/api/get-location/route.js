import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    // Use request.headers.get() to access headers
    const ip =
      request.headers.get('cf-connecting-ip') ||  // Cloudflare IP header
      request.headers.get('x-real-ip') ||         // nginx or proxy IP header
      request.headers.get('x-forwarded-for');     // Standard proxy header

    console.log('IP Address:', ip); // Log the IP address

    if (!ip) {
      return new Response(JSON.stringify({ error: "Couldn't get IP address" }), {
        status: 400,
      });
    }

    return new Response(JSON.stringify({ ip }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
