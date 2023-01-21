import express from 'express';
const router = express.Router();
import { pushNotificationExperiment } from '../controllers/labs';

router.route('/').post(pushNotificationExperiment);

export default router;
