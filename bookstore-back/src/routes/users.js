import express from 'express';
import users from '../controllers/userController.js';

const router = express.Router();

router.use(express.json());

router.post('/join', users.join);
router.post('/login', users.login);
router.post('/reset', users.passwordResetRequest);
router.put('/reset', users.passwordReset);

export default router;
