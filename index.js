const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mustacheExpress = require('mustache-express');

// Import data from files
const artists = require('./data/artist.js');
const albums = require('./data/albums.js');
const songs = require('./data/songs.js');
const songsRouter = require('./routes/songs.js');

const app = express();
const PORT = 3004;

// Logger middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Timer middleware
app.use((req, res, next) => {
  req.requestTime = Date.now();
  next();
});

// Static files and body parsing
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Mustache setup
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', path.join(__dirname, 'views'));


app.get('/', (req, res) => {
  const enrichedAlbums = albums.map(album => {
    const artist = artists.find(a => a.id === album.artistId);
    return { ...album, artistName: artist ? artist.name : 'Unknown' };
  });

  
  const song = {
    title: 'Blank Space',
    audioSrc: '/audio/blank-space.mp3' 
  };

  res.render('index', {
    artists,
    albums: enrichedAlbums,
    songs,
    songTitle: song.title,
    songSrc: song.audioSrc
  });
});

// API Routes
app.use('/api/songs', songsRouter);

app.get('/api/artists', (req, res) => res.json(artists));

app.get('/api/albums', (req, res) => {
  const { artistId } = req.query;
  if (artistId) {
    return res.json(albums.filter(a => a.artistId == artistId));
  }
  res.json(albums);
});

app.post('/api/artists', (req, res) => {
  const { name } = req.body;
  const newArtist = { id: artists.length + 1, name };
  artists.push(newArtist);
  res.redirect('/');
});

app.post('/api/songs', (req, res) => {
  const { title, albumId } = req.body;
  const newSong = {
    id: songs.length + 1,
    title,
    albumId: parseInt(albumId),
  };
  songs.push(newSong);
  res.redirect('/');
});

app.patch('/api/artists/:id', (req, res) => {
  const artist = artists.find(a => a.id == req.params.id);
  if (!artist) return res.status(404).json({ error: 'Not found' });
  artist.name = req.body.name || artist.name;
  res.json(artist);
});

app.delete('/api/songs/:id', (req, res) => {
  const index = songs.findIndex(s => s.id == req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Not found' });
  const deleted = songs.splice(index, 1);
  res.json(deleted);
});

// Error-handling
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`🎵 Server is running at http://localhost:${PORT}`);
});



// const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const mustacheExpress = require('mustache-express');
// const path = require('path');

// const songsRouter = require('./routes/songs');
// const app = express();
// const PORT = 3004;

// // Template engine setup
// app.engine('mustache', mustacheExpress());
// app.set('view engine', 'mustache');
// app.set('views', path.join(__dirname, 'views'));

// // Middleware
// app.use(cors());
// app.use(bodyParser.json());
// app.use(express.static(path.join(__dirname, 'public'))); // CSS/JS files

// // Routes
// app.use('/songs', songsRouter);

// app.get('/', (req, res) => {
//   res.render('login'); // loads views/login.mustache
// });

// // Start server
// app.listen(PORT, () => {
//   console.log(`🎵 Music API is running at http://localhost:${PORT}`);
// });




// const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const songsRouter = require('./routes/songs');

// const app = express();
// const PORT = 3004;

// const mustacheExpress = require('mustache-express');
// const path = require('path');

// loginlink.addEventListener('click',()=>{
//     loginsec.classList.remove('active')
// })

// app.engine('mustache', mustacheExpress());
// app.set('view engine', 'mustache');
// app.set('views', path.join(__dirname, 'views'));

// app.use(cors());
// app.use(bodyParser.json());

// app.use('/songs', songsRouter);

// app.use(express.static(path.join(__dirname, 'public')));

// app.get('/', (req, res) => {
//   res.render('login'); 
// });

// app.listen(PORT, () => {
//   console.log(`🎵 Music API is running at http://localhost:${PORT}`);
// });





