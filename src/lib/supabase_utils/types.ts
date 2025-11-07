/**
 * Типи для Supabase
 * 
 * Ці типи можна згенерувати автоматично за допомогою Supabase CLI:
 * npx supabase gen types typescript --project-id your-project-id > src/lib/supabase/types.ts
 */



import { Database } from "./database.types"

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type Enums<T extends keyof Database['public']['Enums']> = Database['public']['Enums'][T]

