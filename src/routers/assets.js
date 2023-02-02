import express from 'express';
const router = express.Router();
import multer from '../middlewares/multer';
import { createPhoto, createVideo, getUserAssets, getAssetById } from '../controllers/assets';
import { authorization } from '../middlewares/authorization';

router.route('/createdby/:userId').get(getUserAssets);
// router.route('/').post(getUserAssets);
router.route('/photos').post(multer.single('asset'), createPhoto);
router.route('/videos').post(createVideo);

router.route('/:id').get(getAssetById);

export default router;
