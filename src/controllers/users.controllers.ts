import { Request, Response } from "express"
import { createUserService } from "../services/users/createUsers.service"

export const createUserController = async (req: Request, res: Response): Promise<Response> => {
    const newUser = await createUserService(req.body)
    return res.status(201).json(newUser)
} 
