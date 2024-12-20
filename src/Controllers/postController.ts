import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { defaultErrorMessage } from "../constants";

interface ICreatepost {
    title : string;
    content : string;
    user_id : number;
}

        // CREATE A POST

export const createPost = async ( req : Request, res : Response) => {
    try {
        const { title, content, user_id } = req.body;

        if(!title || !content || !user_id) {
            res.status(400).json({
                isuccess: false,
                message: "Validation error!"
            });
            return;
        }

        const user = await prisma.users.findFirst({
            where : {
                id : user_id
            }
        })
        if(!user) {
            res.status(404).json({
                isSuccess: false,
                message: "User not found!"
            });
            return;
        };

        const newPost = await prisma.post.create({
            data: {
                title,
                content,
                user_id
            }
        })

        res.status(201).json({
            isSuccess: true,
            post: newPost
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            isSuccess: false,
            message: defaultErrorMessage
        })
    }
}


        // GET ALL POSTS
        
export const getAllPosts = async (req : Request, res : Response) => {
    const posts = await prisma.post.findMany({
        include : {
            user: true
        }
    });
    res.status(200).json({
        isSuccess: true,
        posts
    });
};