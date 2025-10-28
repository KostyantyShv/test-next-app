# Quick Start: Bunny Stream Integration

## Швидкий старт за 5 хвилин

### 1. Створіть акаунт Bunny Stream (2 хв)

1. Зайдіть на https://bunny.net
2. Створіть безкоштовний акаунт
3. Створіть Video Library
4. Отримайте Library ID та API Key

### 2. Налаштуйте environment variables (1 хв)

Створіть файл `.env.local` в корені проекту:

```bash
NEXT_PUBLIC_BUNNY_STREAM_LIBRARY_ID=your-library-id
NEXT_PUBLIC_BUNNY_STREAM_API_KEY=your-api-key
```

### 3. Додайте відео плеєр на сторінку (2 хв)

```tsx
// В будь-якому компоненті
import { BunnyVideoPlayer } from '@/components/player/BunnyVideoPlayer';

export default function MyVideoPage() {
  return (
    <BunnyVideoPlayer
      videoId="your-video-id"
      width={1920}
      height={1080}
      controls={true}
    />
  );
}
```

### 4. Завантажте відео (опціонально)

Використовуйте Bunny Stream dashboard або API:

```typescript
// Через API
const response = await fetch('/api/bunny-stream/videos', {
  method: 'POST',
  body: JSON.stringify({ title: 'My Video' })
});
```

### 5. Налаштуйте webhook (опціонально)

1. Dashboard → Settings → Webhooks
2. Додайте: `https://your-domain.com/api/bunny-stream/webhook`

## Готово! 🎉

Ваші відео тепер працюють через Bunny Stream з:
- ✅ Adaptive streaming
- ✅ Automatic encoding
- ✅ CDN distribution
- ✅ Analytics
- ✅ Webhook integration

## Документація

Дивіться `BUNNY_STREAM_INTEGRATION.md` для детальної інформації.

## Приклади використання

### Замінити існуючий PromoVideo

```tsx
// Замість
import PromoVideo from "@/components/school/edit/PromoVideo/PromoVideo";

// Використовуйте
import BunnyPromoVideo from "@/components/school/edit/PromoVideo/BunnyPromoVideo";
```

### Додати на сторінку Player

```tsx
// src/app/player/page.tsx
import { BunnyVideoPlayer } from '@/components/player/BunnyVideoPlayer';

<div className="w-full h-[400px] rounded-2xl overflow-hidden">
  <BunnyVideoPlayer
    videoId={videoId} // отримайте з пропи або store
    width={1920}
    height={1080}
    controls={true}
  />
</div>
```

## Підтримка

Якщо є питання:
1. Перевірте `BUNNY_STREAM_INTEGRATION.md`
2. Перевірте [Bunny Stream Docs](https://docs.bunny.net/stream/)
3. Перевірте помилки в console

---

**Технології:**
- Next.js 15
- TypeScript
- Bunny Stream API
- HLS Video Streaming

