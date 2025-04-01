import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "../config/db.js";
import dotenv from "dotenv";

dotenv.config();


// Admin Signup


const register = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // 1️⃣ Check if user already exists
        const existingUser = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        if (existingUser.rows.length > 0) {
            return res.status(400).json({ message: "User already exists" });
        }

        // 2️⃣ Hash password before saving
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 3️⃣ Save new user to the database
        const newUser = await pool.query(
            "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
            [name, email, hashedPassword]
        );

        // 4️⃣ Generate JWT Token after successful registration
        const token = jwt.sign(
            { id: newUser.rows[0].id, email: newUser.rows[0].email },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        // 5️⃣ Send response with token
        res.status(201).json({ message: "User registered successfully", token });

    } catch (error) {
        console.error("Registration Error:", error);
        res.status(500).json({ message: "Error registering user", error });
    }
};


// Admin Login
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

        if (user.rows.length === 0) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, user.rows[0].password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // Debugging: Ensure JWT_SECRET is loaded
        if (!process.env.JWT_SECRET) {
            console.error("❌ JWT_SECRET is missing! Check your .env file.");
            return res.status(500).json({ message: "Server error: JWT secret missing" });
        }

        const token = jwt.sign(
            { id: user.rows[0].id, email },
            process.env.JWT_SECRET,
            
        );

        console.log("✅ Generated Token:", token); // Log the token for debugging

        res.json({ message: "Login successful", token, user: user.rows[0] });
    } catch (error) {
        console.error("❌ Login error:", error);
        res.status(500).json({ message: "Error logging in", error });
    }
};


export {login, register}
