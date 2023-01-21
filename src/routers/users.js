import express from 'express';
const router = express.Router();
import multer from '../middlewares/multerForAvatar';
import {
  getUser,
  addBadges,
  getPastMeetups,
  getUserAssets,
  editProfilePhoto,
  updateViewedChatsLastTime,
} from '../controllers/users';

router.route('/:id').get(getUser);
router.route('/:id/assets').get(getUserAssets);
router.route('/:id/addbadges').patch(addBadges);
router.route('/:id/pastmeetups').get(getPastMeetups);
router.route('/:id/profile').patch(multer.single('avatar'), editProfilePhoto);
router.route('/:id/viewedchatslasttime').patch(updateViewedChatsLastTime);

export default router;
