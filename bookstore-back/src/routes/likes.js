import express from 'express';
import likes from '../controllers/likeController.js';

const router = express.Router();

router.use(express.json());

router.post('/:id', likes.addLike);

router.delete('/:id', likes.removeLike);

export default router;
