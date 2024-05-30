import express from 'express';
import books from '../controllers/bookController.js';

const router = express.Router();

router.use(express.json());

router.get('/', books.allBooks);
router.get('/:id', books.bookDetail);

export default router;
