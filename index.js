import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import projectRoutes from "./routes/projectRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import DB from "./config/db.js";


dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/projects", projectRoutes);
app.use("/api/auth", authRoutes);


//server
app.get("/", async (req, res) => {
    try {
        const result = await DB.query("SELECT NOW()")
        res.send(`✅ PostgreSQL Connected! Server Time: ${result.rows[0].now}`);
    } catch (error) {
        console.log(error);
        res.status(500).send("❌ Database connection failed");
    }
})

// Start Server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
