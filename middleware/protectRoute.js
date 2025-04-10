import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
    const authHeader = req.header("Authorization");
    console.log("🔍 Auth Header:", authHeader);

    if (!authHeader) {
        console.log("❌ No Authorization header found");
        return res.status(401).json({ message: "Access Denied: No token provided" });
    }

    const token = authHeader.split(" ")[1];
    console.log("🔍 Token received:", token);

    if (!token) {
        console.log("❌ No token found in Authorization header");
        return res.status(401).json({ message: "Access Denied: No token" });
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        console.log("✅ Token verified:", verified); 
        req.user = verified;
        next();
    } catch (err) {
        console.error("❌ Token verification failed:", err.message);
        res.status(400).json({ message: "Invalid Token" });
    }
};
export default authMiddleware;