import { FC } from 'react';
import { cn } from '@/lib/utils';

export type IconName = 
  | 'home'
  | 'explore'
  | 'collections'
  | 'bookmarks'
  | 'library'
  | 'history'
  | 'playlist'
  | 'notifications'
  | 'settings'
  | 'arrow-right'
  | 'collapse'
  | 'expand'
  | 'time'
  | 'views'
  | 'lightbulb'
  | 'rating'
  | 'finished'
  | 'search'
  | 'plus'
  | 'minus'
  | 'chevron-up'
  | 'close'
  | 'share'
  | 'chevron-down'
  | 'lock'
  | 'check'
  | 'clock'
  | 'eye'
  | 'heart'
  | 'message'
  | 'highlight'
  | 'note'
  | 'copy'
  | 'link'
  | 'bookmark'
  | 'sources'
  | 'question-chat'
  | 'book'
  | 'more'
  | 'moon'
  | 'sun'
  | 'filters'
  | 'menu'
  | 'user'
  | 'warning'
  | 'minimize'
  | 'maximize'
  | 'x-circle'
  | 'flag'
  | 'arrow-up'
  | 'arrow-down'
  | 'edit'
  | 'google'
  | 'perplexity'
  | 'twitter'
  | 'comments'
  | 'pen'
  | 'grid'
  | 'bulb'
  | 'question'
  | 'star'
  | 'document'
  | 'chevron-left'
  | 'chevron-right'
  | 'puzzle'
  | 'x'
  | 'square-expand'
  | 'contract'
  | 'play'
  | 'pause'
  | 'next'
  | 'previous'
  | 'volume-off'
  | 'volume-low'
  | 'volume-high'
  | 'equalizer'
  | 'replay-15'
  | 'forward-5'
  | 'speed'
  | 'download';

