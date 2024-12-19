import { Router } from "express";
import { createPost, getAllPosts } from "../Controllers/postController";
const router = Router();

router.post('/create', createPost);
router.get('/list', getAllPosts);

export default router