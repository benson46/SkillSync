import express from 'express';
import { studentLogin } from './authController.js';
const router = express.Router();

router.post('/student/login', studentLogin);

export default router;