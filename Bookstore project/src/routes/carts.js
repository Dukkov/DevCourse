import express from 'express';
import carts from '../controllers/cartController.js';

const router = express.Router();

router.use(express.json());

router.post('/', carts.addToCart);
router.get('/', carts.getCartItems);
router.delete('/:id', carts.removeCartItems);

export default router;
