export interface HeaderData {
  title: string;
}

// Value Section Data
export interface Link {
  text: string;
  href: string;
}

export interface ValueSectionData {
  title: string;
  description: string;
  netPrice: string;
  nationalAverage: string;
  priceNote: string;
  links: Link[];
}

// Net Price Breakdown Data
export interface MainStat {
  label: string;
  value: string;
  national?: string;
  href?: string;
}

export interface IncomePrice {
  range: string;
  price: string;
}

export interface IncomeBreakdown {
  title: string;
  prices: IncomePrice[];
  note: string;
}

export interface NetPriceBreakdownData {
  title: string;
  mainStats: MainStat[];
  incomeBreakdown: IncomeBreakdown;
}

// Sticker Price Data
export interface Tuition {
  inState: string;
  outOfState: string;
}

export interface AdditionalCost {
  label: string;
  value: string;
}

export interface Plan {
  name: string;
  available: boolean;
}

export interface StickerPriceData {
  title: string;
  tuition: Tuition;
  additionalCosts: AdditionalCost[];
  plans: Plan[];
}
