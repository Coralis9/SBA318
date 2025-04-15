const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mustacheExpress = require('mustache-express');
const path = require('path');

const songsRouter = require('./routes/songs');
const app = express();
const PORT = 3004;

// Template engine setup
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public'))); // CSS/JS files

// Routes
app.use('/songs', songsRouter);

app.get('/', (req, res) => {
  res.render('login'); // loads views/login.mustache
});

// Start server
app.listen(PORT, () => {
  console.log(`🎵 Music API is running at http://localhost:${PORT}`);
});




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





