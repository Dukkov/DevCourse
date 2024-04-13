import express from 'express';
import dotenv from 'dotenv';
import userRouter from './src/routes/users.js';
import bookRouter from './src/routes/books.js';
import likeRouter from './src/routes/likes.js';
import cartRouter from './src/routes/carts.js';
import orderRouter from './src/routes/orders.js';

const app = express();
dotenv.config();

app.use('/users', userRouter);
app.use('/books', bookRouter);
app.use('/likes', likeRouter);
app.use('/carts', cartRouter);
app.use('/orders', orderRouter);

app.listen(process.env.PORT, () => {
  console.log(`Port ${process.env.PORT} ready`);
});
