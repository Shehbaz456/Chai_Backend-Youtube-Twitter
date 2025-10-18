import { z } from 'zod';

export const createTweetSchema = z.object({
  body: z.object({
    content: z
      .string({ required_error: 'Content is required' })
      .min(3, 'Tweet must be at least 3 characters')
      .max(280, 'Tweet cannot exceed 280 characters')
      .trim()
      .transform((val) => val.trim()),
  }),
});

export const getUserTweetsSchema = z.object({
  params: z.object({
    userId: z
      .string({ required_error: 'User ID is required' })
      .regex(/^[0-9a-fA-F]{24}$/, 'Invalid user ID format'),
  }),
});

export const updateTweetSchema = z.object({
  params: z.object({
    tweetId: z
      .string({ required_error: 'Tweet ID is required' })
      .regex(/^[0-9a-fA-F]{24}$/, 'Invalid tweet ID format'),
  }),

  body: z.object({
    content: z
      .string({ required_error: 'Content is required' })
      .min(3, 'Tweet must be at least 3 characters')
      .max(280, 'Tweet cannot exceed 280 characters')
      .trim()
      .transform((val) => val.trim()),
  }),
});

export const deleteTweetSchema = z.object({
  params: z.object({
    tweetId: z
      .string({ required_error: 'Tweet ID is required' })
      .regex(/^[0-9a-fA-F]{24}$/, 'Invalid tweet ID format'),
  }),
});
