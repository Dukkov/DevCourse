import express from "express";

const router = express.Router();
const userDB = new Map();
let key = 1;

router.use(express.json());

// 메인 페이지
router.get("/", (req, res) => {
  res.json({ message: "Welcome to Youtube page" });
});

// 회원 조회
router.get("/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const user = userDB.get(userId);

  if (user) {
    res.status(200).json({
      ID: user.ID,
      name: user.name
    });
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

// 로그인
router.post("/login", (req, res) => {
  const {ID, pwd} = req.body;
  let found = false;

  userDB.forEach((user) => {
    if (user.ID === ID && user.pwd === pwd) {
      found = true;

      res.status(200).json({ message: `Welcome, ${user.name}!` });
    }
  });

  if (!found)
    res.status(404).json({ message: "Invalid info" });
});

// 회원 가입
router.post("/signUp", (req, res) => {
  const user = req.body;

  if (user.ID) {
    userDB.set(key++, user);
    res.status(201).json({ message: `Welcome, ${user.name}!` });
  } 
  else
    res.status(400).json({ message: "Bad request" });
});

// 회원 탈퇴
router.delete("/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const user = userDB.get(userId);

  if (user) {
    userDB.delete(userId);

    res.status(200).json({ message: "User delete done" });
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

export default router;