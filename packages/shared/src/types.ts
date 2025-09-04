export type ProductKind = 'egift' | 'physical';

export type OrderStatus =
  | 'created'
  | 'requires_confirmation'
  | 'paid'
  | 'failed'
  | 'sent';

export interface Recipient {
  id: string;
  fullName: string;
  email?: string;
}

export interface Event {
  id: string;
  recipientId: string;
  type: string;
  date: string;
  budgetEur: number;
  notes?: string;
}

export interface RecommendationItem {
  id?: string;
  title: string;
  url: string;
  image?: string;
  priceEur?: number;
  rating?: number;
  categories?: string[];
  score: number;
}

