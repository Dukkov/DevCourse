import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import conn from '../../mysql.js';
import ensureAuthorization from '../../auth.js';

dotenv.config();

const addLike = (req, res) => {
  const { bookId } = req.params;
  const authorization = ensureAuthorization(req);

  if (authorization instanceof jwt.TokenExpiredError) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: '다시 로그인 하세요' });
  }
  if (authorization instanceof jwt.JsonWebTokenError) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: '잘못된 토큰' });
  }

  const sql = 'INSERT INTO likes (user_id, liked_book_id) values (?, ?)';
  const values = [authorization.id, bookId];

  conn.query(sql, values, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }

    return res.status(StatusCodes.OK).json(results);
  });
};

const removeLike = (req, res) => {
  const bookId = req.params.id;
  const authorization = ensureAuthorization(req);
  const sql = 'DELETE FROM likes WHERE user_id = ? AND liked_book_id = ?';
  const values = [authorization.id, bookId];

  conn.query(sql, values, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }

    return res.status(StatusCodes.OK).json(results);
  });
};

export default { addLike, removeLike };
