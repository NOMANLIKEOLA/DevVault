import { Request, Response } from "express";
import Snippet from "../models/Snippet";

interface AuthRequest extends Request {
  user?: { id: string };
}

export const createSnippet = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { title, code, language } = req.body;

    const snippet = await Snippet.create({
      title,
      code,
      language,
      user: req.user?.id,
    });

    res.status(201).json(snippet);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getSnippets = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const snippets = await Snippet.find({
      user: req.user?.id,
    }).sort({ createdAt: -1 });

    res.json(snippets);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteSnippet = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const snippet = await Snippet.findById(req.params.id);

    if (!snippet) {
      return res.status(404).json({ message: "Snippet not found" });
    }

    if (snippet.user.toString() !== req.user?.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await snippet.deleteOne();

    res.json({ message: "Snippet deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};