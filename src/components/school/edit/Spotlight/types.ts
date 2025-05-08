export interface Author {
  name: string;
  avatar: string;
}

export interface Stat {
  label: string;
  value: string;
}

export interface CtaRow {
  text: string;
  buttonText: string;
}

export interface Contact {
  logo: string;
  title: string;
  description: string;
  buttonText: string;
}

export interface SidebarLink {
  text: string;
  url: string;
}

export interface SocialButton {
  type: string;
  url: string;
}

export interface Sidebar {
  banner: string;
  title: string;
  description: string;
  links: SidebarLink[];
  socialButtons: SocialButton[];
}

export interface Spotlight {
  id: number;
  author: Author;
  projectDate: string;
  title: string;
  description: string;
  stats: Stat[];
  images: string[];
  ctaRows: CtaRow[];
  tags: string[];
  contact: Contact;
  sidebar: Sidebar;
  pinned: boolean;
}

export type SpotlightFormData = Omit<Spotlight, "id" | "pinned">;
