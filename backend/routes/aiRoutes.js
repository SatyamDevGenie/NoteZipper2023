import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  summarizeNote,
  suggestTitle,
  improveNote,
  suggestCategory,
  expandNote,
  assistantChat,
} from "../controllers/aiController.js";

const router = express.Router();

router.use(protect);

router.post("/summarize", summarizeNote);
router.post("/suggest-title", suggestTitle);
router.post("/improve", improveNote);
router.post("/suggest-category", suggestCategory);
router.post("/expand", expandNote);
router.post("/chat", assistantChat);

export default router;
