"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controllers/auth.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = express_1.default.Router();
router.post("/register", auth_controller_1.register);
router.post("/login", auth_controller_1.login);
router.post("/whoami", auth_middleware_1.verifyUser, auth_controller_1.getCurrentProfile);
router.post("/logout", auth_middleware_1.verifyUser, auth_controller_1.logout);
exports.default = router;
//# sourceMappingURL=auth.route.js.map