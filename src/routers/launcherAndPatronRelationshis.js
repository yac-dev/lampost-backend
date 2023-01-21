import express from 'express';
const router = express.Router();
import {
  createLauncherAndPatronRelationship,
  getPatronsByLauncherId,
} from '../controllers/launcherAndPatronRelationshis';

router.route('/').post(createLauncherAndPatronRelationship);
router.route('/:launcherId').get(getPatronsByLauncherId);

export default router;
