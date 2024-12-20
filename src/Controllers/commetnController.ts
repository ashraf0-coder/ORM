import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { defaultErrorMessage } from "../constants";


interface ICreateComment {
    content : string;
    user_id : number;
    post_id : number;
}

        // CREATE A COMMENT

export const CreateComment = async (req : Request, res : Response) => {
    try {
        const { content, user_id, post_id } = req.body as ICreateComment;
        if(!content || !user_id || !post_id){
            res.status(400).json({
                isSuccess: false,
                message: "Validation error!"
            });
            return;
        };

        const user = await prisma.users.findFirst({})
    } catch (error) {
        
    }
}

