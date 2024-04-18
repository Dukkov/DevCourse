import { StatusCodes } from 'http-status-codes';
import conn from '../../mysql.js';

const addLike = (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;
  const sql = 'INSERT INTO likes (user_id, liked_book_id) values (?, ?)';
  const values = [userId, id];

  conn.query(sql, values, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }

    return res.status(StatusCodes.OK).json(results);
  });
};

const removeLike = (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;
  const sql = 'DELETE FROM likes WHERE user_id = ? AND liked_book_id = ?';
  const values = [userId, id];

  conn.query(sql, values, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }

    return res.status(StatusCodes.OK).json(results);
  });
};

export default { addLike, removeLike };
