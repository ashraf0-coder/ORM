import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { defaultErrorMessage } from "../constants";
const prisma = new PrismaClient()


interface ICreateUserPayload {
    username : string;
    password : string;
    phone_number: string;
}
export const createUser = async (req : Request, res : Response) => {
    try {
        const { username, password, phone_number} = req.body as ICreateUserPayload;

        if (!username || !password || !phone_number) {
            res.status(400).json({
            isSuccess: false,
            Message: "Validation error!"
        });

        return;
    }

    const user = await prisma.users.create({
        data: {
            username: username,
            password: password,
            phone_number : phone_number
        }
    });
        res.status(200).json({
            isSucces: true,
            message: "Succesfully created new user."
        })
    } catch (error) {
        res.status(500).json({
            isSuccess : false,
            message: "Something went wrong with the servet!",
            error: JSON.stringify(error)
        })
        
    }
};

export const getAllUsers = async (req : Request, res : Response) => {
    try {
        const users = await prisma.users.findMany();
        res.status(200).json({
            isSuccess: true,
            users
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            isSucces : false,
            message: defaultErrorMessage
        });
    }
};


