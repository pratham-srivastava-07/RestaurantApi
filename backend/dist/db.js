"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Restaurant = exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.connect("mongodb://localhost:27017/restaurantApi");
const userSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    }
});
const restaurantSchema = new mongoose_1.default.Schema({
    name: String,
    description: String,
    location: {
        type: { type: String, default: 'Point' },
        coordinates: [Number],
    },
    ratings: [Number],
});
restaurantSchema.index({ location: '2dsphere' });
exports.User = mongoose_1.default.model('User', userSchema);
exports.Restaurant = mongoose_1.default.model('Restaurant', restaurantSchema);
