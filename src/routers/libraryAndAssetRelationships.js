import express from 'express';
const router = express.Router();
import { getAssetsByLibraryId, postAssetsByLibraryId } from '../controllers/libraryAndAssetRelationships';

router.route('/:libraryId').get(getAssetsByLibraryId).post(postAssetsByLibraryId);

export default router;
