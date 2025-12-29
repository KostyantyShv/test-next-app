'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { createClient } from '@/lib/supabase_utils/client';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  user?: {
    name: string;
    email: string;
    plan?: string;
    avatar?: string;
  };
  isDropdownOpen?: boolean;
  onDropdownToggle?: (isOpen: boolean) => void;
  dropdownPosition?: 'right' | 'left';
  sidebarCollapsed?: boolean;
}

const sizeClasses = {
  sm: 'w-8 h-8',
  md: 'w-10 h-10',
  lg: 'w-12 h-12',
  xl: 'w-16 h-16',
};

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = 'Avatar',
  size = 'md',
  className = '',
  user: userProp,
  isDropdownOpen: externalIsDropdownOpen,
  onDropdownToggle,
  dropdownPosition = 'right',
  sidebarCollapsed = false,
}) => {
  const [internalIsDropdownOpen, setInternalIsDropdownOpen] = useState(false);
  const isDropdownOpen = externalIsDropdownOpen !== undefined ? externalIsDropdownOpen : internalIsDropdownOpen;
  const [user, setUser] = useState<{
    name: string;
    email: string;
    plan?: string;
    avatar?: string;
  } | null>(userProp || null);
  const [loading, setLoading] = useState(true);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const supabase = createClient();
  const router = useRouter();

  // Завантажити дані користувача з Supabase
  useEffect(() => {
    const loadUser = async () => {
      if (userProp) {
        setUser(userProp);
        setLoading(false);
        return;
      }

      try {
        const { data: { user: authUser } } = await supabase.auth.getUser();
        if (!authUser) {
          setLoading(false);
          return;
        }

        // Завантажити профіль
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', authUser.id)
          .single();

        if (profile) {
          setUser({
            name: profile.full_name || `${profile.first_name || ''} ${profile.last_name || ''}`.trim() || authUser.email || 'User',
            email: profile.email || authUser.email || '',
            avatar: profile.avatar_url || undefined,
            plan: 'Professional until Apr 30, 2025', // TODO: додати реальний план з бази
          });
        } else {
          setUser({
            name: authUser.email?.split('@')[0] || 'User',
            email: authUser.email || '',
            avatar: undefined,
          });
        }
      } catch (error) {
        console.error('Error loading user:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUser();

    // Підписка на зміни профілю через Realtime та оновлення при фокусі
    let channel: any = null;
    const handleFocus = () => {
      loadUser();
    };

    if (!userProp) {
      (async () => {
        const { data: { user: authUser } } = await supabase.auth.getUser();
        if (authUser) {
          // Realtime підписка на зміни профілю
          channel = supabase
            .channel(`profile_changes_${authUser.id}`)
            .on(
              'postgres_changes',
              {
                event: 'UPDATE',
                schema: 'public',
                table: 'profiles',
                filter: `id=eq.${authUser.id}`
              },
              (payload) => {
                // Оновити аватар при зміні профілю
                if (payload.new.avatar_url !== payload.old?.avatar_url) {
                  loadUser();
                }
              }
            )
            .subscribe();

          // Оновлювати при фокусі вікна
          window.addEventListener('focus', handleFocus);
          
          // Оновлювати при події profileUpdated
          window.addEventListener('profileUpdated', handleFocus);
        }
      })();
    }

    return () => {
      if (channel) {
        supabase.removeChannel(channel);
      }
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('profileUpdated', handleFocus);
    };
  }, [userProp]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        if (onDropdownToggle) {
          onDropdownToggle(false);
        } else {
          setInternalIsDropdownOpen(false);
        }
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isDropdownOpen, onDropdownToggle]);

  const handleAvatarClick = () => {
    // На мобільному пристрої перенаправляємо на сторінку /me
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      router.push('/me');
      return;
    }
    const newState = !isDropdownOpen;
    if (onDropdownToggle) {
      onDropdownToggle(newState);
    } else {
      setInternalIsDropdownOpen(newState);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
    router.refresh();
  };

  const avatarSrc = src || user?.avatar;
  const displayName = user?.name || 'User Name';
  const displayEmail = user?.email || 'user@example.com';
  
  // Debug: перевірка наявності аватара
  useEffect(() => {
    if (avatarSrc) {
      console.log('Avatar URL:', avatarSrc);
    } else {
      console.log('No avatar URL, will show initials');
    }
  }, [avatarSrc]);

  if (loading) {
    return (
      <div className={`relative rounded-full overflow-hidden ${sizeClasses[size]} ${className} bg-gray-200 animate-pulse`} />
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className={`relative cursor-pointer rounded-full overflow-hidden ${sizeClasses[size]} ${className}`}
        onClick={handleAvatarClick}
      >
        {avatarSrc && avatarSrc.trim() !== '' ? (
          <Image
            src={avatarSrc}
            alt={alt}
            fill
            className="object-cover"
            unoptimized={avatarSrc.includes('supabase.co')}
            onError={() => {
              console.error('Error loading avatar image:', avatarSrc);
              // Fallback буде показано автоматично, оскільки умова avatarSrc не виконається
              setUser(prev => prev ? { ...prev, avatar: undefined } : null);
            }}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm">
            {displayName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'U'}
          </div>
        )}
      </div>

      {/* Dropdown Menu - приховати на мобільному */}
      {isDropdownOpen && (
        <div 
          data-avatar-dropdown
          className={cn(
            "hidden md:block w-70 bg-white rounded-xl shadow-lg border border-gray-100 z-[2000] transition-all duration-300",
            dropdownPosition === 'left' 
              ? (sidebarCollapsed ? 'fixed left-[100px] bottom-[17px] opacity-100 translate-x-0' : 'fixed left-[272px] bottom-[17px] opacity-100 translate-x-0')
              : 'absolute top-12 right-0 animate-in fade-in-0 zoom-in-95 duration-200'
          )}
          style={{ 
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', 
            width: '280px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Arrow */}
          {dropdownPosition === 'left' ? (
            <div className="absolute -left-2 bottom-[27px] w-3 h-3 bg-[#E1E7EE] transform rotate-45 shadow-[-2px_2px_5px_rgba(0,0,0,0.12)]"></div>
          ) : (
            <div className="absolute -top-2 right-4 w-4 h-4 bg-white border-l border-t border-gray-100 transform rotate-45"></div>
          )}
          
          {/* Top Section */}
          <div className="p-4 border-b border-[#D7F7E9]">
            <h3 className="text-base font-semibold text-[#464646] mb-1" style={{ fontSize: '16px', fontWeight: 600 }}>
              {displayName}
            </h3>
            <p className="text-sm text-[#5F5F5F] mb-3" style={{ fontSize: '14px' }}>
              {displayEmail}
            </p>
            {user?.plan && (
              <div className="text-[#016853] bg-[#D7F7E9] px-3 py-1.5 rounded-md inline-block" style={{ fontSize: '13px', fontWeight: 500 }}>
                {user.plan}
              </div>
            )}
          </div>

          {/* Menu Section */}
          <div className="py-2">
            <Link href="/account-details" className="flex items-center px-4 py-2 text-[#4A4A4A] hover:bg-[#EBFCF4] hover:text-[#016853] transition-all duration-200 group">
              <svg className="w-6 h-6 mr-3 text-[#5F5F5F] group-hover:text-[#016853] transition-colors" fill="none" viewBox="0 0 48 48">
                <path fill="currentColor" d="M15.408 21.669a4.959 4.959 0 1 0 0-9.918 4.959 4.959 0 0 0 0 9.918zm0 3a7.959 7.959 0 1 0 0-15.918 7.959 7.959 0 0 0 0 15.918zM15.41 30.5c-5.417 0-9.808 4.39-9.808 9.808a1.5 1.5 0 1 1-3 0c0-7.074 5.734-12.808 12.808-12.808s12.808 5.734 12.808 12.808a1.5 1.5 0 1 1-3 0c0-5.417-4.391-9.808-9.808-9.808z" clipRule="evenodd" fillRule="evenodd"></path>
              </svg>
              <span className="text-sm font-normal" style={{ fontSize: '14px', fontWeight: 400, lineHeight: 1.4 }}>My Profile</span>
            </Link>

            <Link href="/preferences" className="flex items-center px-4 py-2 text-[#4A4A4A] hover:bg-[#EBFCF4] hover:text-[#016853] transition-all duration-200 group">
              <svg className="w-6 h-6 mr-3 text-[#5F5F5F] group-hover:text-[#016853] transition-colors" fill="none" viewBox="0 0 24 24">
                <path fill="currentColor" d="M12 4C10.3431 4 9 5.34315 9 7C9 8.65685 10.3431 10 12 10C13.6569 10 15 8.65685 15 7C15 5.34315 13.6569 4 12 4ZM7 7C7 4.23858 9.23858 2 12 2C14.7614 2 17 4.23858 17 7C17 9.76142 14.7614 12 12 12C9.23858 12 7 9.76142 7 7ZM19.0277 15.6255C18.6859 15.5646 18.1941 15.6534 17.682 16.1829C17.4936 16.3777 17.2342 16.4877 16.9632 16.4877C16.6922 16.4877 16.4328 16.3777 16.2444 16.1829C15.7322 15.6534 15.2405 15.5646 14.8987 15.6255C14.5381 15.6897 14.2179 15.9384 14.0623 16.3275C13.8048 16.9713 13.9014 18.662 16.9632 20.4617C20.0249 18.662 20.1216 16.9713 19.864 16.3275C19.7084 15.9384 19.3882 15.6897 19.0277 15.6255ZM21.721 15.5847C22.5748 17.7191 21.2654 20.429 17.437 22.4892C17.1412 22.6484 16.7852 22.6484 16.4893 22.4892C12.6609 20.4291 11.3516 17.7191 12.2053 15.5847C12.6117 14.5689 13.4917 13.8446 14.5481 13.6565C15.3567 13.5125 16.2032 13.6915 16.9632 14.1924C17.7232 13.6915 18.5697 13.5125 19.3783 13.6565C20.4347 13.8446 21.3147 14.5689 21.721 15.5847ZM9.92597 14.2049C10.1345 14.7163 9.889 15.2999 9.3776 15.5084C7.06131 16.453 5.5 18.5813 5.5 20.9999C5.5 21.5522 5.05228 21.9999 4.5 21.9999C3.94772 21.9999 3.5 21.5522 3.5 20.9999C3.5 17.6777 5.641 14.8723 8.6224 13.6565C9.1338 13.448 9.71743 13.6935 9.92597 14.2049Z" clipRule="evenodd" fillRule="evenodd"/>
              </svg>
              <span className="text-sm font-normal" style={{ fontSize: '14px', fontWeight: 400, lineHeight: 1.4 }}>Preferences</span>
            </Link>

            <Link href="/account-details" className="flex items-center px-4 py-2 text-[#4A4A4A] hover:bg-[#EBFCF4] hover:text-[#016853] transition-all duration-200 group">
              <svg className="w-6 h-6 mr-3 text-[#5F5F5F] group-hover:text-[#016853] transition-colors" viewBox="0 0 24 24">
                <path fill="currentColor" d="M14 12.5C14 13.6046 13.1046 14.5 12 14.5C10.8954 14.5 10 13.6046 10 12.5C10 11.3954 10.8954 10.5 12 10.5C13.1046 10.5 14 11.3954 14 12.5Z"/>
                <path fill="currentColor" d="M12 17.25C11.7265 17.25 11.3186 17.3871 10.6823 17.9811C10.2786 18.3579 9.64578 18.3361 9.26894 17.9323C8.89211 17.5286 8.91393 16.8958 9.31768 16.5189C10.1099 15.7795 10.9878 15.25 12 15.25C13.0122 15.25 13.8901 15.7795 14.6823 16.5189C15.0861 16.8958 15.1079 17.5286 14.7311 17.9323C14.3542 18.3361 13.7214 18.3579 13.3177 17.9811C12.6814 17.3871 12.2735 17.25 12 17.25Z" clipRule="evenodd" fillRule="evenodd"/>
                <path fill="currentColor" d="M4 5C4 3.34315 5.34315 2 7 2H17C18.6569 2 20 3.34315 20 5V19C20 20.6569 18.6569 22 17 22H7C5.34315 22 4 20.6569 4 19V5ZM7 4C6.44772 4 6 4.44772 6 5V19C6 19.5523 6.44772 20 7 20H17C17.5523 20 18 19.5523 18 19V5C18 4.44772 17.5523 4 17 4H7Z" clipRule="evenodd" fillRule="evenodd"/>
                <path fill="currentColor" d="M9 7C9 6.44772 9.44772 6 10 6H14C14.5523 6 15 6.44772 15 7C15 7.55228 14.5523 8 14 8H10C9.44772 8 9 7.55228 9 7Z" clipRule="evenodd" fillRule="evenodd"/>
              </svg>
              <span className="text-sm font-normal" style={{ fontSize: '14px', fontWeight: 400, lineHeight: 1.4 }}>Account Details</span>
            </Link>

            <Link href="/billing" className="flex items-center px-4 py-2 text-[#4A4A4A] hover:bg-[#EBFCF4] hover:text-[#016853] transition-all duration-200 group">
              <svg className="w-6 h-6 mr-3 text-[#5F5F5F] group-hover:text-[#016853] transition-colors" viewBox="0 0 256 256" fill="currentColor">
                <path d="M224,48H32A16,16,0,0,0,16,64V192a16,16,0,0,0,16,16H224a16,16,0,0,0,16-16V64A16,16,0,0,0,224,48Zm0,16V88H32V64Zm0,128H32V104H224v88Zm-16-24a8,8,0,0,1-8,8H168a8,8,0,0,1,0-16h32A8,8,0,0,1,208,168Zm-64,0a8,8,0,0,1-8,8H120a8,8,0,0,1,0-16h16A8,8,0,0,1,144,168Z"></path>
              </svg>
              <span className="text-sm font-normal" style={{ fontSize: '14px', fontWeight: 400, lineHeight: 1.4 }}>Billing</span>
            </Link>

            <Link href="/sign-in-and-security" className="flex items-center px-4 py-2 text-[#4A4A4A] hover:bg-[#EBFCF4] hover:text-[#016853] transition-all duration-200 group">
              <svg className="w-6 h-6 mr-3 text-[#5F5F5F] group-hover:text-[#016853] transition-colors" viewBox="0 0 24 24">
                <path fill="currentColor" d="M12 2C9.23858 2 7 4.23858 7 7V9C5.89543 9 5 9.89543 5 11V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V11C19 9.89543 18.1046 9 17 9V7C17 4.23858 14.7614 2 12 2ZM9 7C9 5.34315 10.3431 4 12 4C13.6569 4 15 5.34315 15 7V9H9V7Z"/>
                <circle cx="12" cy="15" r="2" fill="white"/>
              </svg>
              <span className="text-sm font-normal" style={{ fontSize: '14px', fontWeight: 400, lineHeight: 1.4 }}>Sign In & Security</span>
            </Link>

            <Link href="/support" className="flex items-center px-4 py-2 text-[#4A4A4A] hover:bg-[#EBFCF4] hover:text-[#016853] transition-all duration-200 group">
              <svg className="w-6 h-6 mr-3 text-[#5F5F5F] group-hover:text-[#016853] transition-colors" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none">
                <path d="M9.984 9A2.248 2.248 0 0 1 12 7.75a2.25 2.25 0 0 1 1.579 3.853c-.5.493-1.108 1.025-1.402 1.65M12 16.25v.01m0 2.99a7.25 7.25 0 1 1 0-14.5 7.25 7.25 0 0 1 0 14.5Z" strokeLinejoin="round" strokeLinecap="round"/>
              </svg>
              <span className="text-sm font-normal" style={{ fontSize: '14px', fontWeight: 400, lineHeight: 1.4 }}>Support</span>
            </Link>

            <Link href="/request-content" className="flex items-center px-4 py-2 text-[#4A4A4A] hover:bg-[#EBFCF4] hover:text-[#016853] transition-all duration-200 group">
              <svg className="w-6 h-6 mr-3 text-[#5F5F5F] group-hover:text-[#016853] transition-colors" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h6v6h-6z"></path>
                <path d="M14 4h6v6h-6z"></path>
                <path d="M4 14h6v6h-6z"></path>
                <path d="M17 17m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
              </svg>
              <span className="text-sm font-normal" style={{ fontSize: '14px', fontWeight: 400, lineHeight: 1.4 }}>Request New Content</span>
            </Link>

            <Link href="/team-members-dashboard" className="flex items-center px-4 py-2 text-[#4A4A4A] hover:bg-[#EBFCF4] hover:text-[#016853] transition-all duration-200 group">
              <svg className="w-6 h-6 mr-3 text-[#5F5F5F] group-hover:text-[#016853] transition-colors" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path fill="currentColor" d="M256 464c-114.69 0-208-93.31-208-208S141.31 48 256 48s208 93.31 208 208-93.31 208-208 208zm0-384c-97 0-176 79-176 176s79 176 176 176 176-78.95 176-176S353.05 80 256 80z"/>
                <path fill="currentColor" d="M323.67 292c-17.4 0-34.21-7.72-47.34-21.73a83.76 83.76 0 01-22-51.32c-1.47-20.7 4.88-39.75 17.88-53.62S303.38 144 323.67 144c20.14 0 38.37 7.62 51.33 21.46s19.47 33 18 53.51a84 84 0 01-22 51.3C357.86 284.28 341.06 292 323.67 292zm55.81-74zm-215.66 77.36c-29.76 0-55.93-27.51-58.33-61.33-1.23-17.32 4.15-33.33 15.17-45.08s26.22-18 43.15-18 32.12 6.44 43.07 18.14 16.5 27.82 15.25 45c-2.44 33.77-28.6 61.27-58.31 61.27zm256.55 59.92c-1.59-4.7-5.46-9.71-13.22-14.46-23.46-14.33-52.32-21.91-83.48-21.91-30.57 0-60.23 7.9-83.53 22.25-26.25 16.17-43.89 39.75-51 68.18-1.68 6.69-4.13 19.14-1.51 26.11a192.18 192.18 0 00232.75-80.17zm-256.74 46.09c7.07-28.21 22.12-51.73 45.47-70.75a8 8 0 00-2.59-13.77c-12-3.83-25.7-5.88-42.69-5.88-23.82 0-49.11 6.45-68.14 18.17-5.4 3.33-10.7 4.61-14.78 5.75a192.84 192.84 0 0077.78 86.64l1.79-.14a102.82 102.82 0 013.16-20.02z"/>
              </svg>
              <span className="text-sm font-normal" style={{ fontSize: '14px', fontWeight: 400, lineHeight: 1.4 }}>Team</span>
            </Link>
          </div>

          {/* Logout Section */}
          <div className="border-t border-[#DFDDDB] pt-2">
            <button 
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-2 text-[#4A4A4A] hover:bg-[#E1E7EE] transition-all duration-200 group"
            >
              <svg className="w-6 h-6 mr-3 text-[#5F5F5F] group-hover:text-[#4A4A4A] transition-colors" viewBox="0 0 24 24">
                <path fill="currentColor" d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
              </svg>
              <span className="text-sm font-normal" style={{ fontSize: '14px', fontWeight: 400, lineHeight: 1.4 }}>Logout</span>
            </button>
          </div>

          {/* Footer Section */}
          <div className="bg-[#E1E7EE] p-3 border-t border-[#DFDDDB]">
            {/* Download Row */}
            <div className="flex items-center justify-between mb-3">
              <span className="text-[#464646]" style={{ fontSize: '13px', fontWeight: 500 }}>Download</span>
              <div className="flex gap-4">
                <a href="#" className="flex items-center gap-1 text-[#5F5F5F] hover:text-[#016853] transition-colors" style={{ fontSize: '13px' }}>
                  <svg viewBox="0 0 384 512" className="w-3.5 h-3.5">
                    <path fill="currentColor" d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
                  </svg>
                  iOS
                </a>
                <a href="#" className="flex items-center gap-1 text-[#5F5F5F] hover:text-[#016853] transition-colors" style={{ fontSize: '13px' }}>
                  <svg viewBox="0 0 576 512" className="w-3.5 h-3.5">
                    <path fill="currentColor" d="M420.55,301.93a24,24,0,1,1,24-24,24,24,0,0,1-24,24m-265.1,0a24,24,0,1,1,24-24,24,24,0,0,1-24,24m273.7-144.48,47.94-83a10,10,0,1,0-17.27-10h0l-48.54,84.07a301.25,301.25,0,0,0-246.56,0L116.18,64.45a10,10,0,1,0-17.27,10h0l47.94,83C64.53,202.22,8.24,285.55,0,384H576c-8.24-98.45-64.54-181.78-146.85-226.55"/>
                  </svg>
                  Android
                </a>
              </div>
            </div>

            {/* Connect Row */}
            <div className="flex items-center justify-between gap-2">
              <span className="text-[#464646]" style={{ fontSize: '13px', fontWeight: 500 }}>Connect</span>
              <div className="flex gap-2">
                <a href="#" className="w-7 h-7 bg-[#DFDDDB] hover:bg-[#D7F7E9] text-[#5F5F5F] hover:text-[#016853] rounded-md flex items-center justify-center transition-all duration-200">
                  <svg viewBox="0 0 24 24" className="w-4 h-4">
                    <path fill="currentColor" d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                <a href="#" className="w-7 h-7 bg-[#DFDDDB] hover:bg-[#D7F7E9] text-[#5F5F5F] hover:text-[#016853] rounded-md flex items-center justify-center transition-all duration-200">
                  <svg viewBox="0 0 24 24" className="w-4 h-4">
                    <path fill="currentColor" d="M14.82 4.26a10.14 10.14 0 0 0-.53 1.1 14.66 14.66 0 0 0-4.58 0 10.14 10.14 0 0 0-.53-1.1 16 16 0 0 0-4.13 1.3 17.33 17.33 0 0 0-3 11.59 16.6 16.6 0 0 0 5.07 2.59A12.89 12.89 0 0 0 8.23 18a9.65 9.65 0 0 1-1.71-.83 3.39 3.39 0 0 0 .42-.33 11.66 11.66 0 0 0 10.12 0q.21.18.42.33a10.84 10.84 0 0 1-1.71.84 12.41 12.41 0 0 0 1.08 1.78 16.44 16.44 0 0 0 5.06-2.59 17.22 17.22 0 0 0-3-11.59 16.09 16.09 0 0 0-4.09-1.35zM8.68 14.81a1.94 1.94 0 0 1-1.8-2 1.93 1.93 0 0 1 1.8-2 1.93 1.93 0 0 1 1.8 2 1.93 1.93 0 0 1-1.8 2zm6.64 0a1.94 1.94 0 0 1-1.8-2 1.93 1.93 0 0 1 1.8-2 1.92 1.92 0 0 1 1.8 2 1.92 1.92 0 0 1-1.8 2z"/>
                  </svg>
                </a>
                <a href="#" className="w-7 h-7 bg-[#DFDDDB] hover:bg-[#D7F7E9] text-[#5F5F5F] hover:text-[#016853] rounded-md flex items-center justify-center transition-all duration-200">
                  <svg viewBox="0 0 24 24" className="w-4 h-4">
                    <path fill="currentColor" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="#" className="w-7 h-7 bg-[#DFDDDB] hover:bg-[#D7F7E9] text-[#5F5F5F] hover:text-[#016853] rounded-md flex items-center justify-center transition-all duration-200">
                  <svg viewBox="0 0 24 24" className="w-4 h-4">
                    <path fill="currentColor" d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}; 