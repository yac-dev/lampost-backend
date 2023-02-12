import express from 'express';
const router = express.Router();
import { reportMeetup, reportMeetupMember, reportUser, reportAsset, reportLibrary } from '../controllers/reports';

router.route('/meetupanduser').post(reportMeetup);
router.route('/meetupmember').post(reportMeetupMember);
router.route('/user').post(reportUser);
router.route('/asset').post(reportAsset);
router.route('/library').post(reportLibrary);

export default router;
