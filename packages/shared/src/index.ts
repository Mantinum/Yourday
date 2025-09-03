export interface RecipientDTO {
  id: string;
  fullName: string;
  birthday?: string;
  interests: string[];
  avoid: string[];
  sizes?: Record<string, unknown>;
  email?: string;
  address?: Record<string, unknown>;
}

export interface EventDTO {
  id: string;
  recipientId: string;
  type: string;
  date: string;
  leadDays: number;
  budgetEur: number;
  notes?: string;
}
