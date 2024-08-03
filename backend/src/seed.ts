import mongoose from 'mongoose';

import dotenv from 'dotenv';
import { Restaurant } from './db';

dotenv.config();

const MONGODB_URI = 'mongodb://localhost:27017/restaurantApi';

mongoose.connect(MONGODB_URI,)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

const restaurants = [
  {
    name: 'Gourmet Bistro',
    description: 'An upscale dining experience with a variety of gourmet dishes.',
    location: {
      type: 'Point',
      coordinates: [78.349821, 17.352108] // [longitude, latitude]
    },
    ratings: [5, 4, 5, 4, 5]
  },
  {
    name: 'Cafe Delight',
    description: 'A cozy place to enjoy coffee and pastries.',
    location: {
      type: 'Point',
      coordinates: [78.341234, 17.344321] // [longitude, latitude]
    },
    ratings: [4, 4, 3, 5, 4]
  },
  {
    name: 'Pasta Palace',
    description: 'Delicious pasta and Italian cuisine.',
    location: {
      type: 'Point',
      coordinates: [78.350012, 17.350112] // [longitude, latitude]
    },
    ratings: [5, 5, 4, 4, 5]
  }
];

Restaurant.insertMany(restaurants)
  .then(() => {
    console.log('Data inserted');
    mongoose.connection.close();
  })
  .catch(err => {
    console.error(err);
    mongoose.connection.close();
  });
