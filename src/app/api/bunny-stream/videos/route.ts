import { NextRequest, NextResponse } from 'next/server';
import { bunnyStreamClient } from '@/lib/bunny-stream/client';

/**
 * GET /api/bunny-stream/videos
 * Отримати список всіх відео
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = searchParams.get('page') ? parseInt(searchParams.get('page')!) : undefined;
    const itemsPerPage = searchParams.get('itemsPerPage') ? parseInt(searchParams.get('itemsPerPage')!) : undefined;

    const videos = await bunnyStreamClient.getVideos(page, itemsPerPage);
    
    return NextResponse.json({ videos });
  } catch (error) {
    console.error('Error fetching videos:', error);
    return NextResponse.json(
      { error: 'Failed to fetch videos' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/bunny-stream/videos
 * Створити нове відео
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, collectionId } = body;

    if (!title) {
      return NextResponse.json(
        { error: 'Title is required' },
        { status: 400 }
      );
    }

    const video = await bunnyStreamClient.createVideo({ title, collectionId });
    
    return NextResponse.json({ video }, { status: 201 });
  } catch (error) {
    console.error('Error creating video:', error);
    return NextResponse.json(
      { error: 'Failed to create video' },
      { status: 500 }
    );
  }
}

