import express from "express";
import applyJWT from "../middleware/authMiddleware.js";
import { accessDB } from "../db/connect.js";

const router = express.Router();

router.post("/", applyJWT, async (req, res) => {
    try {
        const { title, content } = req.body;

        if (!title || !content) {
            return res.status(400).json({ error: "Title and content are required" });
        }

        const db = accessDB();
        if (!db) {
            return res.status(500).json({ error: "Database connection is not initialized" });
        }

        const newPost = {
            title,
            content,
            author: req.user.username,
            userId: req.user.userId,
            createdAt: new Date()
        };

        const result = await db.collection("posts").insertOne(newPost);

        return res.status(201).json({
            message: "Post created successfully",
            post: newPost
        });
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
});

router.get("/", async (req, res) => {
    try {
        const db = accessDB();
        if (!db) {
            return res.status(500).json({ error: "Database connection is not initialized" });
        }

        const posts = await db.collection("posts").find().toArray();
        return res.status(200).json(posts);
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
});

export default router;