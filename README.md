# Playlist Sharing Platform

Case study 162 for B.Tech CSE Backend Development (Node.js, Express.js, and MongoDB).

People register, publish playlists of song titles, and other people like and comment on them. Edit and delete are limited to the playlist owner. Like and comment rules live in the API.

## What maps to the brief

| Requirement | Where |
| --- | --- |
| User, Playlist, and Comment schemas | `backend/src/models` |
| Playlist CRUD | `backend/src/controllers/playlistController.js` |
| Owner-only edit and delete | `backend/src/middleware/authorizeOwner.js` |
| Like toggle | `POST /api/playlists/:id/like` |
| Comments | `POST /api/playlists/:id/comments` |
| Validation before save | `backend/src/validators.js` and the Mongoose schemas |
| JWT authentication | `backend/src/middleware/auth.js` |
| Referenced collections | `owner`, `likes`, `playlist`, and `user` fields |
| Environment config | `backend/.env.example` |
| Postman collection | `backend/postman/Playlist-Sharing-Platform.postman_collection.json` |
| React pages | Login, Register, feed, song library, create playlist, playlist details |

## Run it locally

MongoDB must be running on `mongodb://127.0.0.1:27017`.

```bash
cd backend
npm install
npm start
```

`backend/.env` is already filled for this machine. On another machine, copy `.env.example` to `.env` and set `JWT_SECRET`.

In a second terminal:

```bash
cd client
npm install
npm run dev
```

Open http://localhost:5173. The dev server proxies `/api` to http://localhost:4000.

API checks:

```bash
cd backend
npm test
```

## API

| Method | Path | Auth |
| --- | --- | --- |
| POST | `/api/auth/register` | no |
| POST | `/api/auth/login` | no |
| GET | `/api/auth/me` | JWT |
| POST | `/api/playlists` | JWT |
| GET | `/api/playlists` | optional |
| GET | `/api/playlists/:id` | optional |
| PATCH | `/api/playlists/:id` | owner |
| DELETE | `/api/playlists/:id` | owner |
| POST | `/api/playlists/:id/like` | JWT, toggles |
| POST | `/api/playlists/:id/comments` | JWT |
| DELETE | `/api/comments/:id` | comment author |

Send `Authorization: Bearer <token>`. A playlist needs a title and 1–50 song titles. A comment needs text of 1–500 characters.

The React library is a catalog of real songs (title, artist, album). Picking one saves a title string such as `Blinding Lights — The Weeknd`. The API and the Postman collection still send `songs` as an array of strings.

Like responses look like `{ "liked": true, "likeCount": 1 }`. Liking again removes that user and the count drops by one. The same user cannot be counted twice.

## Postman

Import `backend/postman/Playlist-Sharing-Platform.postman_collection.json`. Run the requests from top to bottom with the API on port 4000. Login requests save `token` and `otherToken`. The listener's update and delete requests expect `403`.

## Deploy

Do this only when you have a MongoDB Atlas URI and hosting accounts.

1. Create an Atlas cluster and copy its connection string.
2. Deploy `backend` on Render or Railway. Start command: `npm start`. Set `MONGO_URI`, `JWT_SECRET`, `JWT_EXPIRES_IN`, `CLIENT_URL` (the frontend origin), and `PORT` if the host does not set it.
3. Deploy `client` on Vercel or Netlify. Set `VITE_API_URL` to the live API origin with no trailing slash, then rebuild.
4. Set the API `CLIENT_URL` to the deployed frontend origin so the browser is allowed to call it.

The React app only calls these REST endpoints. It does not calculate likes or store comments itself.
