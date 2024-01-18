import express from 'express';
import { sigunp } from '../controllers/auth.controller.js';


const router = express.Router();

router.post('/signup',sigunp);

export default router;