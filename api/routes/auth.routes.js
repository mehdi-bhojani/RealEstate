import express from 'express';
import { signin, sigunp } from '../controllers/auth.controller.js';


const router = express.Router();

router.post('/signup',sigunp);
router.post('/signin',signin);

export default router;