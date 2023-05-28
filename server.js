const express = require('express');
const fs = require('fs');
const path = require('path');
const uuid = require('uuid');
let notes = require('./db/db.json');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

// Validate db.json and create array if it doesn't exist
const dbArray = './db/db.json';
if (!fs.existsSync(dbArray)) {
  fs.writeFileSync(dbArray, '[]');
}

try {
  JSON.parse(fs.readFileSync(dbArray));
} catch (err) {
  fs.writeFileSync(dbArray, '[]');
}

const yellow = '\x1b[33m%s\x1b[0m';
const blue = '\x1b[34m%s\x1b[0m';
const green = '\x1b[32m%s\x1b[0m';
const red = '\x1b[31m%s\x1b[0m';

// Connect to html
// GET requests
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'));
  console.info(yellow, `\n${req.method} request received`);
});

app.get('/api/notes', (req, res) => {
  res.json(notes);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});


// Save to db.json
// POST request
app.post('/api/notes', (req, res) => {
  const newNote = req.body;
  newNote.id = uuid.v4();
  notes.push(newNote);
  res.json(newNote);

  fs.writeFileSync(dbArray, JSON.stringify(notes));

  console.info(blue, `\n${req.method} request received`);
  console.log(green, `\n${newNote.title} added ✨`);
});


// DELETE request to delete a note
app.delete('/api/notes/:id', (req, res) => {
  const noteId = req.params.id;
  const NewNotes = notes.filter((note) => note.id !== noteId);

  fs.writeFileSync(dbArray, JSON.stringify(NewNotes));
  notes = NewNotes;
  res.sendStatus(204);

  console.info(red, `\n${req.method} request received`);
});


app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT} 🚀`);
});
