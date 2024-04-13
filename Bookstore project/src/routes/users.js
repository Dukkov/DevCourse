import express from 'express';
import conn from '../../mysql.js';
import { StatusCodes } from 'http-status-codes';

const router = express.Router();

router.use(express.json());

router.post('/join', (req, res) => {
  const { email, password } = req.body;
  const sql = 'INSERT INTO users (email, password) VALUES (?, ?)';
  const values = [email, password];

  conn.query(sql, values, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }

    return res.status(StatusCodes.CREATED).json(results);
  });

  res.join('회원가입');
});

router.post('/login', (req, res) => {
  res.json('로그인');
});

router.post('/reset', (req, res) => {
  res.json('비밀번호 초기화 요청');
});

router.put('/reset', (req, res) => {
  res.json('비밀번호 초기화');
});

export default router;
