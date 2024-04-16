import { StatusCodes } from 'http-status-codes';
import dotenv from 'dotenv';
import conn from '../../mysql.js';

dotenv.config();

const allBooks = (req, res) => {
  const { categoryId } = req.query;

  if (categoryId) {
    const sql = 'SELECT * FROM books WHERE category_id = ?';
    conn.query(sql, categoryId, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(StatusCodes.BAD_REQUEST).end();
      }

      if (results.length) return res.status(StatusCodes.OK).json(results);

      return res.status(StatusCodes.NOT_FOUND).end();
    });
  } else {
    const sql = 'SELECT * FROM books';

    conn.query(sql, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(StatusCodes.BAD_REQUEST).end();
      }

      return res.status(StatusCodes.OK).json(results);
    });
  }
};

const bookDetail = (req, res) => {
  const { id } = req.params;

  const sql = 'SELECT * FROM books WHERE id = ?';
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
