export interface CartItem {
  id: number;
  title: string;
  description: string;
  image: string;
  price: number;
  period: string;
  originalPrice?: number;
  label: {
    text: string;
    color: string;
  };
  stats: Array<{
    icon: string;
    value: string;
  }>;
  features?: string[];
  specifics?: Array<{
    label: string;
    value: string;
  }>;
}

export interface PaymentFormData {
  email: string;
  cardNumber: string;
  expiryDate: string;
  cvc: string;
  cardHolder: string;
  address: string;
  cityState: string;
  zip: string;
}

