import express from "express";
import {
  createSnippet,
  getSnippets,
  deleteSnippet,
} from "../controllers/snippetController";
import { protect } from "../middlewares/authMiddleware";

const router = express.Router();

router.route("/")
  .post(protect, createSnippet)
  .get(protect, getSnippets);

router.delete("/:id", protect, deleteSnippet);

export default router;