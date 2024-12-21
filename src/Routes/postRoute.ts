import { Router } from "express";
import { createPost, deletePost, getAllPosts, getSinglePost, updatePost } from "../Controllers/postController";
const router = Router();

router.post('/create', createPost);
router.get('/list', getAllPosts);
router.get('/detail/:id', getSinglePost);
router.delete('/delete/:id', deletePost);
router.put('/update', updatePost);

export default router