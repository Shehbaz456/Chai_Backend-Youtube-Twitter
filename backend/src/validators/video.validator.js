import { z } from 'zod';

// Helper for video file validation
const videoFileSchema = (fieldName = "Video", required = true) => {
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
        return files[0].size <= 100 * 1024 * 1024; // 100 MB
      },
      { message: `${fieldName} size must be less than 100MB` }
    )
    .refine(
      (files) => {
        if (!files || files.length === 0) return true;
        return ["video/mp4", "video/webm", "video/ogg"].includes(files[0].mimetype);
      },
      { message: `${fieldName} must be a video (MP4, WebM, or OGG)` }
    );
};

// Helper for image file validation
const imageFileSchema = (fieldName = "Image", required = true) => {
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
      { message: `${fieldName} must be an image (JPEG, JPG, PNG, or WebP)` }
    );
};

// ===========================================
// GET ALL VIDEOS SCHEMA
// ===========================================
export const getAllVideosSchema = z.object({
  query: z.object({
    page: z
      .string()
      .optional()
      .default('1')
      .transform((val) => parseInt(val, 10))
      .refine((val) => val > 0, { message: 'Page must be greater than 0' }),
    
    limit: z
      .string()
      .optional()
      .default('10')
      .transform((val) => parseInt(val, 10))
      .refine((val) => val > 0 && val <= 100, { message: 'Limit must be between 1 and 100' }),
    
    query: z.string().optional().default(''),
    
    sortBy: z
      .string()
      .optional()
      .default('createdAt')
      .refine((val) => ['createdAt', 'title', 'views', 'duration'].includes(val), {
        message: 'sortBy must be one of: createdAt, title, views, duration',
      }),
    
    sortType: z
      .string()
      .optional()
      .default('desc')
      .refine((val) => ['asc', 'desc'].includes(val), {
        message: 'sortType must be either asc or desc',
      }),
    
    userId: z
      .string()
      .optional()
      .refine(
        (val) => {
          if (!val) return true;
          return /^[0-9a-fA-F]{24}$/.test(val); // MongoDB ObjectId validation
        },
        { message: 'Invalid userId format' }
      ),
  }),
});

// ===========================================
// PUBLISH VIDEO SCHEMA
// ===========================================
export const publishVideoSchema = z.object({
  body: z.object({
    title: z
      .string({ required_error: 'Title is required' })
      .min(3, 'Title must be at least 3 characters')
      .max(100, 'Title must not exceed 100 characters')
      .trim(),
    
    description: z
      .string({ required_error: 'Description is required' })
      .min(10, 'Description must be at least 10 characters')
      .max(5000, 'Description must not exceed 5000 characters')
      .trim(),
  }),

  files: z
    .object({
      videoFile: videoFileSchema('Video file', true),
      thumbnail: imageFileSchema('Thumbnail', true),
    })
    .refine((files) => files.videoFile && files.thumbnail, {
      message: 'Both video file and thumbnail are required',
    }),
});

// ===========================================
// GET VIDEO BY ID SCHEMA
// ===========================================
export const getVideoByIdSchema = z.object({
  params: z.object({
    videoId: z
      .string({ required_error: 'Video ID is required' })
      .regex(/^[0-9a-fA-F]{24}$/, 'Invalid video ID format'),
  }),
});

// ===========================================
// UPDATE VIDEO SCHEMA
// ===========================================
export const updateVideoSchema = z.object({
  params: z.object({
    videoId: z
      .string({ required_error: 'Video ID is required' })
      .regex(/^[0-9a-fA-F]{24}$/, 'Invalid video ID format'),
  }),

  body: z.object({
    title: z
      .string()
      .min(3, 'Title must be at least 3 characters')
      .max(100, 'Title must not exceed 100 characters')
      .trim()
      .optional(),
    
    description: z
      .string()
      .min(10, 'Description must be at least 10 characters')
      .max(5000, 'Description must not exceed 5000 characters')
      .trim()
      .optional(),
  }).refine((data) => data.title || data.description, {
    message: 'At least one field (title or description) must be provided',
  }),

  files: z
    .object({
      videoFile: videoFileSchema('Video file', false),
      thumbnail: imageFileSchema('Thumbnail', false),
    })
    .optional(),
});

// ===========================================
// DELETE VIDEO SCHEMA
// ===========================================
export const deleteVideoSchema = z.object({
  params: z.object({
    videoId: z
      .string({ required_error: 'Video ID is required' })
      .regex(/^[0-9a-fA-F]{24}$/, 'Invalid video ID format'),
  }),
});

// ===========================================
// TOGGLE PUBLISH STATUS SCHEMA
// ===========================================
export const togglePublishStatusSchema = z.object({
  params: z.object({
    videoId: z
      .string({ required_error: 'Video ID is required' })
      .regex(/^[0-9a-fA-F]{24}$/, 'Invalid video ID format'),
  }),
});
