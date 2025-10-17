import { ApiError } from "../utils/ApiError.js";
import fs from "fs";
import path from "path";

// Global error handling middleware
// Handles all errors and cleans up uploaded files
 
const errorHandler = (err, req, res, next) => {
  // console.error("❌ Error caught in errorHandler:", err);

  // Clean up temp files if error occurs
  cleanupTempFiles(req);

  // Validation errors (Mongoose)
  if (err.name === "ValidationError") {
    const formattedErrors = Object.keys(err.errors).map((key) => ({
      field: key,
      message: err.errors[key].message,
    }));

    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: formattedErrors,
    });
  }

  // MongoDB duplicate key error
  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern)[0];
    return res.status(409).json({
      success: false,
      message: `${field} already exists`,
      errors: [{ field, message: `This ${field} is already registered` }],
    });
  }

  // Custom API errors
  if (err instanceof ApiError) {
    return res.status(err.statusCode || 500).json({
      success: false,
      message: err.message || "Internal Server Error",
      errors: err.errors || [],
    });
  }

  // Fallback for unknown errors
  return res.status(500).json({
    success: false,
    message: err.message || "Something went wrong",
    errors: [],
  });
};

// Helper function to clean up temp files Called when error occurs in controller

function cleanupTempFiles(req) {
  try {
    const filePaths = [];

    // Collect single file
    if (req.file?.path) {
      filePaths.push({ path: req.file.path, name: req.file.filename });
    }

    // Collect multiple files
    if (req.files) {
      if (Array.isArray(req.files)) {
        // multer.array()
        filePaths.push(
          ...req.files.map((file) => ({ path: file.path, name: file.filename }))
        );
      } else if (typeof req.files === "object" && req.files !== null) {
        // multer.fields()
        Object.values(req.files).forEach((fileArray) => {
          if (Array.isArray(fileArray)) {
            filePaths.push(
              ...fileArray.map((file) => ({ path: file.path, name: file.filename }))
            );
          }
        });
      }
    }

    // Delete files
    if (filePaths.length > 0) {
      let deletedCount = 0;
      filePaths.forEach(({ path: filePath, name }) => {
        try {
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            console.log(`🗑️ Deleted temp file: ${name}`);
            deletedCount++;
          }
        } catch (err) {
          console.error(`⚠️ Failed to delete ${name}:`, err.message);
        }
      });

      if (deletedCount > 0) {
        console.log(`✅ Cleaned up ${deletedCount} temp file(s) after error`);
      }
    }
  } catch (err) {
    console.error("⚠️ Error in cleanupTempFiles:", err.message);
  }
}

export { errorHandler, cleanupTempFiles };
