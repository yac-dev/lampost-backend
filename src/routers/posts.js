import express from 'express';
const router = express.Router();
import { createPost, getPosts } from '../controllers/posts';
import { authorization } from '../middlewares/authorization';

router.route('/').post(createPost).get(getPosts);
// router.post('/login', login);
// router.get('/loadMe', authorization, loadMe);

export default router;
