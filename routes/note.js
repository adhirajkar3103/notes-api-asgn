const router = require("express").Router();
const Note = require('../models/note')
const validateNote = require('../middlewares/validNote')

/**
 * @swagger
 * tags:
 *   name: Notes
 *   description: API for managing notes
 */

/**
 * @swagger
 * /note:
 *   post:
 *     summary: Create a new note
 *     tags: [Notes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Note created successfully
 *         content:
 *           application/json:
 *             example: {"message": "Note created successfully", "note": {"_id": "123", "title": "Note 1", "content": "Content 1"}}
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example: {"message": "Internal Server Error"}
 */
router.post("/", validateNote, async (req, res) => {
  try {
    const { title, content } = req.body;
    const newNote = new Note({ title, content });
    await newNote.save();
    res
      .status(201)
      .json({ message: "Note created successfully", note: newNote });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /note:
 *   get:
 *     summary: Get all notes
 *     tags: [Notes]
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: [{"_id": "123", "title": "Note 1", "content": "Content 1"}, {"_id": "456", "title": "Note 2", "content": "Content 2"}]
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example: {"message": "Internal Server Error"}
 */
router.get("/", async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /note/{id}:
 *   get:
 *     summary: Get a specific note by ID
 *     tags: [Notes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the note
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: {"_id": "123", "title": "Note 1", "content": "Content 1"}
 *       '404':
 *         description: Note not found
 *         content:
 *           application/json:
 *             example: {"message": "Note not found"}
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example: {"message": "Internal Server Error"}
 */
router.get("/:id", async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.json(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /note/{id}:
 *   put:
 *     summary: Update a specific note by ID
 *     tags: [Notes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the note
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Note updated successfully
 *         content:
 *           application/json:
 *             example: {"message": "Note updated successfully", "note": {"_id": "123", "title": "Updated Note 1", "content": "Updated Content 1"}}
 *       '404':
 *         description: Note not found
 *         content:
 *           application/json:
 *             example: {"message": "Note not found"}
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example: {"message": "Internal Server Error"}
 */
router.put("/:id", validateNote, async (req, res) => {
  try {
    const noteId = req.params.id;
    const { title, content } = req.body;
    const note = await Note.findById(noteId);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    note.title = title || note.title;
    note.content = content || note.content;
    await note.save();
    res.json({ message: "Note updated successfully", note });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


/**
 * @swagger
 * /note/{id}:
 *   delete:
 *     summary: Delete a specific note by ID
 *     tags: [Notes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the note
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Note deleted successfully
 *         content:
 *           application/json:
 *             example: {"message": "Note deleted successfully", "note": {"_id": "123", "title": "Deleted Note 1", "content": "Deleted Content 1"}}
 *       '404':
 *         description: Note not found
 *         content:
 *           application/json:
 *             example: {"message": "Note not found"}
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example: {"message": "Internal Server Error"}
 */
router.delete("/:id", async (req, res) => {
    try {
      const noteId = req.params.id;
      const note = await Note.findByIdAndDelete(noteId);
      if (!note) {
        return res.status(404).json({ message: "Note not found" });
      }
      res.json({ message: "Note deleted successfully", note });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  

module.exports = router;
