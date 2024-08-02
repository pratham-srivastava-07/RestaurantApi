import express from "express"
import zod from "zod"
import { JWT_SECRET } from "../config";
import jwt from "jsonwebtoken"
import { User } from "../db";
export const userRouter = express.Router();

const signupValidation = zod.object({
    username: zod.string().email(),
	firstName: zod.string(),
	lastName: zod.string(),
	password: zod.string()
})

userRouter.post("/signup", async (req, res)=> {
    const parsedData = signupValidation.safeParse(req.body)

    if(!parsedData.success) {
      return  res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }
    const existingUser = await User.findOne({
        username: req.body.username
    })
    if(existingUser) {
        res.status(411).json({message: "Email already exists"})
    }
    const newUser = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName
    })
    const userId = newUser._id;


    const token = jwt.sign({
        userId: userId
    }, JWT_SECRET)

    res.status(200).json({
        message: "user signed up sucessfully",
        token: token
    })
})

const signinBody = zod.object({
    username: zod.string().email(),
    password: zod.string()
})

userRouter.post("/signin", async(req, res)=> {
    const parsedData = signinBody.safeParse(req.body)
    if(!parsedData.success) {
        res.status(411).json({
            message: "incorrect inpuuts"
        })
    }
    const existingUser = await User.findOne({
        username: req.body.username
    })

    if(existingUser) {
        const token = jwt.sign({
            userId: existingUser._id
        }, JWT_SECRET)
        res.status(200).json({token:  token})
        return;
    }
  res.status(411).json({
    message: "Error while logging in"
  })
  
})
