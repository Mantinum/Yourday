export enum Preferences {
  Email = 'email',
  Sms = 'sms',
}

export enum Product {
  GiftCard = 'gift_card',
  Physical = 'physical',
}

export enum OrderStatus {
  Created = 'created',
  Sent = 'sent',
  Failed = 'failed',
}

export interface RecommendationItem {
  asin?: string;
  title: string;
  url: string;
  image?: string;
  priceEur?: number;
  rating?: number;
  categories?: string[];
  score: number;
}
