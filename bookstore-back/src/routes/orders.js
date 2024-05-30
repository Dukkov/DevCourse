import express from 'express';
import orders from '../controllers/orderController.js';

const router = express.Router();

router.use(express.json());

router.post('/', orders.order);
router.get('/', orders.getOrders);
router.get('/:id', orders.getOrderDetail);

export default router;
