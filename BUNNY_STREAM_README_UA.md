# Інтеграція Bunny Stream для відтворення відео

## Що було зроблено

Я створив повну інтеграцію **Bunny Stream** у ваш проект. Ось що вже готово:

### 📁 Створені файли

1. **API Client** - `src/lib/bunny-stream/client.ts`
   - Клієнт для роботи з Bunny Stream API
   - Методи для CRUD операцій з відео

2. **Типи** - `src/types/video.ts`
   - TypeScript типи для відео даних
   - Інтерфейси для конфігурації

3. **API Routes:**
   - `src/app/api/bunny-stream/webhook/route.ts` - обробка webhook
   - `src/app/api/bunny-stream/videos/route.ts` - список та створення відео
   - `src/app/api/bunny-stream/videos/[videoId]/route.ts` - отримання/оновлення/видалення

4. **Відео Плеєр** - `src/components/player/BunnyVideoPlayer/BunnyVideoPlayer.tsx`
   - Повнофункціональний плеєр з:
     - HLS streaming
     - Adaptive bitrate
     - Keyboard shortcuts
     - Прогрес бар
     - Гучність
     - Fullscreen

5. **Приклади:**
   - `src/components/school/edit/PromoVideo/BunnyPromoVideo.tsx` - оновлений PromoVideo
   - `src/app/video-example/page.tsx` - демо сторінка

6. **Документація:**
   - `BUNNY_STREAM_INTEGRATION.md` - детальна інструкція
   - `QUICK_START.md` - швидкий старт
   - `.example.env.local` - приклад конфігурації

## Швидкий старт

### 1. Створіть акаунт Bunny Stream

1. Зайдіть на https://bunny.net
2. Створіть безкоштовний акаунт
3. Створіть Video Library
4. Скопіюйте Library ID та API Key

### 2. Налаштуйте environment variables

Створіть файл `.env.local` в корені проекту:

```bash
# Скопіюйте .example.env.local
cp .example.env.local .env.local

# Додайте ваші ключі
NEXT_PUBLIC_BUNNY_STREAM_LIBRARY_ID=your-library-id
NEXT_PUBLIC_BUNNY_STREAM_API_KEY=your-api-key
```

### 3. Використання

#### Простий приклад:

```tsx
import { BunnyVideoPlayer } from '@/components/player/BunnyVideoPlayer';

<BunnyVideoPlayer
  videoId="your-video-id"
  width={1920}
  height={1080}
  controls={true}
/>
```

#### Приклад на сторінці:

```tsx
// src/app/player/page.tsx
import { BunnyVideoPlayer } from '@/components/player/BunnyVideoPlayer';

export default function PlayerPage() {
  return (
    <div className="w-full rounded-2xl overflow-hidden">
      <BunnyVideoPlayer
        videoId="your-video-id"
        width={1920}
        height={1080}
        controls={true}
        autoplay={false}
      />
    </div>
  );
}
```

### 4. Тестова сторінка

Відкрийте http://localhost:3000/video-example для тестування

## Основні можливості

### ✅ Adaptive Streaming
- Автоматична адаптація якості залежно від швидкості інтернету
- HLS протокол для найкращої якості

### ✅ Keyboard Shortcuts
- `Space` - Play/Pause
- `M` - Mute/Unmute
- `F` - Fullscreen
- `← →` - Перемотка на 10 секунд
- `↑ ↓` - Зміна гучності

### ✅ Контролери
- Play/Pause
- Прогрес бар
- Гучність (slider + mute)
- Час відтворення
- Fullscreen

### ✅ API Integration
- CRUD операції через REST API
- Webhook для обробки подій
- Automatic encoding

### ✅ Додатково
- Thumbnails
- CDN розподілення
- Analytics
- Множинні формати відео

## API використання

### Отримати всі відео

```typescript
const response = await fetch('/api/bunny-stream/videos');
const { videos } = await response.json();
```

### Створити відео

```typescript
const response = await fetch('/api/bunny-stream/videos', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ title: 'My Video' })
});
const { video } = await response.json();
```

### Отримати конкретне відео

```typescript
const response = await fetch('/api/bunny-stream/videos/video-id');
const { video } = await response.json();
```

### Видалити відео

```typescript
await fetch('/api/bunny-stream/videos/video-id', {
  method: 'DELETE'
});
```

## Webhook Integration

### Налаштування

1. Зайдіть в Bunny Stream Dashboard
2. Settings → Webhooks
3. Додайте URL: `https://your-domain.com/api/bunny-stream/webhook`
4. Виберіть події:
   - `video.uploaded`
   - `video.completed`
   - `video.error`
   - `video.queued`

### Обробка подій

Всі події обробляються в `src/app/api/bunny-stream/webhook/route.ts`

Ви можете розширити обробку для ваших потреб:

```typescript
async function handleVideoCompleted(payload: WebhookPayload) {
  // Надіслати email
  await sendEmail({
    to: user.email,
    subject: 'Video ready!',
    body: `Video "${payload.Title}" has been processed.`
  });
}
```

## Оновлення існуючих компонентів

### PromoVideo

Замість старого PromoVideo використовуйте новий:

```tsx
// Замінити
import PromoVideo from "@/components/school/edit/PromoVideo/PromoVideo";

// На
import BunnyPromoVideo from "@/components/school/edit/PromoVideo/BunnyPromoVideo";
```

## Переваги Bunny Stream

### vs YouTube/Vimeo
- ✅ Більше контролю
- ✅ Немає реклами
- ✅ Краща інтеграція з вашою платформою
- ✅ Customizable плеєр

### vs Self-hosting
- ✅ CDN розподілення
- ✅ Автоматичне кодування
- ✅ Менше навантаження на сервер
- ✅ Adaptive streaming "з коробки"

## Налаштування для production

### 1. Додайте в .env

```bash
NEXT_PUBLIC_BUNNY_STREAM_LIBRARY_ID=production-library-id
NEXT_PUBLIC_BUNNY_STREAM_API_KEY=production-api-key
```

### 2. Налаштуйте CORS

Bunny Stream Dashboard → Settings → CORS Domains

Додайте ваш production domain

### 3. Налаштуйте Webhook

Додайте production URL для webhook

### 4. Підключіть HLS.js (опціонально)

```bash
npm install hls.js
```

## Troubleshooting

### Відео не відтворюється

1. Перевірте videoId
2. Перевірте статус відео (має бути закодоване)
3. Перевірте CORS settings

### CORS помилка

Додайте ваш domain в Bunny Stream Dashboard → Settings → CORS

### Погана якість

1. Використовуйте оригінальне відео високої якості
2. Зачекайте завершення кодування
3. Використовуйте HLS для адаптивної якості

## Документація

- Детальна інструкція: `BUNNY_STREAM_INTEGRATION.md`
- Швидкий старт: `QUICK_START.md`
- Bunny Stream Docs: https://docs.bunny.net/stream/

## Файли для огляду

1. `src/lib/bunny-stream/client.ts` - API клієнт
2. `src/components/player/BunnyVideoPlayer/BunnyVideoPlayer.tsx` - Плеєр
3. `src/app/api/bunny-stream/webhook/route.ts` - Webhook handler
4. `src/app/video-example/page.tsx` - Демо сторінка
5. `src/app/api/bunny-stream/videos/` - API routes

## Підтримка

Питання? Перевірте:
1. `BUNNY_STREAM_INTEGRATION.md`
2. [Bunny Stream Docs](https://docs.bunny.net/stream/)
3. Console errors

---

**Готово!** Тепер ви маєте повнофункціональну інтеграцію Bunny Stream для відтворення відео. 🎉

