import { Program, ProgramCategory } from "./types";

export const mastersProgramMock: Program[] = [
  {
    university: "Lincoln Academy College of Pharmacy",
    name: "Lincoln Academy Forensic Science online grad program",
    location: "GAINESVILLE, FL",
    tags: ["Online", "Full-time"],
    description:
      "Established in fall of 2000, Lincoln Academy's award-winning forensic science master's degree is the world's largest and most comprehensive forensic science program. Students gain specialized knowledge in crime scene investigation, DNA analysis, and toxicology through a curriculum designed by leading experts in the field.",
    features: {
      length: "2 years",
      credits: "32",
      accreditation: "—",
      tuition: "$575",
      scholarship: "—",
    },
  },
  {
    university: "Lincoln Academy College of Pharmacy",
    name: "Lincoln Academy Pharmaceutical Outcomes & Policy online grad program",
    location: "GAINESVILLE, FL",
    tags: ["Online", "Part-time"],
    description:
      "The Online POP program is part of the Department of Pharmaceutical Outcomes and Policy at the Lincoln Academy. This innovative program prepares professionals to analyze healthcare systems, develop effective pharmaceutical policies, and implement evidence-based practices to improve patient outcomes across healthcare settings.",
    features: {
      length: "2 years",
      credits: "31",
      accreditation: "—",
      tuition: "$750",
      scholarship: "—",
    },
  },
  {
    university: "Lincoln Academy College of Sciences",
    name: "Lincoln Academy Clinical Toxicology online grad program",
    location: "GAINESVILLE, FL",
    tags: ["Online", "Full-time"],
    description:
      "The Clinical Toxicology program provides comprehensive education on the effects of poisons, drugs, and toxins on the human body. Students learn to assess, manage, and prevent toxicological issues through a curriculum that combines theoretical knowledge with practical applications in healthcare and forensic settings.",
    features: {
      length: "2 years",
      credits: "32",
      accreditation: "—",
      tuition: "$625",
      scholarship: "—",
    },
  },
  {
    university: "Lincoln Academy College of Pharmacy",
    name: "Lincoln Academy Pharmaceutical Chemistry online grad program",
    location: "GAINESVILLE, FL",
    tags: ["Online", "Full-time"],
    description:
      "The Pharmaceutical Chemistry program bridges chemistry and pharmaceutical sciences to prepare students for careers in drug discovery and development. The curriculum focuses on medicinal chemistry, pharmacokinetics, and drug formulation, giving graduates the skills needed to contribute to pharmaceutical research and innovation.",
    features: {
      length: "2 years",
      credits: "34",
      accreditation: "—",
      tuition: "$680",
      scholarship: "—",
    },
  },
];

export const doctoralProgramMock: Program[] = [
  {
    university: "Lincoln Academy College of Sciences",
    name: "Lincoln Academy Computational Biology Ph.D. program",
    location: "GAINESVILLE, FL",
    tags: ["On Campus", "Full-time"],
    description:
      "The Computational Biology Ph.D. program combines advanced computational methods with biological research to solve complex problems in life sciences. Students develop expertise in data analysis, modeling, and algorithm development for biological applications.",
    features: { length: "5 years", credits: "72", tuition: "$850" },
  },
  {
    university: "Lincoln Academy College of Engineering",
    name: "Lincoln Academy Artificial Intelligence Ph.D. program",
    location: "GAINESVILLE, FL",
    tags: ["On Campus", "Full-time"],
    description:
      "The Artificial Intelligence Ph.D. program focuses on advancing the field of AI through innovative research in machine learning, natural language processing, computer vision, and robotics. Students work alongside leading researchers and industry partners.",
    features: { length: "4 years", credits: "64", tuition: "$920" },
  },
];

export const mastersCategoriesMock: ProgramCategory[] = [
  {
    header: "Agricultural Sciences",
    items: [
      { name: "Agricultural Economics", detail: "On Campus Only" },
      { name: "Animal Sciences and Husbandry", detail: "On Campus Only" },
      { name: "Crop and Soil Sciences", detail: "On Campus, Online" },
      { name: "Horticulture", detail: "On Campus Only" },
    ],
  },
  {
    header: "Anthropology and Sociology",
    items: [
      { name: "Anthropology", detail: "On Campus Only" },
      { name: "Gender Studies", detail: "On Campus Only" },
      { name: "Sociology", detail: "On Campus Only" },
    ],
  },
  {
    header: "Architecture",
    items: [
      { name: "Architecture", detail: "On Campus, Online" },
      { name: "Landscape Architecture", detail: "On Campus Only" },
    ],
  },
  {
    header: "Biology",
    items: [
      { name: "Anatomy", detail: "On Campus Only" },
      { name: "Biochemistry and Molecular Biology", detail: "On Campus Only" },
      {
        name: "Biomedical Sciences and Molecular Medicine",
        detail: "On Campus, Online",
      },
      { name: "Biostatistics", detail: "On Campus, Online" },
      { name: "Botany and Plant Physiology", detail: "On Campus Only" },
    ],
  },
  {
    header: "Business and Management",
    items: [
      { name: "Business", detail: "On Campus, Online" },
      { name: "Entrepreneurship", detail: "On Campus Only" },
      { name: "Marketing", detail: "On Campus Only" },
      { name: "Real Estate", detail: "On Campus Only" },
    ],
  },
  {
    header: "Chemistry",
    items: [{ name: "Chemistry", detail: "On Campus Only" }],
  },
];

export const doctoralCategoriesMock: ProgramCategory[] = [
  {
    header: "Biological Sciences",
    items: [
      { name: "Computational Biology", detail: "On Campus Only" },
      { name: "Molecular Biology", detail: "On Campus Only" },
      { name: "Genetics", detail: "On Campus Only" },
    ],
  },
  {
    header: "Computer Science & Engineering",
    items: [
      { name: "Artificial Intelligence", detail: "On Campus Only" },
      { name: "Computer Science", detail: "On Campus Only" },
      { name: "Software Engineering", detail: "On Campus, Online" },
    ],
  },
];
