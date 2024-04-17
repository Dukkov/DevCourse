import { StatusCodes } from 'http-status-codes';
import dotenv from 'dotenv';
import conn from '../../mysql.js';

dotenv.config();

const allBooks = (req, res) => {
  const { categoryId, news, limit, currentPage } = req.query;
  const offset = limit * (currentPage - 1);
  let sql = 'SELECT * FROM books';
  const values = [];

  if (categoryId && news) {
    sql +=
      'WHERE category_id = ? AND pub_date BETWEEN DATE_SUB(NOW(), INTERVAL 1 MONTH) AND NOW()';
    values.push(categoryId);
  } else if (categoryId) {
    sql += 'WHERE category_id = ?';
    values.push(categoryId);
  } else if (news) {
    sql += 'WHERE pub_date BETWEEN DATE_SUB(NOW(), INTERVAL 1 MONTH) AND NOW()';
  }

  sql += 'LIMIT ? OFFSET ?';
  values.push(parseInt(limit, 10), offset);

  conn.query(sql, values, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }

    if (results.length) return res.status(StatusCodes.OK).json(results);

    return res.status(StatusCodes.NOT_FOUND).end();
  });
};

const bookDetail = (req, res) => {
  const { id } = req.params;

  const sql =
    'SELECT * FROM books LEFT JOIN category ON books.category_id = category.id WHERE books.id = ?;';
  conn.query(sql, id, (err, results) => {
    if (err) {
      console.log(err);

      return res.status(StatusCodes.BAD_REQUEST).end();
    }

    if (results[0]) return res.status(StatusCodes.OK).json(results[0]);

    return res.status(StatusCodes.NOT_FOUND).end();
  });
};

export default { allBooks, bookDetail };
