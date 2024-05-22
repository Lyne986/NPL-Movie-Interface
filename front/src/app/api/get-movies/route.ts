import axios from 'axios';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get('title');
  console.log('GET /api/getMovies', title);

  const result = {}

  const response = NextResponse.json({ data: result });

  return response;
}
