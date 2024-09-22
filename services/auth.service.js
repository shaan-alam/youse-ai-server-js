"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUserLogin = exports.createUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_model_1 = __importDefault(require("../models/user.model"));
const token_service_1 = require("./token.service");
const createUser = (_a) => __awaiter(void 0, [_a], void 0, function* ({ name, email, password, }) {
    const user = yield new user_model_1.default({ name, email, password });
    const newuser = yield user.save();
    const token = yield (0, token_service_1.generateToken)({ userId: `${newuser._id}` });
    return { user: newuser, token };
});
exports.createUser = createUser;
const validateUserLogin = (_a) => __awaiter(void 0, [_a], void 0, function* ({ email, password, }) {
    const user = yield user_model_1.default.findOne({ email });
    if (!user) {
        return {
            user: null,
            token: null,
            error: "User doesn't exists",
            status_code: 404,
        };
    }
    const isPasswordMatched = yield bcryptjs_1.default.compare(password, user.password);
    if (!isPasswordMatched) {
        return {
            user: null,
            token: null,
            error: "Invalid Credentials",
            status_code: 400,
        };
    }
    const token = yield (0, token_service_1.generateToken)({ userId: `${user._id}` });
    return { user, token, error: null, status_code: 200 };
});
exports.validateUserLogin = validateUserLogin;
//# sourceMappingURL=auth.service.js.map