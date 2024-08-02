import express from "express"
import { restaurantRouter } from "./restaurant";
import { userRouter } from "./user";
import authMiddleware from "../middleware";

export const router = express.Router()

router.use('/restaurants', authMiddleware, restaurantRouter);

router.use('/user', userRouter)

