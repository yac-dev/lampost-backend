import express from 'express';
const router = express.Router();
import { getAssetsByUserId, getAssetByAssetIdAndUserId } from '../controllers/assetAndUserRelationships';

router.route('/:assetId/:userId').get(getAssetByAssetIdAndUserId);
router.route('/:userId').get(getAssetsByUserId);

export default router;
