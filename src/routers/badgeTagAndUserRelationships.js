import express from 'express';
const router = express.Router();
import { createBadgeTagAndUserRelationship } from '../controllers/badgeTagAndUserRelationships';

// router.route('/').post(addNewBadgeTagToUser);
router.route('/').post(createBadgeTagAndUserRelationship);

export default router;
