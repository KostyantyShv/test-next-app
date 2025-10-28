# Bunny Stream Integration Guide

## Що таке Bunny Stream?

**Bunny Stream** - це платформа для відео-хостингу та streaming від BunnyCDN, яка забезпечує:

- ✅ **CDN Integration** - Автоматичне розповсюдження через глобальну мережу
- ✅ **HLS Streaming** - Adaptive bitrate для оптимальної якості
- ✅ **Video Encoding** - Автоматичне кодування у різних форматах
- ✅ **API Integration** - Повна інтеграція через REST API
- ✅ **Webhooks** - Реал-тайм сповіщення про події
- ✅ **Analytics** - Статистика переглядів
- ✅ **Thumbnails** - Автоматичне створення превью

## Встановлення

### 1. Зареєструйтесь та отримайте API ключі

1. Зайдіть на [BunnyCDN](https://bunny.net)
2. Створіть Video Library
3. Отримайте API ключі в Settings

### 2. Налаштуйте змінні оточення

Додайте в `.env.local`:

```bash
# Bunny Stream Configuration
NEXT_PUBLIC_BUNNY_STREAM_LIBRARY_ID=your_library_id
NEXT_PUBLIC_BUNNY_STREAM_API_KEY=your_api_key
BUNNY_STREAM_CDN_URL=https://vz-your-id.b-cdn.net
```

### 3. Встановіть HLS.js (опціонально для кращої підтримки HLS)

```bash
npm install hls.js
npm install --save-dev @types/hls.js
```

## Використання

### Базове використання Video Player

```tsx
import { BunnyVideoPlayer } from '@/components/player/BunnyVideoPlayer';

export default function VideoPage() {
  return (
    <BunnyVideoPlayer
      videoId="your-video-id"
      width={1920}
      height={1080}
      controls={true}
      autoplay={false}
    />
  );
}
```

### API виклики

#### Отримати список відео

```typescript
import { bunnyStreamClient } from '@/lib/bunny-stream/client';

// Отримати всі відео
const videos = await bunnyStreamClient.getVideos();

// З пагінацією
const videos = await bunnyStreamClient.getVideos(1, 25);
```

#### Створити відео

```typescript
const video = await bunnyStreamClient.createVideo({
  title: 'My Video Title'
});

// Отримати URL для завантаження
const uploadUrl = `https://bunnycdn.com/api/library/${libraryId}/videos/${video.videoId}?upload=${video.videoId}`;
```

#### Отримати конкретне відео

```typescript
const video = await bunnyStreamClient.getVideo('video-id');

// Отримати URL для відтворення
const playbackUrl = bunnyStreamClient.getVideoUrl('video-id');
const hlsUrl = bunnyStreamClient.getVideoUrl('video-id', 'hls2');
```

### Використання через API Routes

```typescript
// Отримати всі відео
const response = await fetch('/api/bunny-stream/videos');
const data = await response.json();

// Створити відео
const response = await fetch('/api/bunny-stream/videos', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ title: 'New Video' })
});

// Отримати конкретне відео
const response = await fetch('/api/bunny-stream/videos/video-id');

// Оновити відео
const response = await fetch('/api/bunny-stream/videos/video-id', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ title: 'Updated Title' })
});

// Видалити відео
const response = await fetch('/api/bunny-stream/videos/video-id', {
  method: 'DELETE'
});
```

## Webhook Integration

### Налаштування Webhook

1. Зайдіть в Video Library Settings
2. Перейдіть до розділу Webhooks
3. Додайте URL: `https://your-domain.com/api/bunny-stream/webhook`
4. Виберіть події:
   - `video.uploaded` - Відео завантажено
   - `video.completed` - Кодування завершено
   - `video.error` - Помилка кодування
   - `video.queued` - Відео в черзі

### Обробка Webhook подій

Всі події обробляються автоматично в `/api/bunny-stream/webhook`. 

Ви можете розширити обробку в `src/app/api/bunny-stream/webhook/route.ts`:

