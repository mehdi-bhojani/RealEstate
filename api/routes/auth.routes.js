import express from 'express';
import { google, signin, sigunp } from '../controllers/auth.controller.js';


const router = express.Router();

router.post('/signup',sigunp);
router.post('/signin',signin);
router.post('/google',google);

export default router;