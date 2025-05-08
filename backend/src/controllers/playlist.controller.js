import { isValidObjectId } from "mongoose";
import { Playlist } from "../models/playlist.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Video } from "../models/video.model.js";

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
        new ApiResponse(
            200,
            userPlaylists,
            "User playlists retrieved successfully"
        )
    );
});

const getPlaylistById = asyncHandler(async (req, res) => {
    const { playlistId } = req.params;

    if (!isValidObjectId(playlistId)) {
        throw new ApiError(400, "Invalid playlist ID");
    }

    const playlist = await Playlist.findById(playlistId).populate("videos"); // includes full video details
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
    const userId = req.user._id;

    // Validate ObjectIds
    if (
        !isValidObjectId(userId) ||
        !isValidObjectId(playlistId) ||
        !isValidObjectId(videoId)
    ) {
        throw new ApiError(400, "Invalid user ID, playlist ID, or video ID");
    }

    const playlist = await Playlist.findById(playlistId);
    if (!playlist) throw new ApiError(404, "Playlist not found");

    if (playlist.owner.toString() !== userId.toString()) {
        throw new ApiError(
            403,
            "You are not authorized to modify this playlist"
        );
    }

    // Check if the video exists
    const video = await Video.findById(videoId);
    if (!video) {
        throw new ApiError(404, "Video not found");
    }
    // Prevent duplicate videos in playlist
    if (playlist.videos.includes(videoId)) {
        throw new ApiError(409, "Video already exists in the playlist");
    }

    playlist.videos.push(videoId);
    await playlist.save();

    res.status(200).json(
        new ApiResponse(200, playlist, "Video added to playlist successfully")
    );
});

const removeVideoFromPlaylist = asyncHandler(async (req, res) => {
    const { playlistId, videoId } = req.params;
    const userId = req.user._id;

    // Validate ObjectIds
    if (
        !isValidObjectId(userId) ||
        !isValidObjectId(playlistId) ||
        !isValidObjectId(videoId)
    ) {
        throw new ApiError(400, "Invalid user ID, playlist ID, or video ID");
    }

    const playlist = await Playlist.findById(playlistId);
    if (!playlist) throw new ApiError(404, "Playlist not found");

    // Check ownership
    if (playlist.owner.toString() !== userId.toString()) {
        throw new ApiError(
            403,
            "You are not authorized to modify this playlist"
        );
    }

    // Check if the video exists
    const video = await Video.findById(videoId);
    if (!video) {
        throw new ApiError(404, "Video not found");
    }

    // Check if the video exists in the playlist
    const videoIndex = playlist.videos.indexOf(videoId);
    if (videoIndex === -1) {
        throw new ApiError(404, "Video not found in the playlist");
    }

    // Remove the video from the playlist
    playlist.videos.splice(videoIndex, 1);
    await playlist.save();

    res.status(200).json(
        new ApiResponse(
            200,
            playlist,
            "Video reomved from playlist successfully"
        )
    );
});

const deletePlaylist = asyncHandler(async (req, res) => {
    const { playlistId } = req.params;
    const userId = req.user._id;

    if (!isValidObjectId(playlistId)) {
        throw new ApiError(400, "Invalid playlist ID");
    }

    const playlist = await Playlist.findById(playlistId);

    if (!playlist) {
        throw new ApiError(404, "Playlist not found");
    }

    // Check ownership
    if (playlist.owner.toString() !== userId.toString()) {
        throw new ApiError(
            403,
            "You are not authorized to delete this playlist"
        );
    }

    await playlist.deleteOne();

    res.status(200).json(
        new ApiResponse(200, null, "Playlist deleted successfully")
    );
});

const updatePlaylist = asyncHandler(async (req, res) => {
    const { playlistId } = req.params;
    const { name, description } = req.body;
    const userId = req.user._id;
    if (!isValidObjectId(playlistId) || !isValidObjectId(userId)) {
        throw new ApiError(400, "Invalid user ID or playlist ID");
    }

    const playlist = await Playlist.findById(playlistId);
    if (!playlist) throw new ApiError(404, "Playlist not found");

    // Check ownership
    if (playlist.owner.toString() !== userId.toString()) {
        throw new ApiError(403,"You are not authorized to update this playlist");
    }

    if (!name || !name.trim()) {
        throw new ApiError(400, "Playlist name is required");
    }
    // Clean and prepare data
    const updatedData = {
        name: name.trim(),
        description: description?.trim() || playlist.description,
    };

    const updatedPlaylist = await Playlist.findByIdAndUpdate(
        playlistId,
        { $set: updatedData },
        { new: true }
    );

    res.status(200).json(
        new ApiResponse(200, updatedPlaylist, "Playlist updated successfully")
    );
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
