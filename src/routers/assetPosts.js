import express from 'express';
const router = express.Router();
import { createAssetPost, getAssetPosts, getAssetPostById } from '../controllers/assetPosts';

router.route('/').post(createAssetPost);
router.route('/:libraryId').get(getAssetPosts);
router.route('/:id/one').get(getAssetPostById);

export default router;
