import jwt from "jsonwebtoken";

function applyJWT(req, res, next) {
    const headerRegister = req.headers.authorization;
    if (headerRegister && headerRegister.startsWith("Bearer ")) {
        const token = headerRegister.split(" ")[1];

        if (!token) {
            return res.status(401).json({ error: "Access denied. Invalid or misssing token." });
        }
        jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
            if (error) {
                return res.status(403).json({ message: "Forbidden: Invalid or expired token" });
            }
            req.user = user;
            next();
        });
    } else {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }
}

export default applyJWT; 