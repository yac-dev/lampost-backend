import express from 'express';
const router = express.Router();
import { getBadges, getBadgesByRolls, getBadgeRolls } from '../controllers/badges';

router.route('/').post(getBadges);
router.route('/rolls').get(getBadgesByRolls);

router.route('/:id/rolls').get(getBadgeRolls);

export default router;
