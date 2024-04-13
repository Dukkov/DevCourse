import express from 'express';

const router = express.Router();

router.use(express.json());

router.post('/orders', (req, res) => {
  res.join('주문하기');
});

router.get('/orders', (req, res) => {
  res.json('주문 목록 조회');
});

router.get('/orders/:id', (req, res) => {
  res.json('주문 상품 상세 조회');
});

export default router;
