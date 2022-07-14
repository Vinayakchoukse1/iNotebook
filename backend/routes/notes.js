const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchUser");
const { body, validationResult } = require("express-validator");
const notesController = require("../controllers/notesController");

// ROUTE 1: Fetch all notes: GET "/api/notes/fetchallnotes"
router.get("/fetchallnotes", fetchuser, notesController.fetchallnotes_get);

// ROUTE 2: Adding a new note: POST "/api/notes/addnote"
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Title must be atleast 3 characters long").isLength({
      min: 3,
    }),
    body(
      "description",
      "Description must be atleast 5 characters long"
    ).isLength({ min: 5 }),
  ],
  notesController.addnotes_post
);

// ROUTE 3: Updating a note: PUT "/api/notes/updatenote"
router.put("/updatenote/:id", fetchuser, notesController.updatenotes_put);

// ROUTE 4: Delete a note: DELETE "/api/notes/deletenote"
router.delete("/deletenote/:id", fetchuser, notesController.deletenotes_delete);

module.exports = router;
