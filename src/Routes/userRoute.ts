import { Router } from "express";
import { createUser } from "../Controllers/userController";
const router = Router();

router.post('/create', createUser);


export default router;
