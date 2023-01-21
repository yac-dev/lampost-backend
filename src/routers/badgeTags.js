import express from 'express';
const router = express.Router();
import { getBadgeTagsByBadgeId } from '../controllers/badgeTags';

router.route('/:badgeId').get(getBadgeTagsByBadgeId);

export default router;
