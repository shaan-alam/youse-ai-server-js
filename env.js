"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const zod_1 = require("zod");
dotenv_1.default.config();
const schema = zod_1.z.object({
    MONGO_URI: zod_1.z.string(),
    PORT: zod_1.z.coerce.number(),
    JWT_SECRET: zod_1.z.string(),
    NODE_ENV: zod_1.z
        .enum(["development", "production", "test"])
        .default("development"),
});
const parsed = schema.safeParse(process.env);
if (!parsed.success) {
    console.error("❌ Invalid environment variables:", JSON.stringify(parsed.error.format(), null, 4));
    process.exit(1);
}
exports.default = parsed.data;
//# sourceMappingURL=env.js.map