import { z } from 'zod';

// Helper for image validation
const imageFileSchema = (fieldName = "File", required = false) => {
  return z
    .array(z.any())
    .optional()
    .refine(
      (files) => {
        if (!required && (!files || files.length === 0)) return true;
        return files && files.length > 0;
      },
      { message: `${fieldName} is required` }
    )
    .refine(
      (files) => {
        if (!files || files.length === 0) return true;
        return files[0].size <= 5 * 1024 * 1024; // 5 MB
      },
      { message: `${fieldName} size must be less than 5MB` }
    )
    .refine(
      (files) => {
        if (!files || files.length === 0) return true;
        return ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(files[0].mimetype);
      },
      { message: `${fieldName} must be a JPEG, PNG, or WebP image` }
    );
};

// ===========================================
// REGISTER USER SCHEMA
// ===========================================
export const registerUserSchema = z.object({
  body: z.object({
    username: z
      .string({ required_error: 'Username is required' })
      .min(3, 'Username must be at least 3 characters')
      .max(20, 'Username must not exceed 20 characters')
      .regex( /^[a-z0-9_]+$/,'Username can only contain lowercase letters, numbers, and underscores')
      .trim()
      .toLowerCase()
      .transform((val) => val.toLowerCase()),

    email: z
      .string({ required_error: 'Email is required' })
      .email('Invalid email address')
      .trim()
      .toLowerCase()
      .transform((val) => val.toLowerCase()),

    fullName: z
      .string({ required_error: 'Full name is required' })
      .min(3, 'Full name must be at least 3 characters')
      .max(50, 'Full name must not exceed 50 characters')
      .trim()
      .transform((val) => val.trim()),

    password: z
      .string({ required_error: 'Password is required' })
      .min(6, 'Password must be at least 6 characters')
      .max(50, 'Password must not exceed 50 characters'),
  }),

  files: z
    .object({
      avatar: imageFileSchema('avatar', false),
      coverImage: imageFileSchema('coverImage', false),
    }).partial()
    .optional(),
});

// ===========================================
// LOGIN USER SCHEMA
// ===========================================
export const loginUserSchema = z.object({
  body: z
    .object({
      email: z.string().email('Invalid email address').optional(),
      username: z.string().min(3, 'Username must be at least 3 characters').optional(),
      password: z
        .string({ required_error: 'Password is required' })
        .min(6, 'Password must be at least 6 characters'),
    })
    .refine((data) => data.email || data.username, {
      message: 'Either email or username is required',
      path: ['email'],
    }),
});

// ===========================================
// REFRESH ACCESS TOKEN SCHEMA
// ===========================================
export const refreshAccessTokenSchema = z.object({
  body: z.object({
    refreshToken: z.string({ required_error: 'Refresh token is required' }).optional(),
  }),
  cookies: z
    .object({
      refreshToken: z.string().optional(),
    })
    .optional(),
});

// ===========================================
// CHANGE PASSWORD SCHEMA
// ===========================================
export const changePasswordSchema = z.object({
  body: z
    .object({
      oldPassword: z
        .string({ required_error: 'Old password is required' })
        .min(6, 'Old password cannot be empty'),
      newPassword: z
        .string({ required_error: 'New password is required' })
        .min(6, 'New password must be at least 6 characters')
        .max(50, 'New password must not exceed 50 characters'),
    })
    .refine((data) => data.oldPassword !== data.newPassword, {
      message: 'New password must be different from old password',
      path: ['newPassword'],
    }),
});

// ===========================================
// UPDATE ACCOUNT DETAILS SCHEMA
// ===========================================
export const updateAccountSchema = z.object({
  body: z
    .object({
      fullName: z
        .string()
        .min(3, 'Full name must be at least 3 characters')
        .max(50, 'Full name must not exceed 50 characters')
        .trim()
        .optional(),
      email: z.string().email('Invalid email address').trim().toLowerCase().optional(),
    })
    .refine((data) => data.fullName || data.email, {
      message: 'At least one field (fullName or email) must be provided',
    }),
});

// ===========================================
// UPDATE AVATAR SCHEMA
// ===========================================
export const updateAvatarSchema = z.object({
  file: z
    .any()
    .refine((file) => file, { message: 'Avatar file is required' })
    .refine((file) => file?.size <= 5 * 1024 * 1024, {
      message: 'Avatar size must be less than 5MB',
    })
    .refine(
      (file) =>
        ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(file?.mimetype),
      {
        message: 'Avatar must be a JPEG, JPG,PNG, or WebP image',
      }
    ),
});

// ===========================================
// UPDATE COVER IMAGE SCHEMA
// ===========================================
export const updateCoverImageSchema = z.object({
  file: z
    .any()
    .refine((file) => file, { message: 'Cover image file is required' })
    .refine((file) => file?.size <= 5 * 1024 * 1024, {
      message: 'Cover image size must be less than 5MB',
    })
    .refine(
      (file) =>
        ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(file?.mimetype),
      {
        message: 'Cover image must be a JPEG, PNG, or WebP image',
      }
    ),
});

// ===========================================
// GET USER CHANNEL PROFILE SCHEMA
// ===========================================
export const getUserChannelProfileSchema = z.object({
  params: z.object({
    username: z
      .string({ required_error: 'Username is required' })
      .min(3, 'Username must be at least 3 characters')
      .max(20, 'Username must not exceed 20 characters'),
  }),
});

// ===========================================
// GET WATCH HISTORY SCHEMA
// ===========================================
export const getWatchHistorySchema = z.object({
  query: z.object({
    page: z
      .string()
      .optional()
      .default('1')
      .transform((val) => parseInt(val)),
    limit: z
      .string()
      .optional()
      .default('10')
      .transform((val) => parseInt(val)),
  }),
});
