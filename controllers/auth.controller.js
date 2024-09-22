"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.logout = exports.getCurrentProfile = exports.login = exports.register = void 0;
const express_validator_1 = require("express-validator");
const authServices = __importStar(require("../services/auth.service"));
const user_model_1 = __importDefault(require("../models/user.model"));
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;
    try {
        const existingUser = yield user_model_1.default.findOne({ email }).select("-password");
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const { user, token } = yield authServices.createUser({
            name,
            email,
            password,
        });
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: true,
        });
        res.json({ user, token });
    }
    catch (err) {
        res.status(500).json({ message: "Something went wrong", err });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
        const { error, status_code, token, user } = yield authServices.validateUserLogin({ email, password });
        if (error) {
            return res.status(status_code).json({ message: error });
        }
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: true,
        });
        res.json({ user, token });
    }
    catch (err) {
        res.status(500).json({ message: "Something went wrong", err });
    }
});
exports.login = login;
const getCurrentProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.userId;
        const user = yield user_model_1.default.find({ _id: userId }).select("-password");
        return res.json({ user: user[0] });
    }
    catch (err) {
        res.status(500).json({ message: "Something went wrong!", err });
    }
});
exports.getCurrentProfile = getCurrentProfile;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.clearCookie("token");
        return res.json({ message: "Logged out!" });
    }
    catch (err) {
        return res.status(500).json({ message: "Something went wrong!", err });
    }
});
exports.logout = logout;
//# sourceMappingURL=auth.controller.js.map