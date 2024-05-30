import { StatusCodes } from 'http-status-codes';
import conn from '../../mysql.js';

const allCategory = (req, res) => {
  const sql = 'SELECT * FROM category';

  conn.query(sql, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }

    return res.status(StatusCodes.OK).json(results);
  });
};

export default { allCategory };
