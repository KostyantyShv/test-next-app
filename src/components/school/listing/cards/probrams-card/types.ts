export interface Program {
  university: string;
  name: string;
  location: string;
  tags: string[];
  description: string;
  features: {
    length: string;
    credits: string;
    accreditation?: string;
    tuition: string;
    scholarship?: string;
  };
}

export interface ProgramItem {
  name: string;
  detail: string;
}

export interface ProgramCategory {
  header: string;
  items: ProgramItem[];
}
