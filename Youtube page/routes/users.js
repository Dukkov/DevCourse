import express from "express";
import conn from "../dbDemo.js";
import {body, param, validationResult} from "express-validator";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

router.use(express.json());

const validate = (req, res, next) => {
  const err = validationResult(req);

  if (err.isEmpty())
    return next();
  else
    return (res.status(400).json(err.array()));
};

// 메인 페이지
router.get("/", (req, res) => {
  res.json({ message: "Welcome to Youtube page" });
});

// 회원 조회
router.get("/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);

  conn.query(
    "SELECT * FROM users WHERE id = ?", userId,
    (err, results) => {
      if (results.length) {
        res.status(200).json(results);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    }
  );
});

// 로그인
router.post("/login", [body("email").notEmpty().isEmail().withMessage("Enter email"), body("password").notEmpty().isString().withMessage("Enter password"), validate], (req, res) => {
  const {email, password} = req.body;

  conn.query(
    "SELECT * FROM users WHERE email = ?", email,
    (err, results) => {
      const loginUser = results[0];
      
      if(loginUser && loginUser.password === password) {
        const token = jwt.sign({
          email: loginUser.email,
          name : loginUser.name
        }, process.env.PRIVATE_KEY);

        res.status(200).json({
          message: `Welcome, ${loginUser.name}!`,
          token: token
        });
      } else {
        res.status(404).json({ message: "Login information is incorrect" });
      }
    }
  );
});

// 회원 가입
router.post("/signUp", [body("email").notEmpty().isEmail().withMessage("Enter email"), body("name").notEmpty().isString().withMessage("Enter name"), body("password").notEmpty().isString().withMessage("Enter password"), body("contact").notEmpty().isString().withMessage("Enter contact"), validate], (req, res) => {
  const user = req.body;

  if (user.email) {
    const {email, name, password, contact} = user;

    conn.query(
      "INSERT INTO users (email, name, password, contact) VALUES (?, ?, ?, ?)", [email, name, password, contact],
      (err, results) => {
        res.status(201).json({ message: `Welcome, ${user.name}!` });
      }
    );
  } else {
    res.status(400).json({ message: "Bad request" });
  }
});

// 회원 탈퇴
router.delete("/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);

  conn.query(
    "DELETE FROM users WHERE id = ?", userId,
    (err, results) => {
      res.status(200).json(results);
    }
  );
});

export default router;