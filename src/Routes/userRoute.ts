import { Router } from "express";
import { createUser, getAllUsers } from "../Controllers/userController";
const router = Router();

router.post('/create', createUser);
router.get('/list', getAllUsers);


export default router;
