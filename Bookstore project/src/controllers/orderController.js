import { StatusCodes } from 'http-status-codes';
import conn from '../../mysql.js';

const order = (req, res) => {
  const { items, delivery, totalQuantity, totalPrice, userId, firstBookTitle } =
    req.body;
  let deliveryId = 3;
  let orderId;
  let sql =
    'INSERT INTO orders (book_title, total_quantity, total_price, user_id, delivery_id) VALUES (?, ?, ?, ?, ?)';
  let values = [firstBookTitle, totalQuantity, totalPrice, userId, deliveryId];

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
