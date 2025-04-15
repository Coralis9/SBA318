 Music Catalog App

A simple full-stack Node.js & Express application 

Features

- RESTful API with full CRUD routes
- Supports artists, albums, and songs
- Query filtering for albums by artist
- Custom and error-handling middleware
- Form to add new artists
- Views rendered using mustache
- Styled with simple CSS
- No API keys required

Routes Overview

 API

- `GET /api/artists`
- `POST /api/artists`
- `PATCH /api/artists/:id`
- `GET /api/albums?artistId=ID`
- `GET /api/songs`
- `DELETE /api/songs/:id`

Views

- `GET /` — main dashboard with form and lists

<!-- Create a server with endpoints : 

GET /songs – list all songs

GET /songs/:id – get a single song

POST /songs – add a new song

PUT /songs/:id – update a song

DELETE /songs/:id – delete a song -->