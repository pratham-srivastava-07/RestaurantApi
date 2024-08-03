import express from "express"
import { Restaurant } from "../db";

export const restaurantRouter = express.Router();

restaurantRouter.post('/create', async(req, res) => {
    const restaurant = new Restaurant(req.body);

    try {
        await restaurant.save();
        res.status(200).json({message: restaurant});
    } catch(e: any) {
        res.status(411).json({error: e.message})
    }
})

restaurantRouter.get('/by-radius', async (req, res) => {
    const { latitude, longitude, radius } = req.body;

    try {
        const restaurants = await Restaurant.find({
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
    } catch(e: any) {
        res.status(403).json({error: e})
    }
})

restaurantRouter.get('/around-range', async (req, res) => {
    const {latitude, longitude, maxDistance, minDistance} = req.body;

    try {
        const restaurants = await Restaurant.find({
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
                        minDistance/6378100,   // radians k liye use hora
                    ]
                }
            }
        }).exec();
        res.status(200).json(restaurants);
    } catch(e) {
        res.status(403).json({message: e});
    }
})

