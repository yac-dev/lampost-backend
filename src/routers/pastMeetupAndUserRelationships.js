import express from 'express';
const router = express.Router();
import {
  getPastMeetupsByUserId,
  getLaunchedMeetupsByLauncherId,
  getPastMeetupDetailByMeetupId,
  createImpression,
} from '../controllers/pastMeetupAndUserRelationships';

router.route('/:id').get(getPastMeetupDetailByMeetupId).post(createImpression);
router.route('/pastmeetups/:userId').get(getPastMeetupsByUserId);
router.route('/launchedmeetups/:launcherId').get(getLaunchedMeetupsByLauncherId);

export default router;
