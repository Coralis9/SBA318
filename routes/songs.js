const express = require('express');
const router = express.Router();
const songs = require('../data/songs.js');

// GET all songs
router.get('/', (req, res) => {
  res.json(songs);
});

// GET song by ID
router.get('/:id', (req, res) => {
  const song = songs.find(s => s.id == req.params.id);
  if (!song) return res.status(404).json({ error: 'Song not found' });
  res.json(song);
});

// POST create song
router.post('/', (req, res) => {
  const { title, albumId } = req.body;
  const newSong = {
    id: songs.length + 1,
    title,
    albumId: parseInt(albumId)
  };
  songs.push(newSong);
  res.status(201).json(newSong);
});

// PATCH update song
router.patch('/:id', (req, res) => {
  const song = songs.find(s => s.id == req.params.id);
  if (!song) return res.status(404).json({ error: 'Song not found' });

  song.title = req.body.title || song.title;
  song.albumId = req.body.albumId || song.albumId;
  res.json(song);
});

// DELETE song
router.delete('/:id', (req, res) => {
  const index = songs.findIndex(s => s.id == req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Song not found' });

  const deleted = songs.splice(index, 1);
  res.json(deleted[0]);
});

module.exports = router;