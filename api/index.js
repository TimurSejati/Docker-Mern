const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Note = require("./Note");
const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to mongodb"))
  .catch((err) => console.log(err));

app.get("/api/notes", async (req, res) => {
  try {
    const notes = await Note.find();
    res
      .status(200)
      .json({ message: "Fetched notes successfully", data: notes });
  } catch (err) {
    res.status(500).json({ message: "Error fetching notes", data: notes });
  }
});

app.post("/api/notes", async (req, res) => {
  try {
    const newNote = new Note({
      title: req.body.title,
      content: req.body.content,
    });
    const saveNote = await newNote.save();
    res
      .status(200)
      .json({ message: "Note created successfully", data: saveNote });
  } catch (error) {
    res.status(500).json({ message: "Error fetching notes", data: notes });
  }
});

app.all("*", () => {
  res.status(404).send("<h1>404 | Page not found</h1>");
});

app.listen(4001, () => {
  console.log("Server is running on port 4001");
});
