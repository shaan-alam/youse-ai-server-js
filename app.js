"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("./config/db"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_1 = __importDefault(require("express"));
const env_1 = __importDefault(require("./env"));
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const task_route_1 = __importDefault(require("./routes/task.route"));
const app = (0, express_1.default)();
const PORT = env_1.default.PORT || 5000;
app.use((0, cors_1.default)({ origin: "https://youseai-frontend.vercel.app/", credentials: true }));
app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "https://youseai-frontend.vercel.app/");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    next();
});
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use("/auth", auth_route_1.default);
app.use("/task", task_route_1.default);
app.listen(PORT, () => {
    console.log(`Connected to server on PORT ${PORT}`);
    (0, db_1.default)();
});
//# sourceMappingURL=app.js.map