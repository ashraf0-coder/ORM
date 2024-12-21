import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { defaultErrorMessage } from "../constants";

interface ICreatepost {
    title : string;
    content : string;
    user_id : number;
}

interface IUpdatePost {
    post_id : string;
    content : string;
    title : string;
}

        // create a post

export const createPost = async ( req : Request, res : Response) => {
    try {
        const { title, content, user_id } = req.body as ICreatepost;

        if(!title || !content || !user_id) {
            res.status(400).json({
                isSuccess: false,
                message: "Validation error!"
            });
            return;
        }

        const user = await prisma.users.findFirst({
            where : {
                id : user_id
            },

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


        // get all posts
        
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


        //get single post

 export const getSinglePost = async (req: Request, res: Response) => {
    try {
        const postId = req.params.id
        const post = await prisma.post.findFirst({
            where : {
                id: postId
            },
            include: {
                comment: true
            }
        })
        if(!post) {
            res.status(404).json({
                isSuccess: false,
                message: "Post is not found!"
            })
            return
        }

        res.status(200).json({
            isSuccess: true,
            post
        })
    } catch (error) {
        console.log("error: " +error)
        res.status(500).json({
            isSuccess: false,
            message: "Server error!"
        })
        return
    }
    return
 }

 export const deletePost = async (req : Request, res : Response) => {
    try {
        const postId = req.params.id
        const post = await prisma.post.findFirst({
            where: {
                id: postId
            }
        })

        if(!post) {
            res.status(404).json({
                isSuccess: false,
                message: "The post is not found!"
            })
            return
        }

        const deletePost = await prisma.post.delete({
            where: {
                id: post.id
            }
        })

        res.status(200).json({
            isSuccess: true,
            post: deletePost
        })
        return

    } catch (error) {
        console.log("error: " + error)
        res.status(500).json({
            isSuccess : false,
            message: "Server error!"
        })
        return
    }
 }

        // update a post

 export const updatePost = async (req: Request, res: Response) => {
    try {
        const { title, content, post_id } = req.body as IUpdatePost

        const post = await prisma.post.findFirst({
            where: {
                id: post_id
            }
        })

        if (!post) {
            res.status(404).json({
                isSuccess: false,
                message: "Post is not found!"
            })

            return
        }

        const updatePost = await prisma.post.update({
            where: {
                id: post.id
            },
            data: {
                title,
                content,
            }
        })

        res.status(200).json({
            isSuccess: true,
            post: updatePost
        })
    } catch (error) {
        console.log("Error: " + error)
        res.status(500).json({
            isSuccess: false,
            message: "Server error!"
        })
    }

    return
}

