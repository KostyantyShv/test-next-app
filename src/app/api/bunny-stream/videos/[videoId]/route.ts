import { NextRequest, NextResponse } from 'next/server';
import { bunnyStreamClient } from '@/lib/bunny-stream/client';

/**
 * GET /api/bunny-stream/videos/[videoId]
 * Отримати конкретне відео
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ videoId: string }> }
) {
  try {
    const { videoId } = await params;
    
    const video = await bunnyStreamClient.getVideo(videoId);
    
    return NextResponse.json({ video });
  } catch (error) {
    console.error('Error fetching video:', error);
    return NextResponse.json(
      { error: 'Failed to fetch video' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/bunny-stream/videos/[videoId]
 * Оновити відео
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ videoId: string }> }
) {
  try {
    const { videoId } = await params;
    const body = await request.json();
    
    const video = await bunnyStreamClient.updateVideo(videoId, body);
    
    return NextResponse.json({ video });
  } catch (error) {
    console.error('Error updating video:', error);
    return NextResponse.json(
      { error: 'Failed to update video' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/bunny-stream/videos/[videoId]
 * Видалити відео
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ videoId: string }> }
) {
  try {
    const { videoId } = await params;
    
    await bunnyStreamClient.deleteVideo(videoId);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting video:', error);
    return NextResponse.json(
      { error: 'Failed to delete video' },
      { status: 500 }
    );
  }
}

