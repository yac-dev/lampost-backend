import express from 'express';
const router = express.Router();
import { getMyLoungeStatus, getSelectedMeetupLoungeChats } from '../controllers/loungeChats';

router.route('/').post(getMyLoungeStatus);
router.route('/:meetupId').get(getSelectedMeetupLoungeChats);

export default router;
