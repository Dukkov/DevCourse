import express from "express";
import conn from "../dbDemo.js";
import {body, param, validationResult} from "express-validator";

const router = express.Router();

const validate = (req, res, next) => {
  const err = validationResult(req);

  if (err.isEmpty())
    return next();
  else
    return (res.status(400).json(err.array()));
};

router.use(express.json());

router
  .route("/")

  // 전체 채널 조회
  .get([body("userId").notEmpty().isInt().withMessage("Enter number"), validate], (req, res, next) => {
    const {userId} = req.body;
    const query = "SELECT * FROM channels WHERE user_id = ?";

    conn.query(query, userId, (err, results) => {
      if(results.length)
        res.status(200).json(results);
      else
        res.status(404).json({ message: "Not found" });
    });
  })

  // 채널 생성
  .post([body("userId").notEmpty().isInt().withMessage("Enter number"), body("name").notEmpty().isString().withMessage("Enter string"), validate], (req, res) => {
    const {name, userId} = req.body;
    const query = "INSERT INTO channels (name, user_id) VALUES (?, ?)";
    const params = [name, userId];

    conn.query(query, params, (err, results) => {
      if (err)
        return (res.status(500).end());

      res.status(201).json(results);
    });
  })

router
  .route("/:id")

  // 개별 채널 조회
  .get([param("id").notEmpty().withMessage("Enter id"), validate], (req, res) => {
    let {id} = req.params;
    id = parseInt(id);
    const query = "SELECT * FROM channels WHERE id = ?";

    conn.query(query, id, (err, results) => {
      if (err)
        return (res.status(500).end());
      if(results.length)
        res.status(200).json(results);
      else
      res.status(404).json({ message: "Not found" });
    });
  })

  // 채널 수정
  .put([param("id").notEmpty().withMessage("Enter id"), body("name").notEmpty().isString().withMessage("Invalid title"), validate], (req, res) => {
    let {id} = req.params;
    id = parseInt(id);
    const {name} = req.body;
    const query = "UPDATE channels SET name = ? WHERE id = ?";
    const params = [name, id];

    conn.query(query, params, (err, results) => {
      if (err)
        return (res.status(500).end());
      
      return(200).json(results);
    });
  })

  // 채널 삭제
  .delete([param("id").notEmpty().withMessage("Enter title"), validate],(req, res) => {
    let {id} = req.params;
    id = parseInt(id);
    const query = "DELETE FROM channels WHERE id = ?";

    conn.query(query, id, (err, results) => {
      if (err)
        return (res.status(500).end());
      
      return(200).json(results);
    });
  })

export default router;