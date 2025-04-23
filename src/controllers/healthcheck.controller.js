import os from "os";
import mongoose from "mongoose";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const healthcheck = asyncHandler(async (req, res) => {
    const dbStatus = mongoose.connection.readyState === 1 ? "Connected" : "Disconnected";

    const healthInfo = {
        status: "OK",
        message: "Server is running smoothly 🚀",
        uptime: `${Math.floor(process.uptime())}s`,
        database: {
            status: dbStatus,
            host: mongoose.connection.host,
            name: mongoose.connection.name,
        },
        server: {
            platform: os.platform(),
            arch: os.arch(),
            hostname: os.hostname(),
            memory: {
                free: `${(os.freemem() / 1024 / 1024).toFixed(2)} MB`,
                total: `${(os.totalmem() / 1024 / 1024).toFixed(2)} MB`,
            }
        }
    };

    res.status(200).json(new ApiResponse(200, healthInfo, "Health check passed"));
});

export { healthcheck };
