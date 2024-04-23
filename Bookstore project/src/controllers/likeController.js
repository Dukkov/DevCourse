import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import conn from '../../mysql.js';

dotenv.config();

const ensureAuthorization = (req) => {
  const receivedJwt = req.headers.authorization;
  const decodedJwt = jwt.verify(receivedJwt, process.env.PRIVATE_KEY);

  return decodedJwt;
};

const addLike = (req, res) => {
  const { id } = req.params;
  const authorization = ensureAuthorization(req);

  const sql = 'INSERT INTO likes (user_id, liked_book_id) values (?, ?)';
  const values = [authorization.id, id];

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
