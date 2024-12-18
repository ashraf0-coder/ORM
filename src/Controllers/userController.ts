import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()


interface ICreateUserPayload {
    username : String;
    password : String;
}
export const createUser = async (req : Request, res : Response) => {
    try {
        const { username, password} = req.body as ICreateUserPayload;

        if (!username || !password) {
            res.status(400).json({
            isSuccess: false,
            Message: "Validation error!"
        });

        return;
    }

    const user = await prisma.users.create({
        data: {
            username: username,
            password: password
        }
    });
        res.status(200).json({
            isSucces: true,
            message: "Succesfully fetched all users."
        })
    } catch (error) {
        res.status(500).json({
            isSuccess : false,
            message: "Something went wrong with the servet!"
        })
        
    }
}


