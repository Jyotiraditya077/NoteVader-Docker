import express from "express";
import {
  createNote,
  deleteNote,
  getAllNotes,
  getNoteById,
  updateNote,
} from "../controllers/notesController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Protect all note routes
router.use(protect);

router.get("/", getAllNotes);         // Get all notes for logged-in user
router.get("/:id", getNoteById);      // Get single note by ID (if it belongs to user)
router.post("/", createNote);         // Create new note linked to user
router.put("/:id", updateNote);       // Update note if owner
router.delete("/:id", deleteNote);    // Delete note if owner

export default router;
