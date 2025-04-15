const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const dataPath = path.join(__dirname, '../data/songs.js');


const readSongs = () => {
const data = fs.readFileSync(dataPath);
  return JSON.parse(data);
};


const writeSongs = (songs) => {
  fs.writeFileSync(dataPath, JSON.stringify(songs, null, 2));
};

// GET all songs
router.get('/', (req, res) => {
  const songs = readSongs();
  res.json(songs);
});

// GET a song by ID
router.get('/:id', (req, res) => {
  const songs = readSongs();
  const song = songs.find(s => s.id == req.params.id);
  song ? res.json(song) : res.status(404).send('Song not found');
});

// POST a new song
router.post('/', (req, res) => {
  const songs = readSongs();
  const newSong = {
    id: Date.now(),
    title: req.body.title,
    artist: req.body.artist
  };
  songs.push(newSong);
  writeSongs(songs);
  res.status(201).json(newSong);
});

// PUT update a song
router.put('/:id', (req, res) => {
  let songs = readSongs();
  const songIndex = songs.findIndex(s => s.id == req.params.id);
  if (songIndex !== -1) {
    songs[songIndex] = { ...songs[songIndex], ...req.body };
    writeSongs(songs);
    res.json(songs[songIndex]);
  } else {
    res.status(404).send('Song not found');
  }
});

// DELETE a song
router.delete('/:id', (req, res) => {
  let songs = readSongs();
  const newSongs = songs.filter(s => s.id != req.params.id);
  if (songs.length === newSongs.length) {
    return res.status(404).send('Song not found');
  }
  writeSongs(newSongs);
  res.sendStatus(204);
});

module.exports = router;

router.get('/view', (req, res) => {
    const songs = readSongs();
    res.render('songs', { songs });
  });

