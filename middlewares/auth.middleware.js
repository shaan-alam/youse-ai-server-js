"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = __importDefault(require("../env"));
const verifyUser = (req, res, next) => {
    try {
        const token = req.cookies["token"]; // assuming the cookie name is 'auth-token'
        if (!token) {
            return res
                .status(401)
                .json({ message: "Authentication token is missing" });
        }
        const secret = env_1.default.JWT_SECRET;
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        req.user = decoded;
        next();
    }
    catch (error) {
        console.error("Authentication error:", error);
        return res.status(401).json({ message: "Unauthorized Access" });
    }
};
exports.verifyUser = verifyUser;
//# sourceMappingURL=auth.middleware.js.map