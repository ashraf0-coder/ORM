import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { Request, Response } from "express";
import { defaultErrorMessage } from "../constants";

interface ICreatepost {
    title : string;
    content : string;
    user_id : number;
}

export const createPost = async( req : Request, res : Response) => {
    try {
        const { title, content, user_id } = req.body;

        if(!title || !content || !user_id) {
            res.status(400).json({
                isSuccess : false,
                message: "validation error!"
            });
            return;
        }

        const user = await prisma.users.findFirst({
            where: {
                id: user_id
            }
        });

        if(!user){
            res.status(404).json({
                isSuccess: false,
                message: "User not found!"
            });
        };

        const newPost = await prisma.post.create({
            data:{
                title,
                content,
                user_id
            }
        });

        res.status(201).json({
            isSuccess: true,
            post: newPost
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            isSuccess: false,
            message: defaultErrorMessage
        });
    }
};


export const getAllPosts = async (req : Request, res : Response) => {
    const posts = await prisma.post.findMany();
    res.status(200).json({
        isSuccess: true,
        posts
    });
};