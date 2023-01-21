import express from 'express';
const router = express.Router();
import {
  joinLibrary,
  leaveLibrary,
  getMyJoinedLibrary,
  getUsersByLibraryId,
} from '../controllers/libraryAndUserRelationships';

router.route('/:userId/:libraryId').delete(leaveLibrary);
router.route('/users/:libraryId').get(getUsersByLibraryId);
router.route('/:userId').get(getMyJoinedLibrary);
router.route('/').post(joinLibrary);

export default router;
