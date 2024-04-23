import jwt from 'jsonwebtoken';
import express from 'express';
import dotenv from 'dotenv';

const app = express();
dotenv.config();

app.get('/jwt', (req, res) => {
  const token = jwt.sign({ foo: 'bar' }, process.env.SECRET_KEY);

  res.cookie('jwt', token, {
    httpOnly: true
  });

  res.send('토큰 발행 완료');
});

app.get('/jwt/decoded', (req, res) => {
  const receivedJwt = req.headers['authorization'];
  const decoded = jwt.verify(receivedJwt, process.env.SECRET_KEY);

  res.send(decoded);
});

app.listen(4000, () => {
  console.log('Port 4000 ready');
});
