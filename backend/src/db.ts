import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/restaurantApi",)
const userSchema = new mongoose.Schema({
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
})

const restaurantSchema = new mongoose.Schema({
    name: String,
    description: String,
    location: {
      type: { type: String, default: 'Point' },
      coordinates: [Number],
    },
    ratings: [Number],
  });

restaurantSchema.index({ location: '2dsphere' });

export const User = mongoose.model('User', userSchema);
export const Restaurant = mongoose.model('Restaurant', restaurantSchema);
