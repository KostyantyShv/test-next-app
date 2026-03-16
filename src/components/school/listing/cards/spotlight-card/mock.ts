import spotlightProjects from "./spotlight-projects.json";
import { Project, ProjectSocialPlatform } from "./project.type";

export const projects: Project[] = spotlightProjects.map((project) => ({
  ...project,
  sidebar: {
    ...project.sidebar,
    socialLinks: project.sidebar.socialLinks.map((socialLink) => ({
      ...socialLink,
      platform: socialLink.platform as ProjectSocialPlatform,
    })),
  },
}));
