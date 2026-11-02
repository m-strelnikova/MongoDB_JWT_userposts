import express from "express";
import bcrypt from "bcrypt";
import { accessDB } from "../db/connect.js";

const router = express.Router();

router.post("/register", async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json("Bad Request: email & password are required!")
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const db = accessDB();
        const result = await db.collection("users").insertOne({ email, password: hashedPassword });

        console.log();
        
        res.status(201).json(result);

    } catch (error) {
        res.status(500).send("Registration failed!");
    }

});

router.post("/login", (req, res) => {

});

export default router; 