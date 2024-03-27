import express from "express";

const router = express.Router();
const channelDB = new Map();
let key = 1;

router.use(express.json());

// 메인 페이지
router.get("/", (req, res) => {
  res.json({ message: "Welcome to Youtube page" });
});

router
  .route("/channels")

  // 전체 채널 조회
  .get((req, res) => {
    if (channelDB.size) {
      res.status(200).json([...channelDB.values()]);
    } else {
      res.status(404).json({ message: "Empty list" });
    }
  })

  // 채널 생성
  .post((req, res) => {
    if (req.body) {
      const {channelTitle} = req.body;

      channelDB.set(key++, req.body);
      res.status(201).json({ message: `Channel ${channelTitle} created` });
    } else {
      res.status(400).json({ message: "Bad request" });
    }
  })

router
  .route("/channels/:id")

  // 개별 채널 조회
  .get((req, res) => {
    const id = parseInt(req.params.id);
    const channel = channelDB.get(id);

    if (channel) {
      res.status(200).json(channel);
    } else {
      res.status(404).json({ message: "Channel not found" });
    }
  })

  // 채널 수정
  .put((req, res) => {
    const id = parseInt(req.params.id);
    const channel = channelDB.get(id);

    if (channel) {
      const newTitle = req.body.channelTitle;
      channel.channelTitle = newTitle;

      channelDB.set(id, channel);
      res.status(200).json({ message: `Channel title changed to ${newTitle}` });
    } else {
      res.status(404).json({ message: "Channel not found" });
    }
  })

  // 채널 삭제
  .delete((req, res) => {
    const id = parseInt(req.params.id);
    const channel = channelDB.get(id);

    if (channel) {
      channelDB.delete(id);
      res.status(200).json({ message: `${channel.channelTitle} delete done` });
    } else {
      res.status(404).json({ message: "Channel not found" });
    }
  })

export default router;