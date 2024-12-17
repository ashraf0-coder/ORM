import { Request, Response } from "express";

export const getAllUsers = (req : Request, res : Response) => {
    try {
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

export const createUser = (req : Request, res : Response) => {
    try {
        res.status(200).json({
            isSucces: true,
            message: "Succesfully created new user."
        }) 
    } catch (error) {
        res.status(500).json({
            isSuccess: false,
            message: "Something went wrong with the servet!"
        })
    }
}

