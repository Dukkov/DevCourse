import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import conn from '../../mysql.js';
import ensureAuthorization from '../../auth.js';

dotenv.config();

const addToCart = (req, res) => {
  const { bookId, quantity } = req.body;
  const authorization = ensureAuthorization(req, res);

  if (authorization instanceof jwt.TokenExpiredError) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: '다시 로그인 하세요' });
  }
  if (authorization instanceof jwt.JsonWebTokenError) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: '잘못된 토큰' });
  }

  const sql =
    'INSERT INTO cartItems (book_id, quantity, user_id) VALUES (?, ?, ?)';
  const values = [bookId, quantity, authorization.id];

  conn.query(sql, values, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }

    return res.status(StatusCodes.OK).json(results);
  });
};

const getCartItems = (req, res) => {
  const { selected } = req.body;
  const authorization = ensureAuthorization(req);

  if (authorization instanceof jwt.TokenExpiredError) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: '다시 로그인 하세요' });
  }
  if (authorization instanceof jwt.JsonWebTokenError) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: '잘못된 토큰' });
  }

  let sql = `
  SELECT 
    cartItems.id, 
    book_id, 
    title, 
    summary, 
    quantity, 
    price 
  FROM 
    cartItems 
  LEFT JOIN 
    books 
  ON 
    cartItems.book_id = books.id 
  WHERE 
    user_id = ? 
    AND cartItems.id IN (?)
`;
  const values = [authorization.id, selected];

  if (selected) {
    sql += 'AND cartItems.id IN (?)';
    values.push(selected);
  }

  conn.query(sql, values, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }

    return res.status(StatusCodes.OK).json(results);
  });
};

const removeCartItems = (req, res) => {
  const cartItemId = req.params.id;
  const sql = 'DELETE FROM cartItems WHERE id = ?';

  conn.query(sql, cartItemId, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }

    return res.status(StatusCodes.OK).json(results);
  });
};

export default { addToCart, getCartItems, removeCartItems };
