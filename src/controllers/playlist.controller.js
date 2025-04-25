import mongoose, { isValidObjectId } from "mongoose";
import { Playlist } from "../models/playlist.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Video } from "../models/video.model.js";
import { User } from "../models/user.model.js";

const createPlaylist = asyncHandler(async (req, res) => {
    const { name, description } = req.body;
    const userId = req.user._id;
    if (!isValidObjectId(userId)) {
        throw new ApiError(400, "Invalid user ID");
    }

    if (!name?.trim()) {
        throw new ApiError(400, "Playlist name is required");
    }

    const userVideo = await Video.findOne({ owner: userId });

    if (!userVideo) {
        throw new ApiError(
            404,
            "You need at least one video to create a playlist."
        );
    }

    const newPlaylist = await Playlist.create({
        name: name.trim(),
        description: description?.trim(),
        videos: [userVideo._id],
        owner: userId,
    });

    res.status(201).json(
        new ApiResponse(201, newPlaylist, "Playlist created successfully")
    );
});

const getUserPlaylists = asyncHandler(async (req, res) => {
    const { userId } = req.params;
    if (!isValidObjectId(userId)) {
        throw new ApiError(400, "Invalid user ID");
    }
    const userPlaylists = await Playlist.find({ owner: userId })
        .populate("videos") // Populate video details
        .sort({ createdAt: -1 }); // Latest first

    console.log(userPlaylists);
        
    if (!userPlaylists || userPlaylists.length === 0) {
        throw new ApiError(404, "No playlists found for this user");
    }

    res.status(200).json(
        new ApiResponse( 200, userPlaylists, "User playlists retrieved successfully")
    );
});

const getPlaylistById = asyncHandler(async (req, res) => {
    const { playlistId } = req.params;
    
    if (!isValidObjectId(playlistId)) {
        throw new ApiError(400, "Invalid playlist ID");
    }

    const playlist = await Playlist.findById(playlistId)
        .populate("videos") // includes full video details
        // .populate("owner", "username email"); 

    if (!playlist) {
        throw new ApiError(404, "Playlist not found");
    }

    res.status(200).json(
        new ApiResponse(200, playlist, "Playlist retrieved successfully")
    );
});

const addVideoToPlaylist = asyncHandler(async (req, res) => {
    const { playlistId, videoId } = req.params;
});

const removeVideoFromPlaylist = asyncHandler(async (req, res) => {
    const { playlistId, videoId } = req.params;
    // TODO: remove video from playlist
});

const deletePlaylist = asyncHandler(async (req, res) => {
    const { playlistId } = req.params;
    // TODO: delete playlist
});

const updatePlaylist = asyncHandler(async (req, res) => {
    const { playlistId } = req.params;
    const { name, description } = req.body;
    //TODO: update playlist
});

export {
    createPlaylist,
    getUserPlaylists,
    getPlaylistById,
    addVideoToPlaylist,
    removeVideoFromPlaylist,
    deletePlaylist,
    updatePlaylist,
};
