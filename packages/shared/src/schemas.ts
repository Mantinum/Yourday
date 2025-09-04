import { z } from 'zod';
import { RecommendationItem } from './types.js';

export const PreferencesSchema = z.object({
  like: z.array(z.string()).default([]),
  avoid: z.array(z.string()).default([]),
  sizes: z.record(z.string()).optional(),
  budgetEur: z.number().int().min(1),
  shippingWindowDays: z.number().int().min(1).default(3),
});
export type Preferences = z.infer<typeof PreferencesSchema>;

export const RecommendationItemSchema = z.object({
  asin: z.string().optional(),
  title: z.string(),
  url: z.string().url(),
  image: z.string().url().optional(),
  priceEur: z.number().int().optional(),
  rating: z.number().min(0).max(5).optional(),
  categories: z.array(z.string()).default([]),
  score: z.number().default(0),
});
export type RecommendationItem = z.infer<typeof RecommendationItemSchema>;

export const RecipientCreateSchema = z.object({
  fullName: z.string(),
  email: z.string().email().optional(),
});

export const EventCreateSchema = z.object({
  recipientId: z.string(),
  type: z.string(),
  date: z.string(),
  budgetEur: z.number().int(),
  notes: z.string().optional(),
});
