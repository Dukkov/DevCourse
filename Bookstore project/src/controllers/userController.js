import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import dotenv from 'dotenv';
import conn from '../../mysql.js';

dotenv.config();

const join = (req, res) => {
  const { email, password } = req.body;
  const salt = crypto.randomBytes(64).toString('base64');
  const hashPassword = crypto
    .pbkdf2Sync(password, salt, 10000, 64, 'sha512')
    .toString('base64');
  const sql = 'INSERT INTO users (email, password, salt) VALUES (?, ?, ?)';
  const values = [email, hashPassword, salt];

  conn.query(sql, values, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }

    return res.status(StatusCodes.CREATED).json(results);
  });
};

const login = (req, res) => {
  const { email, password } = req.body;
  const sql = 'SELECT * FROM users WHERE email = ?';

  conn.query(sql, email, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }

    const loginUser = results[0];
    const hashPassword = crypto
      .pbkdf2Sync(password, loginUser.salt, 10000, 10, 'sha512')
      .toString('base64');

    if (loginUser && loginUser.password === hashPassword) {
      const token = jwt.sign(
        {
          email: loginUser.email
        },
        process.env.PRIVATE_KEY,
        {
          expiresIn: '5m',
          issuer: 'dukov'
        }
      );

      res.cookie('token', token, {
        httpOnly: true
      });
      console.log(token);

      return res.status(StatusCodes.OK).json(results);
    }

    return res.status(StatusCodes.UNAUTHORIZED).end();
  });
};

const passwordResetRequest = (req, res) => {
  const { email } = req.body;
  const sql = 'SELECT * FROM users WHERE email = ?';

  conn.query(sql, email, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }

    const user = results[0];

    if (user) {
      return res.status(StatusCodes.OK).json({ email });
    }

    return res.status(StatusCodes.UNAUTHORIZED.end());
  });
};

const passwordReset = (req, res) => {
  const { email, password } = req.body;
  const salt = crypto.randomBytes(10).toString('base64');
  const hashPassword = crypto
    .pbkdf2Sync(password, salt, 10000, 10, 'sha512')
    .toString('base64');
  const sql = 'UPDATE users SET password = ?, salt = ? WHERE email = ?';
  const values = [hashPassword, salt, email];

  conn.query(sql, values, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }

    if (results.affectedRows === 0)
      return res.status(StatusCodes.BAD_REQUEST).end();

    return res.status(StatusCodes.OK).json(results);
  });
};

export default { join, login, passwordResetRequest, passwordReset };
