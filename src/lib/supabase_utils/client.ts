/**
 * Supabase Client для клієнтського коду (Client Components)
 * 
 * Використовується в React компонентах, які виконуються на клієнті
 */

import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

