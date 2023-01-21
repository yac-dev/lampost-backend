import express from 'express';
const router = express.Router();
import { createQuestion, createReply } from '../controllers/comments';

router.route('/').post(createQuestion);
router.route('/:id/reply').post(createReply);

export default router;
