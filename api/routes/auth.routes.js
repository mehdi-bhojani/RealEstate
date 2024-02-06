import express from 'express';
import { google, signOut, signin, sigunp } from '../controllers/auth.controller.js';


const router = express.Router();

router.post('/signup',sigunp);
router.post('/signin',signin);
router.post('/google',google);
router.get('/signout',signOut);

export default router;