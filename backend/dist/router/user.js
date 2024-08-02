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
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const zod_1 = __importDefault(require("zod"));
const config_1 = require("../config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("../db");
exports.userRouter = express_1.default.Router();
const signupValidation = zod_1.default.object({
    username: zod_1.default.string().email(),
    firstName: zod_1.default.string(),
    lastName: zod_1.default.string(),
    password: zod_1.default.string()
});
exports.userRouter.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parsedData = signupValidation.safeParse(req.body);
    if (!parsedData.success) {
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        });
    }
    const existingUser = yield db_1.User.findOne({
        username: req.body.username
    });
    if (existingUser) {
        res.status(411).json({ message: "Email already exists" });
    }
    const newUser = yield db_1.User.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName
    });
    const userId = newUser._id;
    const token = jsonwebtoken_1.default.sign({
        userId: userId
    }, config_1.JWT_SECRET);
    res.status(200).json({
        message: "user signed up sucessfully",
        token: token
    });
}));
const signinBody = zod_1.default.object({
    username: zod_1.default.string().email(),
    password: zod_1.default.string()
});
exports.userRouter.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parsedData = signinBody.safeParse(req.body);
    if (!parsedData.success) {
        res.status(411).json({
            message: "incorrect inpuuts"
        });
    }
    const existingUser = yield db_1.User.findOne({
        username: req.body.username
    });
    if (existingUser) {
        const token = jsonwebtoken_1.default.sign({
            userId: existingUser._id
        }, config_1.JWT_SECRET);
        res.status(200).json({ token: token });
        return;
    }
    res.status(411).json({
        message: "Error while logging in"
    });
}));
