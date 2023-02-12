import express from 'express';
const router = express.Router();
import { blockUser, unblockUser } from '../controllers/userBlockingRelationships';

router.route('/block').post(blockUser);
router.route('/unblock').post(unblockUser);

export default router;
