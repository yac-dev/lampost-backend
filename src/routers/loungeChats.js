import express from 'express';
const router = express.Router();
import { getMyLoungeChats, getSelectedMeetupLoungeChats } from '../controllers/loungeChats';

router.route('/').post(getMyLoungeChats);
router.route('/:meetupId').get(getSelectedMeetupLoungeChats);

export default router;
