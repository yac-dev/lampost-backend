import express from 'express';
const router = express.Router();
// import { createRoll, getRolls } from '../controllers/rolls';
import { getLibraries, getLibrary, createLibrary } from '../controllers/libraries';

router.route('/').get(getLibraries).post(createLibrary);
router.route('/:id').get(getLibrary);

export default router;
