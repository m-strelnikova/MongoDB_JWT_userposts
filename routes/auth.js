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

router.post("/login", (req, res) => {

});

export default router; 