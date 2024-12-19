import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { defaultErrorMessage } from "../constants";
const prisma = new PrismaClient();


interface ICreateUserPayload {
    username : string;
    password : string;
    phone_number: string;
}

interface IUpdateUser {
    username : string,
    phone_number : string,
    password: string,
    userId : number
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



export const getOneUser = async (req : Request, res : Response) => {
    try {
        const { userId } = req.params

        const user = await prisma.users.findFirst({
            where: {
                id: +userId
            },
            
            include: {
                post: true
            }
        });

        if(!user) {
            res.status(404).json({
                isSuccess: false,
                message: "User not found!"
            });
            return
        }

        res.status(200).json({
            isSuccess: true,
            user
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            isSucces: false,
            message: defaultErrorMessage
        });
    }
}


export const deleteUser = async (req : Request, res : Response) => {
    try {
        const { userId } = req.params;

        const user = await prisma.users.findFirst({
            where: {
                id: +userId
            }
        });

        if(!user) {
            res.status(404).json({
                isSucces: false,
                message: "User not found!"
            });

            return;
        }

        //delete user

        await prisma.users.delete({
            where: {
                id: user?.id
            }
        })

        res.status(200).json({
            isSuccess: true,
            message: "User deleted successfully"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            isSucces: false,
            message: defaultErrorMessage
        });   
    }
}



export const updateUser = async (req : Request, res : Response) => {
    try {
        const { username, password, phone_number, userId } : IUpdateUser = req.body;
        
        if(!username || !password || !phone_number || !userId) {
            res.status(400).json({
                isSuccess: false,
                message: "Validation error!",
                payload: req.body
            });
            return;
        }

        const user = await prisma.users.findFirst({
            where: {
                id: userId
            }
        });

        if(!user) {
            res.status(404).json({
                isSuccess: false,
                message: "User not found!"
            });
            return;
        }

        const updatingUser = await prisma.users.update({
            where: {
                id: userId
            },
            data: {
                username : username,
                password : password,
                phone_number : phone_number
            }
        });

        res.status(200).json({
            isSuccess: false,
            user: updatingUser
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            isSucces: false,
            message: defaultErrorMessage
        });
    }
}