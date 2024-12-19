import { Router } from "express";
import { createUser, deleteUser, getAllUsers, getOneUser, updateUser } from "../Controllers/userController";
const router = Router();

router.post('/create', createUser);
router.get('/list', getAllUsers);
router.get('/details/:userId', getOneUser);
router.delete('/delete/:userId', deleteUser);
router.put('/update', updateUser);


export default router;