```typescript
async function handleVideoCompleted(payload: WebhookPayload) {
  // Надіслати email користувачу
  await sendEmail({
    to: user.email,
    subject: 'Your video is ready!',
    body: `Video "${payload.Title}" has been processed.`
  });
  
  // Оновити UI
  await updateVideoStatus(payload.VideoId, 'completed');
}
```

## Особливості

### Adaptive Bitrate Streaming

Player автоматично використовує HLS для адаптивної якості відео залежно від швидкості інтернету користувача.

### Keyboard Shortcuts

- `Space` - Play/Pause
- `Arrow Left` - Назад на 10 секунд
- `Arrow Right` - Вперед на 10 секунд
- `Arrow Up` - Збільшити гучність
- `Arrow Down` - Зменшити гучність
- `M` - Mute/Unmute
- `F` - Fullscreen

### Прогрес відтворення

Player автоматично показує прогрес, час відтворення, гучність та інші елементи контролю.

## Приклади використання

### Заміна PromoVideo компонента

```tsx
import { BunnyVideoPlayer } from '@/components/player/BunnyVideoPlayer';
import { useState } from 'react';

export default function PromoVideo() {
  const [videoId, setVideoId] = useState<string | null>(null);

  const handleUpload = async (file: File) => {
    // Створити відео через API
    const response = await fetch('/api/bunny-stream/videos', {
      method: 'POST',
      body: JSON.stringify({ title: file.name })
    });
    const { video } = await response.json();
    
    setVideoId(video.videoId);
  };

  if (!videoId) {
    return <VideoUploader onUpload={handleUpload} />;
  }

  return (
    <BunnyVideoPlayer
      videoId={videoId}
      width={1920}
      height={1080}
      controls={true}
    />
  );
}
```

### Інтеграція з існуючою сторінкою Player

```tsx
// src/app/player/page.tsx
import { BunnyVideoPlayer } from '@/components/player/BunnyVideoPlayer';

export default function PlayerPage() {
  const videoId = 'your-video-id'; // Отримати з URL або пропи

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="w-full rounded-2xl overflow-hidden mt-4">
        <BunnyVideoPlayer
          videoId={videoId}
          width={1920}
          height={1080}
          controls={true}
          autoplay={true}
        />
      </div>
      
      {/* Решта контенту */}
    </div>
  );
}
```

## Безпека

### API Key Management

- ❌ Ніколи не комітьте API ключі в git
- ✅ Використовуйте environment variables
- ✅ Обмежуйте API ключі по IP (якщо можливо)
- ✅ Ротація ключів кожні 90 днів

### CORS налаштування

Налаштуйте CORS в Bunny Stream Dashboard для вашого домену.

## Оптимізація

### Ліниве завантаження

```tsx
import dynamic from 'next/dynamic';

const BunnyVideoPlayer = dynamic(
  () => import('@/components/player/BunnyVideoPlayer').then(mod => ({ default: mod.BunnyVideoPlayer })),
  { ssr: false }
);
```

### Preloading

```tsx
<BunnyVideoPlayer
  videoId={videoId}
  preload="metadata" // 'none', 'metadata', 'auto'
/>
```

## Підтримка браузерів

- ✅ Chrome/Edge (останні версії)
- ✅ Firefox (останні версії)
- ✅ Safari (останні версії)
- ✅ Mobile браузери (iOS Safari, Chrome Mobile)

## Troubleshooting

### Відео не відтворюється

1. Перевірте `videoId` - він повинен бути правильним
2. Перевірте статус відео - воно повинно бути закодоване
3. Перевірте CORS налаштування

### Помилка "CORS"

Додайте ваш домен в Bunny Stream Dashboard → Settings → CORS Domains.

### Погана якість відео

1. Перевірте оригінальну якість відео
2. Зачекайте завершення кодування
3. Використовуйте HLS для адаптивної якості

## Додаткові ресурси

- [Bunny Stream Documentation](https://docs.bunny.net/stream/)
- [Bunny Stream API Reference](https://docs.bunny.net/reference/bunnystream-api-overview)
- [HLS.js Documentation](https://github.com/video-dev/hls.js/)

## Ліцензування

Всі компоненти інтеграції безкоштовні для використання в проекті.

