/**
 * Supabase Client для Middleware
 * 
 * Використовується в Next.js middleware для оновлення сесій користувачів
 */

import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: '',
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )

  // Оновлюємо сесію користувача
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Публічні маршрути, які не потребують авторизації
  const publicRoutes = ['/login', '/register', '/forgot-password', '/verification', '/auth/callback']
  const isPublicRoute = publicRoutes.some(route => 
    request.nextUrl.pathname.startsWith(route)
  )
  
  // API routes також публічні
  const isApiRoute = request.nextUrl.pathname.startsWith('/api')

  // Якщо користувач не авторизований і намагається зайти на захищену сторінку
  if (!user && !isPublicRoute && !isApiRoute) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  // Якщо користувач не авторизований і намагається зайти на головну, редиректимо на /login
  if (!user && request.nextUrl.pathname === '/') {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  // Якщо користувач авторизований і намагається зайти на login/register, редиректимо на головну
  if (user && (request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/register')) {
    const url = request.nextUrl.clone()
    url.pathname = '/'
    return NextResponse.redirect(url)
  }

  return response
}

