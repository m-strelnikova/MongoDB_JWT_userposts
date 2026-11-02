import express from "express";
import bcrypt from "bcrypt";
import { accessDB } from "../db/connect.js";

const router = express.Router();

router.post("/register", async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: "Username and password are required!" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const db = accessDB();
        if (!db) {
            return res.status(500).json({ error: "Database connection is not initialized" });
        }

        const result = await db.collection("users").insertOne({
            username,
            password: hashedPassword
        });

        return res.status(201).json(result);

    } catch (error) {
        return res.status(500).json({ error: "Registration failed!" });
    }
});

router.post("/login", async (req, res) => {

    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: "Username and password are required!" });
        }

        const db = accessDB();
        if (!db) {
            return res.status(500).json({ error: "Database connection is not initialized" });
        }

        const user = await db.collection("users").findOne({ username: username });

        if (!user) {
            return res.status(404).json({ message: "Invalid login data or user doesn't exist." })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid username or password." });
        }
        const token = jwt.sign(
            { userId: user._id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        return res.status(200).json({
            message: "Login successful",
            token
        });
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ error: "Internal server error during login." });
    }
});

export default router; 