interface IconProps {
  name: IconName;
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

const iconSizes = {
  xs: 'w-3 h-3',
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
  xl: 'w-8 h-8',
};

const iconPaths: Record<IconName, string> = {
  'home': 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
  
  'explore': 'M12 22a10 10 0 100-20 10 10 0 000 20zM9.3 9.6c.05-.12.14-.22.24-.29l7.3-5c.58-.4 1.3.22 1.02.86l-3.64 8.07c-.05.11-.13.21-.24.28l-7.3 5c-.58.4-1.3-.22-1.02-.86l3.64-8.06zM12 13.15a1.72 1.72 0 100-3.44 1.72 1.72 0 000 3.44z',

  'collections': 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10',
  
  'bookmarks': 'M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z',
  
  'library': 'M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z',
  
  'history': 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
  
  'playlist': 'M4 6h16M4 10h16M4 14h16M4 18h16',
  
  'notifications': 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9',
  
  'settings': 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M12 15a3 3 0 100-6 3 3 0 000 6z',
  
  'arrow-right': 'M14 5l7 7m0 0l-7 7m7-7H3',
  
  'collapse': 'M11 19l-7-7 7-7m8 14l-7-7 7-7',
  
  'expand': 'M13 5l7 7-7 7M5 5l7 7-7 7',
  
  'time': 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
  
  'views': 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z',
  
  'lightbulb': 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
  
  'rating': 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z',
  
  'finished': 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
  
  'search': 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z',

  'plus': 'M12 4v16m8-8H4',

  'minus': 'M20 12H4',

  'chevron-up': 'M5 15l7-7 7 7',

  'close': 'M6 18L18 6M6 6l12 12',

  'share': 'M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z',

  'chevron-down': 'M19 9l-7 7-7-7',

  'lock': 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z',

  'check': 'M5 13l4 4L19 7',

  'clock': 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',

  'eye': 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z',
  
  'heart': 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
  
  'message': 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z',
  
  'highlight': 'M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z',
  
  'note': 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
  
  'copy': 'M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z',

  'link': 'M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1',

  'bookmark': 'M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z',

  'sources': 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',

  'question-chat': 'M1.5 5.3v9.54a3.82 3.82 0 003.82 3.82h1.91v2.86L13 18.66h5.73a3.82 3.82 0 003.82-3.82V5.3a3.82 3.82 0 00-3.82-3.82H5.32A3.82 3.82 0 001.5 5.3z M12 12v-1.14a1.9 1.9 0 01.56-1.35l.79-.79a1.92 1.92 0 00.56-1.35V7.2A1.91 1.91 0 0012 5.3h0a1.91 1.91 0 00-1.91 1.9 M11.05 13.89h1.9',

  'book': 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',

  'more': 'M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z',

  'moon': 'M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z',
  
  'sun': 'M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z',
  
  'user': 'M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z',
  
  'filters': 'M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z',
  
  'menu': 'M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5',

  'warning': 'M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z',
  
  'minimize': 'M19.5 12h-15',
  
  'maximize': 'M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15',
  
  'x-circle': 'M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z',

  'flag': 'M3 3v1.5M3 21v-6m0 0l2.77-.693a9 9 0 016.208.682l.108.054a9 9 0 006.086.71l3.114-.732a48.524 48.524 0 01-.005-10.499l-3.11.732a9 9 0 01-6.085-.711l-.108-.054a9 9 0 00-6.208-.682L3 4.5M3 15V4.5',

  'arrow-up': 'M12 19V5m0 0l-7 7m7-7l7 7',

  'arrow-down': 'M12 5v14m0 0l7-7m-7 7l-7-7',

  'edit': 'M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z',

  'google': 'M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z',

  'perplexity': 'M12.75 15.75h.008v.008h-.008v-.008zm0 0H8.25V15h.008v.75h4.492v-.008zm0 0h3.75V15h-.008v.75h-3.742v-.008zm6 0h.008v.008h-.008v-.008zm0 0h-3.75V15h.008v.75h3.742v-.008zM6 15.75h.008v.008H6v-.008zm0 0H2.25V15h.008v.75h3.742v-.008zm16.5 0h.008v.008h-.008v-.008zm0 0h-3.75V15h.008v.75h3.742v-.008zM12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm0 4.5a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z',

  'twitter': 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z',

  'comments': 'M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z',
  
  'pen': 'M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z',
  
  'grid': 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z',

  'bulb': 'M12 2a7 7 0 017 7c0 2.38-1.19 4.47-3 5.74V17a2 2 0 01-2 2h-4a2 2 0 01-2-2v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 017-7zM9 21v-1h6v1a3 3 0 01-3 3 3 3 0 01-3-3z',
  
  'question': 'M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  
  'star': 'M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z',

  'document': 'M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z',

  'chevron-left': 'M15.75 19.5L8.25 12l7.5-7.5',

  'chevron-right': 'M8.25 4.5l7.5 7.5-7.5 7.5',

  'puzzle': 'M19 3.32H16C14.8954 3.32 14 4.21543 14 5.32V8.32C14 9.42457 14.8954 10.32 16 10.32H19C20.1046 10.32 21 9.42457 21 8.32V5.32C21 4.21543 20.1046 3.32 19 3.32Z M8 3.32H5C3.89543 3.32 3 4.21543 3 5.32V8.32C3 9.42457 3.89543 10.32 5 10.32H8C9.10457 10.32 10 9.42457 10 8.32V5.32C10 4.21543 9.10457 3.32 8 3.32Z M19 14.32H16C14.8954 14.32 14 15.2154 14 16.32V19.32C14 20.4246 14.8954 21.32 16 21.32H19C20.1046 21.32 21 20.4246 21 19.32V16.32C21 15.2154 20.1046 14.32 19 14.32Z M8 14.32H5C3.89543 14.32 3 15.2154 3 16.32V19.32C3 20.4246 3.89543 21.32 5 21.32H8C9.10457 21.32 10 20.4246 10 19.32V16.32C10 15.2154 9.10457 14.32 8 14.32Z',
  
  'x': 'M6 18L18 6M6 6l12 12',

  'square-expand': 'M10 19H5V14M14 5H19V10',

  'contract': 'M16.707 16l5.446 5.446-.707.707L16 16.707V21h-1v-6h6v1zM8 7.293L2.554 1.846l-.707.707L7.293 8H3v1h6V3H8z',

  'play': 'M6.75 5.25a.75.75 0 01.75-.75h9.75a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H7.5a.75.75 0 01-.75-.75V5.25z',
  
  'pause': 'M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z',
  
  'next': 'M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z M19 5.75v12.5',
  
  'previous': 'M18.75 5.653c0-.856-.917-1.398-1.667-.986l-11.54 6.348a1.125 1.125 0 000 1.971l11.54 6.347a1.125 1.125 0 001.667-.985V5.653z M5 5.75v12.5',
  
  'volume-off': 'M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25M12 9v6m0 0l-3-3m3 3l3-3',
  
  'volume-low': 'M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z',
  
  'volume-high': 'M11.25 4.125l3.75-3.75V19.875l-3.75-3.75H7.5a.75.75 0 01-.75-.75v-9a.75.75 0 01.75-.75h3.75z M14.25 12a3 3 0 110-6 3 3 0 010 6z M17.25 12a6 6 0 110-12 6 6 0 010 12z',

  'equalizer': 'M8 13V5m8 8v-6m-4-2v8m-8 4h2m3 0h10M4 9h2m3 0h10M4 17h2m3 0h10',
  
  'replay-15': 'M19.4791 7.09052C19.2191 6.77052 18.7491 6.72052 18.4291 6.98052C18.1091 7.24052 18.0591 7.71052 18.3191 8.03052C19.4491 9.43052 20.0791 11.0905 20.1391 12.8305C20.2991 17.3105 16.7791 21.0905 12.2891 21.2405C7.79906 21.4005 4.02906 17.8805 3.86906 13.4005C3.70906 8.92052 7.22906 5.14052 11.7191 4.99052C12.2891 4.97052 12.8891 5.02052 13.5391 5.15052C13.5791 5.16052 13.6191 5.15052 13.6591 5.15052C13.7591 5.20052 13.8791 5.23052 13.9891 5.23052C14.1591 5.23052 14.3191 5.18052 14.4591 5.06052C14.7791 4.80052 14.8291 4.33052 14.5791 4.01052L12.5991 1.54052C12.3391 1.22052 11.8691 1.16052 11.5491 1.42052C11.2291 1.68052 11.1791 2.15052 11.4291 2.47052L12.2591 3.50052C12.0691 3.49052 11.8691 3.48052 11.6791 3.49052C6.36906 3.67052 2.19906 8.15052 2.38906 13.4605C2.57906 18.7705 7.04906 22.9405 12.3591 22.7505C17.6691 22.5605 21.8391 18.0905 21.6491 12.7805C21.5591 10.7105 20.8191 8.74052 19.4791 7.09052Z M12.3806 16.9203H10.0906C9.68062 16.9203 9.34062 16.5803 9.34062 16.1703C9.34062 15.7603 9.68062 15.4203 10.0906 15.4203H12.3806C12.8106 15.4203 13.1606 15.0703 13.1606 14.6403C13.1606 14.2103 12.8106 13.8603 12.3806 13.8603H10.0906C9.85062 13.8603 9.62062 13.7403 9.48062 13.5503C9.34062 13.3603 9.30062 13.1003 9.38062 12.8703L10.1406 10.5803C10.2406 10.2703 10.5306 10.0703 10.8506 10.0703H13.9106C14.3206 10.0703 14.6606 10.4103 14.6606 10.8203C14.6606 11.2303 14.3206 11.5703 13.9106 11.5703H11.3906L11.1306 12.3603H12.3806C13.6406 12.3603 14.6606 13.3803 14.6606 14.6403C14.6606 15.9003 13.6406 16.9203 12.3806 16.9203Z',
  
  'forward-5': 'M14.4314 16.9203H12.1414C11.7314 16.9203 11.3914 16.5803 11.3914 16.1703C11.3914 15.7603 11.7314 15.4203 12.1414 15.4203H14.4314C14.8614 15.4203 15.2114 15.0703 15.2114 14.6403C15.2114 14.2103 14.8614 13.8603 14.4314 13.8603H12.1414C11.9014 13.8603 11.6714 13.7403 11.5314 13.5503C11.3914 13.3603 11.3514 13.1003 11.4314 12.8703L12.1914 10.5803C12.2914 10.2703 12.5814 10.0703 12.9014 10.0703H15.9614C16.3714 10.0703 16.7114 10.4103 16.7114 10.8203C16.7114 11.2303 16.3714 11.5703 15.9614 11.5703H13.4414L13.1814 12.3603H14.4314C15.6914 12.3603 16.7114 13.3803 16.7114 14.6403C16.7114 15.9003 15.6814 16.9203 14.4314 16.9203Z M12.0016 3.47945C11.9216 3.47945 11.8416 3.48945 11.7616 3.48945L12.5816 2.46945C12.8416 2.14945 12.7916 1.66945 12.4616 1.41945C12.1316 1.16945 11.6716 1.20945 11.4116 1.53945L9.44156 3.99945C9.43156 4.00945 9.43156 4.01945 9.42156 4.03945C9.39156 4.07945 9.37156 4.12945 9.35156 4.16945C9.33156 4.21945 9.31156 4.25945 9.30156 4.29945C9.29156 4.34945 9.29156 4.38945 9.29156 4.43945C9.29156 4.48945 9.29156 4.53945 9.29156 4.58945C9.29156 4.60945 9.29156 4.61945 9.29156 4.63945C9.30156 4.66945 9.32156 4.68945 9.33156 4.71945C9.35156 4.76945 9.37156 4.80945 9.39156 4.85945C9.42156 4.89945 9.45156 4.93945 9.49156 4.96945C9.51156 4.99945 9.52156 5.02945 9.55156 5.04945C9.57156 5.05945 9.58156 5.06945 9.60156 5.07945C9.62156 5.09945 9.65156 5.10945 9.68156 5.11945C9.73156 5.14945 9.79156 5.16945 9.84156 5.17945C9.88156 5.19945 9.91156 5.19945 9.94156 5.19945C9.97156 5.19945 9.99156 5.20945 10.0216 5.20945C10.0516 5.20945 10.0716 5.19945 10.0916 5.18945C10.1216 5.18945 10.1516 5.19945 10.1816 5.18945C10.8216 5.03945 11.4216 4.96945 11.9916 4.96945C16.4816 4.96945 20.1316 8.61945 20.1316 13.1095C20.1316 17.5994 16.4816 21.2495 11.9916 21.2495C7.50156 21.2495 3.85156 17.5994 3.85156 13.1095C3.85156 11.3695 4.42156 9.68945 5.50156 8.24945C5.75156 7.91945 5.68156 7.44945 5.35156 7.19945C5.02156 6.94945 4.55156 7.01945 4.30156 7.34945C3.02156 9.04945 2.35156 11.0395 2.35156 13.1095C2.35156 18.4195 6.67156 22.7495 11.9916 22.7495C17.3116 22.7495 21.6316 18.4295 21.6316 13.1095C21.6316 7.78945 17.3116 3.47945 12.0016 3.47945Z',
  
  'speed': 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z',
  
  'download': 'M12 4v12m0 0l-4-4m4 4l4-4M4 17v.5A2.5 2.5 0 006.5 20h11a2.5 2.5 0 002.5-2.5V17',
};

export const Icon: FC<IconProps> = ({ name, className, size = 'md' }) => {
  return (
    <svg 
      viewBox="0 0 24 24" 
      className={cn(
        'stroke-current',
        'fill-none',
        'stroke-2',
        iconSizes[size],
        className
      )}
    >
      <path 
        d={iconPaths[name]} 
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}; 