// middleware/auth.js
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

/**
 * Authentication + Role Authorization Middleware
 * @param {Array} roles - allowed roles ["patient", "doctor"]
 */
function authenticateToken(roles = []) {
  return (req, res, next) => {
    try {
      const authHeader = req.headers["authorization"];
      const token = authHeader && authHeader.split(" ")[1];

      if (!token) {
        return res
          .status(401)
          .json({ message: "Access denied. No token provided." });
      }

      jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
          return res
            .status(403)
            .json({ message: "Invalid or expired token." });
        }

        // decoded contains: { id, role, iat, exp }
        if (roles.length && !roles.includes(decoded.role)) {
          return res
            .status(403)
            .json({ message: "Access denied. Insufficient permissions." });
        }

        req.user = decoded;
        next();
      });
    } catch (error) {
      return res.status(500).json({ message: "Authentication error" });
    }
  };
}

module.exports = { authenticateToken };
