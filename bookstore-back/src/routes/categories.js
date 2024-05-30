import express from 'express';
import categories from '../controllers/categoryController.js';

const router = express.Router();

router.use(express.json());

router.get('/', categories.allCategory);

export default router;
