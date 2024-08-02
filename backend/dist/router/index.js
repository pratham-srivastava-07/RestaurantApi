"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const restaurant_1 = require("./restaurant");
const user_1 = require("./user");
const middleware_1 = __importDefault(require("../middleware"));
exports.router = express_1.default.Router();
exports.router.use('/restaurants', middleware_1.default, restaurant_1.restaurantRouter);
exports.router.use('/user', user_1.userRouter);
