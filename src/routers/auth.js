import express from 'express';
const router = express.Router();
import { signup, login, loadMe, deleteMe } from '../controllers/auth';
import { authorization } from '../middlewares/authorization';

router.post('/signup', signup);
router.post('/login', login);
router.get('/loadMe', authorization, loadMe);
router.route('/:id').delete(deleteMe);

export default router;
