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
exports.restaurantRouter = void 0;
const express_1 = __importDefault(require("express"));
const db_1 = require("../db");
exports.restaurantRouter = express_1.default.Router();
exports.restaurantRouter.post('/create', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const restaurant = new db_1.Restaurant(req.body);
    try {
        yield restaurant.save();
        res.status(200).json({ message: restaurant });
    }
    catch (e) {
        res.status(411).json({ error: e.message });
    }
}));
exports.restaurantRouter.post('/by-radius', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { latitude, longitude, radius } = req.body;
    try {
        const restaurants = yield db_1.Restaurant.find({
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude],
                    },
                    $maxDistance: radius,
                }
            }
        }).exec();
        res.status(200).json(restaurants);
    }
    catch (e) {
        res.status(403).json({ error: e });
    }
}));
exports.restaurantRouter.post('/around-range', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { latitude, longitude, maxDistance, minDistance } = req.body;
    try {
        const restaurants = yield db_1.Restaurant.find({
            location: {
                $geoWithin: {
                    $centerSphere: [
                        [longitude, latitude],
                        maxDistance / 6378100,
                    ]
                }
            }
        }).find({
            location: {
                $geoWithin: {
                    $centerSphere: [
                        [latitude, longitude],
                        minDistance / 6378100, // radians k liye use hora
                    ]
                }
            }
        }).exec();
        res.status(200).json(restaurants);
    }
    catch (e) {
        res.status(403).json({ message: e });
    }
}));
