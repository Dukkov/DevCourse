import express from 'express';
import user from '../controllers/userController.js';

const router = express.Router();

router.use(express.json());

router.post('/join', user.join);
router.post('/login', user.login);
router.post('/reset', user.passwordResetRequest);
router.put('/reset', user.passwordReset);

export default router;
