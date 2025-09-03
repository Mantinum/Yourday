import { z } from 'zod';
import { Preferences } from './types.js';

export const PreferencesSchema = z.nativeEnum(Preferences);

export const RecipientCreateSchema = z.object({
  name: z.string(),
  email: z.string().email(),
});

export const EventCreateSchema = z.object({
  name: z.string(),
  date: z.string(),
});
