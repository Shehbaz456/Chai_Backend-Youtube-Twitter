# 🎥🐦 YouTube Twitter - SkyFeed 💖

SkyFeed is a robust full-stack application that combines features of YouTube and Twitter into a single platform, enabling users to upload videos, tweet updates, interact through comments, and more.

---

## 📦 Backend Completed 🚀

The backend for SkyFeed has been successfully completed, offering:
- Fully RESTful APIs
- Secure user authentication
- MongoDB database design with Mongoose
- Modular and scalable folder structure
- Error handling with custom `ApiError` and `ApiResponse`
- Token-based authentication with refresh support
- Video, Comment, Like, Tweet, and Playlist support

> Built using Node.js, Express.js, and MongoDB 🛠️

---

## 🧠 Database Design

A well-structured database schema ensures scalability and maintainability.

📌 **View the ER Diagram:**
[SkyFeed Database Schema](https://app.eraser.io/workspace/YtPqZ1VogxGy1jzIDkzj)

![Database ERD](./assets/skyfeed-erd.png) <!-- Add the image to your repo if needed -->

---

## 📁 Folder Structure

```bash
skyfeed/
├── backend/              # Express backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── ...
├── frontend/             # (Coming Soon)
│   └── ...
├── .gitignore
├── README.md
└── Database_Design.txt
```
🔐 Key Features
✅ JWT Authentication (Access + Refresh Token)
🎞 Upload & manage videos
💬 Commenting system with likes
🐦 Tweet and micro-blogging features
📺 Playlist creation and management
📚 User subscriptions and watch history

💻 Tech Stack
Backend: Node.js, Express.js
Database: MongoDB + Mongoose
Auth: JWT + Refresh Tokens
File Uploads: Multer, Cloudinary (if used)
Validation: Joi (if applicable)

📺 Series Inspiration
Special thanks to Chai aur Code for the incredible backend series that inspired and guided this build. 🍾👨‍💻

📜 License
This project is open source and available under the MIT License.
