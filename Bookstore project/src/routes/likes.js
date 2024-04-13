import express from 'express';

const router = express.Router();

router.use(express.json());

router.post('/likes/:id', (req, res) => {
  res.join('좋아요 추가');
});

router.delete('/likes/:id', (req, res) => {
  res.json('좋아요 삭제');
});

export default router;
