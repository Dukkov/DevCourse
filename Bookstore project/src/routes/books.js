import express from 'express';

const router = express.Router();

router.use(express.json());

router.get('/books', (req, res) => {
  res.join('전체 도서 조회');
});

router.get('/books/:id', (req, res) => {
  res.json('개별 도서 조회');
});

router.get('/books', (req, res) => {
  res.json('카테고리별 도서 목록 조회');
});

export default router;
