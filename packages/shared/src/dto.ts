export interface RecipientCreateDto {
  fullName: string;
  email?: string;
}

export interface EventCreateDto {
  recipientId: string;
  type: string;
  date: string;
  budgetEur: number;
  notes?: string;
}
