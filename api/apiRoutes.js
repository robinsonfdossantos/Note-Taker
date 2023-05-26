const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');


router.get('/api/notes', (req, res) => {
    const notes = getNotes();
    res.json(notes);
  });

  router.post('/api/notes', (req, res) => {
    console.info = req.body;
    
    const { isValid, errors } = req.body;

    const payload = {
      title: '',
      text: '',
    };
  });
  
  module.exports = router;