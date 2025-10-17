import fs from "fs";
import { ZodError } from "zod";

export const validate = (schema) => (req, res, next) => {
  try {
    // Validate only the required data (body, files, params, query)
    const result = schema.safeParse({
      body: req.body,
      files: req.files,
      file: req.file,
      params: req.params,
      query: req.query,
      cookies: req.cookies,
    });

    // Validation Failed
    if (!result.success) {
      // Cleanup uploaded temp files (if validation fails)
      if (req.files) {
        Object.values(req.files).flat().forEach((file) => {
          if (file?.path && fs.existsSync(file.path)) {
            fs.unlinkSync(file.path);
            console.log(`🗑️ Deleted temp file: ${file.filename}`);
          }
        });
      } else if (req.file) {
        // Handle single file upload case
        if (req.file?.path && fs.existsSync(req.file.path)) {
          fs.unlinkSync(req.file.path);
          console.log(`🗑️ Deleted temp file: ${req.file.filename}`);
        }
      }

      // Format Zod errors → unified structure
      const errors = result.error.issues.map((issue) => ({
        field: issue.path.join(".") || null,
        message: issue.message,
      }));

      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors,
      });
    }

    // If passed validation, replace req data with parsed safe data
    req.validatedData = result.data;
    next();
  } catch (err) {
    console.error("Error in validation middleware:", err);

    // Handle unexpected errors gracefully
    if (err instanceof ZodError) {
      const errors = err.errors.map((issue) => ({
        field: issue.path.join(".") || null,
        message: issue.message,
      }));

      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error during validation",
      errors: [{ field: null, message: err.message }],
    });
  }
};
