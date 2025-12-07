import express, { json } from "express";
import jwt from "jsonwebtoken";
import { Middleware } from "./middleware";
import { JWT_SECRET } from "@repo/backend-common/config";
import { CreateRoomSchema, CreateUserSchema, SignInSchema } from "@repo/common/types"


const app = express()

app.post("/signup", function(req,res){

    const data = CreateUserSchema.safeParse(req.body)
    if(!data.success){
        res.json({
            message:"Invalid inputs"
        })

        return;
    }
    
})

app.post("/signin", function(req,res){

    const data = SignInSchema.safeParse(req.body);

    if (!data.success){
        res.json({
            message : " Invalid format"
        })
    
        return;
    }

    const userId = 1 

    jwt.sign({
        userId
    },JWT_SECRET)

})

app.post("/room", Middleware,function(req,res){

    const data = CreateRoomSchema.safeParse(req.body)

    if (!data.success){
        res.json({
            message : " Invalid format"
        })

        return;
    }

    res.json({
        roomId:123,
    })

})