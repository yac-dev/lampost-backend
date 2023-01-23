import express from 'express';
const router = express.Router();
import {
  createReaction,
  getReactionsByAssetId,
  upvoteReaction,
} from '../controllers/assetAndReactionAndUserRelationships';

router.route('/').post(createReaction);
router.route('/:assetId').get(getReactionsByAssetId);
router.route('/');

export default router;
