import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import mysql from 'mysql2/promise';
import ensureAuthorization from '../../auth.js';

const deleteCartItems = async (conn) => {
  const sql = 'DELETE FROM cartItems WHERE id IN (?)';
  const values = [1, 2, 3];
  const result = await conn.query(sql, [values]);

  return result;
};

const order = async (req, res) => {
  const conn = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'Bookshop',
    dateStrings: true
  });

  const authorization = ensureAuthorization(req);

  if (authorization instanceof jwt.TokenExpiredError) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: '다시 로그인 하세요' });
  }
  if (authorization instanceof jwt.JsonWebTokenError) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: '잘못된 토큰' });
  }

  const { items, delivery, totalQuantity, totalPrice, firstBookTitle } =
    req.body;
  let sql =
    'INSERT INTO delivery (address, receiver, contact) VALUES (?, ?, ?)';
  let values = [delivery.address, delivery.receiver, delivery.contact];
  let [results] = await conn.execute(sql, values);
  const deliveryId = results.insertId;

  sql =
    'INSERT INTO orders (book_title, total_quantity, total_price, user_id, delivery_id) VALUES (?, ?, ?, ?, ?)';
  values = [
    firstBookTitle,
    totalQuantity,
    totalPrice,
    authorization.id,
    deliveryId
  ];
  [results] = await conn.execute(sql, values);
  const orderId = results.insertId;

  sql = 'SELECT book_id, quantity FROM cartItems WHERE id IN (?)';
  let [orderItems, fields] = await conn.query(sql, [items]);

  sql = 'INSERT INTO orderedBook (order_id, book_id, quantity) VALUES ?';
  values = [];

  items.forEach((item) => {
    values.push([orderId, item.book_id, item.quantity]);
  });

  results = await conn.query(sql, [values]);

  const result = await deleteCartItems(conn, items);

  return res.status(StatusCodes.OK).json(result);
};

const getOrders = async (req, res) => {
  const conn = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'Bookshop',
    dateStrings: true
  });
  const sql =
    'SELECT orders.id, address, receiver, contact, book_title, total_quantity, total_price, created_at FROM orders LEFT JOIN delivery ON orders.delivery_id = delivery.id';
  const [rows] = await conn.query(sql);

  return res.status(StatusCodes.OK).json(rows);
};

const getOrderDetail = async (req, res) => {
  const { id } = req.params;
  const conn = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'Bookshop',
    dateStrings: true
  });
  const sql =
    'SELECT book_id, title, author, price, quantity FROM orderedBook LEFT JOIN books ON orderedBook.book_id = books.id WHERE order_id = ?';
  const [rows] = await conn.query(sql, [id]);

  return res.status(StatusCodes.OK).json(rows);
};

export default { order, getOrders, getOrderDetail };
