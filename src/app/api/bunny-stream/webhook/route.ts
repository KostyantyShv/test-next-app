/**
 * Bunny Stream Webhook Handler
 * 
 * Обробка подій від Bunny Stream
 * 
 * Для налаштування webhook в Bunny Stream:
 * 1. Зайдіть в Dashboard → Video Library
 * 2. Settings → Webhooks
 * 3. Додайте URL: https://your-domain.com/api/bunny-stream/webhook
 * 4. Виберіть події: video.completed, video.error, video.uploaded, video.queued
 */

import { NextRequest, NextResponse } from 'next/server';

interface WebhookPayload {
  VideoId: string;
  Status: number;
  LibraryId: number;
  Title: string;
  VideoGuid: string;
  WebhookType: string;
  CompletedDate?: string;
  Message?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: WebhookPayload = await request.json();
    
    console.log('Received Bunny Stream webhook:', {
      type: body.WebhookType,
      videoId: body.VideoId,
      status: body.Status,
      title: body.Title,
    });

    // Валідація webhook (опціонально - з Bunny Stream signature)
    // const signature = request.headers.get('Bunny-Signature');
    // if (!isValidSignature(signature, body)) {
    //   return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    // }

    // Обробка різних типів подій
    switch (body.WebhookType) {
      case 'video.uploaded':
        await handleVideoUploaded(body);
        break;
      
      case 'video.completed':
        await handleVideoCompleted(body);
        break;
      
      case 'video.error':
        await handleVideoError(body);
        break;
      
      case 'video.queued':
        await handleVideoQueued(body);
        break;
      
      default:
        console.log('Unknown webhook type:', body.WebhookType);
    }

    // Оновлення даних в базі даних (якщо використовуєте)
    // await updateVideoInDatabase(body.VideoId, {
    //   status: body.Status,
    //   lastUpdated: new Date(),
    // });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Webhook processing error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

async function handleVideoUploaded(payload: WebhookPayload) {
  console.log('Video uploaded:', payload.VideoId);
  // Додайте свою логіку обробки завантаження
  // Наприклад, відправка email користувачу
}

async function handleVideoCompleted(payload: WebhookPayload) {
  console.log('Video encoding completed:', payload.VideoId);
  // Додайте свою логіку обробки завершення
  // Наприклад, оновлення UI, відправка сповіщення
}

async function handleVideoError(payload: WebhookPayload) {
  console.error('Video encoding error:', payload.VideoId, payload.Message);
  // Додайте свою логіку обробки помилок
  // Наприклад, відправка alert адміністратору
}

async function handleVideoQueued(payload: WebhookPayload) {
  console.log('Video queued for encoding:', payload.VideoId);
  // Додайте свою логіку обробки черги
}

export async function GET(request: NextRequest) {
  // Простий endpoint для тестування
  return NextResponse.json({ message: 'Bunny Stream webhook endpoint is running' });
}

