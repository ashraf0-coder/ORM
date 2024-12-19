import { Router } from "express";
import { createUser, deleteUser, getAllUsers, getOneUser } from "../Controllers/userController";
const router = Router();

router.post('/create', createUser);
router.get('/list', getAllUsers);
router.get('/details/:userId', getOneUser)
router.delete('/delete/:userId', deleteUser)


export default router;
