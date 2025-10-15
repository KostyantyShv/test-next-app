import { ThemeOption, LayoutOption, NotificationItem } from './types';

export const THEMES: ThemeOption[] = [
  { id: 'midnight', name: 'Midnight Coding', description: 'Dark theme optimized for coding sessions' },
  { id: 'light', name: 'Light Mode', description: 'Clean and bright for daytime use' },
  { id: 'mint', name: 'Mint Fresh', description: 'Refreshing green-tinted interface' },
  { id: 'teal', name: 'Teal Ocean', description: 'Calming teal and blue tones' },
  { id: 'oceanic', name: 'Oceanic Blue', description: 'Deep blue inspired by ocean depths' },
];

export const LAYOUTS: LayoutOption[] = [
  { id: 'grid', name: 'Grid View', description: 'Responsive grid layout' },
  { id: 'list', name: 'List View', description: 'Clean vertical list' },
  { id: 'hybrid', name: 'Hybrid View', description: 'Combined layout' },
  { id: 'classic', name: 'Classic View', description: 'Traditional cards' },
  { id: 'table', name: 'Table View', description: 'Structured data table' },
  { id: 'card', name: 'Card View', description: 'Enhanced cards' },
  { id: 'magazine', name: 'Magazine View', description: 'Editorial layout' },
  { id: 'compact', name: 'Compact View', description: 'Dense information' },
];

export const STUDENT_NOTIFICATIONS: NotificationItem[] = [
  { id: 'badge-earned', name: 'New Badge Earned', tooltip: 'Receive a notification when you earn a new badge for activities like writing your first review.' },
  { id: 'new-review', name: 'New Review on My Schools', tooltip: 'Get an alert when a school you\'ve bookmarked receives a new review.' },
  { id: 'deadline-reminder', name: 'Application Deadline Reminders', tooltip: 'Get a reminder when an application deadline for a school on your list is approaching.' },
  { id: 'school-updates', name: 'Updates to My Schools', tooltip: 'Be notified when a school on your list updates its profile.' },
  { id: 'review-published', name: 'My Review is Published', tooltip: 'Receive a confirmation after a review you\'ve written has been approved and published.' },
  { id: 'school-suggestions', name: 'Similar School Suggestions', tooltip: 'Get recommendations for other schools you might like.' },
  { id: 'review-helpful', name: 'My Review Was Helpful', tooltip: 'Get an alert when another user upvotes your review.' },
];

export const VENDOR_NOTIFICATIONS: NotificationItem[] = [
  { id: 'new-school-review', name: 'New Review on My School', tooltip: '(For School Admins) Receive an alert whenever a new review is posted for your school.' },
  { id: 'review-flagged', name: 'A Review is Flagged', tooltip: '(For School Admins) Be notified when a review on your school\'s page is flagged for moderation.' },
  { id: 'new-follower', name: 'New Follower', tooltip: '(For School Admins) Get a notification when a student follows your school\'s page.' },
];

export const SYSTEM_NOTIFICATIONS: NotificationItem[] = [
  { id: 'new-login', name: 'New Login Alerts', tooltip: 'Receive a security alert when a login to your account occurs from a new device or location.' },
  { id: 'password-change', name: 'Password Change Alerts', tooltip: 'Receive a security alert confirming that your password has been changed.' },
];
