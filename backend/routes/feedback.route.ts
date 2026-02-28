import { Router } from "express";

const router = Router();

router.post("/", (req, res) => {
  const { clarity } = req.body;

  res.json({
    message: "Feedback received",
    clarity,
  });
});

export default router;