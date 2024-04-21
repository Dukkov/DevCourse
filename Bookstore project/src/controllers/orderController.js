// 고상민
import { StatusCodes } from 'http-status-codes';
import mysql from 'mysql2/promise';
// import conn from '../../mysql.js';

const order = async (req, res) => {
  const conn = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'Bookshop',
    dateStrings: true
  });
  const { items, delivery, totalQuantity, totalPrice, userId, firstBookTitle } =
    req.body;
  let deliveryId;
  let orderId;
  let sql =
    'INSERT INTO delivery (address, receiver, contact) VALUES (?, ?, ?)';
  let values = [delivery.address, delivery.receiver, delivery.contact];

  let [results] = await conn.query(sql, values);

  sql =
    'INSERT INTO orders (book_title, total_quantity, total_price, user_id, delivery_id) VALUES (?, ?, ?, ?, ?)';
  values = [firstBookTitle, totalQuantity, totalPrice, userId, deliveryId];

  sql = 'INSERT INTO orderedBook (order_id, book_id, quantity) VALUES ?';
  values = [];

  items.forEach((item) => {
    values.push([orderId, item.book_id, item.quantity]);
  });

  conn.query(sql, [values], (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }

    orderId = results.insertId;

    return res.status(StatusCodes.OK).json(results);
  });
};

const getOrders = (req, res) => {};

const getOrderDetail = (req, res) => {};

export default { order, getOrders, getOrderDetail };
