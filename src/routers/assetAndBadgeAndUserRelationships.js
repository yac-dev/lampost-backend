import express from 'express';
const router = express.Router();
import { upvoteBadgeLike, getAssetAndBadgeAndUserRelationship } from '../controllers/assetAndBadgeAndUserRelationships';

router.route('/').post(upvoteBadgeLike);
router.route('/:assetId').get(getAssetAndBadgeAndUserRelationship);

export default router;
