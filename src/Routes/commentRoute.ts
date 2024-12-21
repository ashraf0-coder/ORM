import { Router } from "express";
import { createNewComment, deleteComment, getAllComment, getSingleComment, updateComment } from "../Controllers/commetnController";

const router = Router();

router.get('/list', getAllComment);
router.get('/detail/:id', getSingleComment);
router.post('/create', createNewComment);
router.delete('/delete/:id', deleteComment);
router.put('/update/:id', updateComment);

export default router