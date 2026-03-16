export interface ProjectStat {
  label: string;
  value: string;
}

export interface ProjectActionItem {
  title: string;
  buttonLabel: string;
  href: string;
}

export interface ProjectContactCard {
  logoImage: string;
  title: string;
  description: string;
  buttonLabel: string;
  buttonHref: string;
}

export interface ProjectResourceLink {
  label: string;
  href: string;
}

export type ProjectSocialPlatform = "twitter" | "facebook" | "linkedin";

export interface ProjectSocialLink {
  platform: ProjectSocialPlatform;
  href: string;
  label: string;
}

export interface ProjectSidebar {
  bannerImage: string;
  title: string;
  description: string;
  resourceLinks: ProjectResourceLink[];
  socialLinks: ProjectSocialLink[];
  primaryActionLabel: string;
  primaryActionHref: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  date: string;
  coverImage: string;
  authorName: string;
  authorAvatar: string;
  tags: string[];
  tagCount: number;
  cost: string;
  duration: string;
  imageCount: number;
  galleryImages: string[];
  stats: ProjectStat[];
  actionItems: ProjectActionItem[];
  contactCard: ProjectContactCard;
  sidebar: ProjectSidebar;
}
