export interface CaseStudy {
  id: number;
  title: string;
  category: string;
  description: string;
  thumbnail: string;
  status: "draft" | "published";
  pinned: boolean;
  hero: {
    subtitle: string;
    title: string;
    buttonText: string;
    buttonUrl: string;
    image: string;
  };
  infoColumns: {
    column1: { title: string; items: string[] };
    column2: { title: string; items: string[] };
  };
  overview: {
    title: string;
    text: string;
  };
  sections: Array<{
    title: string;
    text: string;
    image?: string;
  }>;
  keyFeatures: {
    label: string;
    title: string;
    features: string[];
  };
  gallery: string[];
  testimonial: {
    label: string;
    title: string;
    text: string;
    author: {
      name: string;
      title: string;
      image: string;
    };
    video: {
      image: string;
      buttonText: string;
    };
  };
}
