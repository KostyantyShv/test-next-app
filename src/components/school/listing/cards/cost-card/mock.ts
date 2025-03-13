import {
  HeaderData,
  NetPriceBreakdownData,
  StickerPriceData,
  ValueSectionData,
} from "./types";

export const headerData: HeaderData = {
  title: "Yale University Cost Breakdown",
};

export const valueSectionData: ValueSectionData = {
  title: "Value",
  description:
    "Based on average net price, earnings potential, student and alumni reviews, and additional factors.",
  netPrice: "$11,740",
  nationalAverage: "$15,523",
  priceNote:
    "Average cost after financial aid for students receiving grant or scholarship aid, as reported by the college.",
  links: [
    {
      text: "Learn More About Student Loans",
      href: "#",
    },
    {
      text: "See Scholarships & Financial Aid",
      href: "#",
    },
  ],
};

export const netPriceBreakdownData: NetPriceBreakdownData = {
  title: "Net Price Breakdown",
  mainStats: [
    {
      label: "Net Price",
      value: "$11,740 / year",
      national: "$15,523",
    },
    {
      label: "Average Total Aid Awarded",
      value: "$10,555 / year",
      national: "$7,535",
    },
    {
      label: "Students Receiving Financial Aid",
      value: "94%",
    },
    {
      label: "Net Price Calculator",
      value: "Calculator",
      href: "npc.collegeboard.org/student",
    },
  ],
  incomeBreakdown: {
    title: "Net Price by Household Income",
    prices: [
      { range: "<$30k", price: "$2,033 / year" },
      { range: "$30-48k", price: "$3,599 / year" },
      { range: "$49-75k", price: "$8,897 / year" },
      { range: "$76-110k", price: "$14,440 / year" },
      { range: "$110k+", price: "$15,203 / year" },
    ],
    note: "Net price is the average cost after financial aid for students receiving grant or scholarship aid, as reported by the college.",
  },
};

export const stickerPriceData: StickerPriceData = {
  title: "Sticker Price Breakdown",
  tuition: {
    inState: "$6,381",
    outOfState: "$28,659",
  },
  additionalCosts: [
    { label: "Average Housing Cost", value: "$6,350 / year" },
    { label: "Average Meal Plan Cost", value: "$4,600 / year" },
    { label: "Books & Supplies", value: "$810 / year" },
  ],
  plans: [
    { name: "Tuition Guarantee Plan", available: false },
    { name: "Tuition Payment Plan", available: true },
    { name: "Prepaid Tuition Plan", available: true },
  ],
};
